const parseEventDate = (value) => {
  if (!value) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value
      .split("-")
      .map(Number);

    return new Date(year, month - 1, day);
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};

export const getCityCounts = (
  events,
  limit = 7
) => {
  const counts = events.reduce(
    (result, event) => {
      if (!event.city) {
        return result;
      }

      const city =
        event.city.split(",")[0].trim();

      result[city] =
        (result[city] || 0) + 1;

      return result;
    },
    {}
  );

  const sortedCities = Object.entries(
    counts
  )
    .map(([city, count]) => ({
      city,
      count,
    }))
    .sort(
      (first, second) =>
        second.count - first.count
    );

  if (sortedCities.length <= limit) {
    return sortedCities;
  }

  const topCities =
    sortedCities.slice(0, limit);

  const otherCount = sortedCities
    .slice(limit)
    .reduce(
      (total, city) =>
        total + city.count,
      0
    );

  return [
    ...topCities,
    {
      city: "Other",
      count: otherCount,
    },
  ];
};

export const getWeekdayCounts = (
  events
) => {
  const weekdayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const counts = Object.fromEntries(
    weekdayOrder.map((day) => [
      day,
      0,
    ])
  );

  events.forEach((event) => {
    const date = parseEventDate(
      event.created
    );

    if (!date) return;

    const weekday =
      date.toLocaleDateString("en-GB", {
        weekday: "long",
      });

    if (weekday in counts) {
      counts[weekday] += 1;
    }
  });

  return weekdayOrder.map((day) => ({
    day,
    count: counts[day],
  }));
};