// src/api.js
import mockData from "./mock-data";

/**
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
  const locations = events
    .map((event) => event.city || event.location)
    .filter(Boolean);

  return [...new Set(locations)];
};


export const normalizeEvent = (event) => {
  const venue = event._embedded?.venues?.[0];

  const classification =
  event.classifications?.[0];

  const segmentName =
    classification?.segment?.name || "";

  const genreName =
    classification?.genre?.name || "";

  const categoryName =
    genreName === "Comedy"
      ? "Comedy"
      : segmentName || genreName;

  const startDate =
    event.dates?.start?.dateTime ||
    event.dates?.start?.localDate;

  const cityName = venue?.city?.name || "";
  const countryName = venue?.country?.name || "";

  return {
    id: event.id,
    summary: event.name,
    created: startDate,
    description: event.info || event.pleaseNote || "",

    location: [venue?.name, cityName]
      .filter(Boolean)
      .join(", "),

    city: [cityName, countryName]
      .filter(Boolean)
      .join(", "),

    image: event.images?.[0]?.url || "",
    url: event.url || "",
    category:
      categoryName === "Undefined"
        ? ""
        : categoryName,
  };
};

export const getEvents = async (city = "", fetchFn) => {
  const isTest =
    typeof process !== "undefined" &&
    process.env.NODE_ENV === "test";

  // Use mock data in tests, but keep the same city-filtering behaviour
  if (isTest && !fetchFn) {
    const events = Array.isArray(mockData)
      ? mockData
      : mockData.events || [];

    // No city selected = return all mock events
    if (!city) {
      return events;
    }

    // City selected = imitate the backend's city filtering
    return events.filter(
      (event) =>
        (event.city || event.location) === city
    );
  }

  const baseUrl =
    "https://f7fi0rjwj8.execute-api.eu-central-1.amazonaws.com/api/events";

  const cityName = city
    ? city.split(",")[0].trim()
    : "";

  const url = cityName
    ? `${baseUrl}?city=${encodeURIComponent(cityName)}`
    : baseUrl;

  const request = fetchFn || fetch;
  const response = await request(url);

  if (!response.ok) {
    throw new Error(`Could not fetch events: ${response.status}`);
  }

  const result = await response.json();

  return (result.events || [])
    .map(normalizeEvent)
    .filter((event) => event.created);
};
