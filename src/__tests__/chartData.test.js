import {
  getCityCounts,
  getWeekdayCounts,
} from "../utils/chartData";

describe("chartData", () => {
  test(
    "counts events by city",
    () => {
      const events = [
        {
          city: "Berlin, Germany",
        },
        {
          city: "Hamburg, Germany",
        },
        {
          city: "Berlin, Germany",
        },
      ];

      expect(
        getCityCounts(events)
      ).toEqual([
        {
          city: "Berlin",
          count: 2,
        },
        {
          city: "Hamburg",
          count: 1,
        },
      ]);
    }
  );

  test(
    "groups cities outside the limit into Other",
    () => {
      const events = [
        { city: "Berlin, Germany" },
        { city: "Berlin, Germany" },
        { city: "Berlin, Germany" },

        { city: "Hamburg, Germany" },
        { city: "Hamburg, Germany" },

        { city: "Munich, Germany" },
        { city: "Cologne, Germany" },
      ];

      expect(
        getCityCounts(events, 2)
      ).toEqual([
        {
          city: "Berlin",
          count: 3,
        },
        {
          city: "Hamburg",
          count: 2,
        },
        {
          city: "Other",
          count: 2,
        },
      ]);
    }
  );

  test(
    "counts events by weekday",
    () => {
      const events = [
        {
          created: "2024-01-01",
        },
        {
          created: "2024-01-01",
        },
        {
          created: "2024-01-02",
        },
      ];

      const result =
        getWeekdayCounts(events);

      expect(
        result.find(
          (item) =>
            item.day === "Monday"
        ).count
      ).toBe(2);

      expect(
        result.find(
          (item) =>
            item.day === "Tuesday"
        ).count
      ).toBe(1);
    }
  );

  test(
    "returns all seven weekdays",
    () => {
      expect(
        getWeekdayCounts([])
      ).toHaveLength(7);
    }
  );
});