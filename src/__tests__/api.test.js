import { getEvents, normalizeEvent } from "../api";

const ticketmasterEvent = {
  id: "123",
  name: "React Berlin Meetup",
  dates: {
    start: {
      dateTime: "2026-11-10T18:00:00Z",
    },
  },
  _embedded: {
    venues: [
      {
        name: "Factory Berlin",
        city: {
          name: "Berlin",
        },
        country: {
            name: "Germany",
        },
      },
    ],
  },
  info: "A React community event",
  images: [
    {
      url: "https://example.com/image.jpg",
    },
  ],
  url: "https://ticketmaster.com/event",
};

describe("normalizeEvent", () => {
  test("converts Ticketmaster data into Meet event format", () => {
    const result = normalizeEvent(ticketmasterEvent);

    expect(result.id).toBe("123");
    expect(result.summary).toBe("React Berlin Meetup");
    expect(result.created).toBe("2026-11-10T18:00:00Z");
    expect(result.location).toBe("Factory Berlin, Berlin");
    expect(result.city).toBe("Berlin, Germany");
    expect(result.description).toBe("A React community event");
  });
});

describe("getEvents", () => {
  test("fetches events and normalizes the response", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        events: [ticketmasterEvent],
      }),
    });

    const events = await getEvents("", mockFetch);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://f7fi0rjwj8.execute-api.eu-central-1.amazonaws.com/api/events"
    );

    expect(events).toHaveLength(1);
    expect(events[0].summary).toBe("React Berlin Meetup");
  });

  test("adds the selected city to the request", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        events: [ticketmasterEvent],
      }),
    });

    await getEvents("Berlin", mockFetch);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://f7fi0rjwj8.execute-api.eu-central-1.amazonaws.com/api/events?city=Berlin"
    );
  });
});