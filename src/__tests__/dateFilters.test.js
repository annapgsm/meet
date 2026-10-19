import { matchesDate } from "../utils/dateFilters";

const now =
  new Date(2026, 9, 19, 12, 0);

const event = (created) => ({
  created,
});

describe("matchesDate", () => {
    test("returns all events for any date", () => {
        expect(
        matchesDate(
            event("2027-01-01"),
            "any",
            "",
            now
        )
        ).toBe(true);
    });

    test("matches events happening tonight", () => {
        expect(
        matchesDate(
            event("2026-10-19T20:00:00"),
            "tonight",
            "",
            now
        )
        ).toBe(true);
    });

    test("matches events happening tomorrow", () => {
        expect(
        matchesDate(
            event("2026-10-20T18:00:00"),
            "tomorrow",
            "",
            now
        )
        ).toBe(true);
    });

    test("matches events happening this weekend", () => {
        expect(
        matchesDate(
            event("2026-10-24T18:00:00"),
            "weekend",
            "",
            now
        )
        ).toBe(true);
    });

    test("matches events within the next 7 days", () => {
        expect(
        matchesDate(
            event("2026-10-23T18:00:00"),
            "next7",
            "",
            now
        )
        ).toBe(true);
    });

    test("matches a custom date", () => {
        expect(
        matchesDate(
            event("2026-11-03T18:00:00"),
            "custom",
            "2026-11-03",
            now
        )
        ).toBe(true);
    });

    test("rejects invalid event dates", () => {
        expect(
        matchesDate(
            event("not-a-date"),
            "tomorrow",
            "",
            now
        )
        ).toBe(false);
    });
});