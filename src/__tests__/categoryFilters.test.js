import {
  matchesCategory,
} from "../utils/categoryFilters";

describe("matchesCategory", () => {
  test("returns true when no category is selected", () => {
    expect(
      matchesCategory(
        {
          summary: "Anything",
          category: "",
        },
        ""
      )
    ).toBe(true);
  });

  test("matches a Ticketmaster category", () => {
    expect(
      matchesCategory(
        {
          summary: "Live concert",
          category: "Music",
        },
        "Music"
      )
    ).toBe(true);
  });

  test("maps arts and theatre to Culture", () => {
    expect(
      matchesCategory(
        {
          summary: "Stage show",
          category: "Arts & Theatre",
        },
        "Culture"
      )
    ).toBe(true);
  });

  test("does not match unrelated categories", () => {
    expect(
      matchesCategory(
        {
          summary: "Football match",
          category: "Sports",
        },
        "Music"
      )
    ).toBe(false);
  });
});