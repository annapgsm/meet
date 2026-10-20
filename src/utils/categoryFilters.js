export const matchesCategory = ( event, filter ) => {
    if (!filter) {
        return true;
    }

    const searchableText = `
        ${event.category || ""}
        ${event.summary || ""}
    `.toLowerCase();

    if (filter === "Culture") {
        const cultureTerms = [
        "arts",
        "theatre",
        "theater",
        "culture",
        "museum",
        "exhibition",
        ];

        return cultureTerms.some((term) =>
        searchableText.includes(term)
        );
    }

    return searchableText.includes(
        filter.toLowerCase()
    );
};