const startOfDay = (date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

const isSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

const parseEventDate = (value) => {
  if (!value) return null;

  // Ticketmaster can sometimes return only YYYY-MM-DD.
  // Parsing that ourselves prevents timezone shifts.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};

export const matchesDate = (
  event,
  filter,
  customDate = "",
  now = new Date()
) => {
  if (filter === "any") {
    return true;
  }

  const eventDate = parseEventDate(event.created);

  if (!eventDate) {
    return false;
  }

  const today = startOfDay(now);

  if (filter === "tonight") {
    return isSameDay(eventDate, today);
  }

  if (filter === "tomorrow") {
    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    return isSameDay(eventDate, tomorrow);
  }

  if (filter === "weekend") {
    const dayOfWeek = today.getDay();

    let daysUntilSaturday;

    if (dayOfWeek === 6) {
      // It is already Saturday.
      daysUntilSaturday = 0;
    } else if (dayOfWeek === 0) {
      // It is Sunday, so "this weekend" means today.
      daysUntilSaturday = 0;
    } else {
      daysUntilSaturday = 6 - dayOfWeek;
    }

    const weekendStart = new Date(today);
    weekendStart.setDate(
      today.getDate() + daysUntilSaturday
    );

    const weekendEnd = new Date(weekendStart);

    if (dayOfWeek !== 0) {
      weekendEnd.setDate(
        weekendStart.getDate() + 1
      );
    }

    weekendEnd.setHours(23, 59, 59, 999);

    return (
      eventDate >= weekendStart &&
      eventDate <= weekendEnd
    );
  }

  if (filter === "next7") {
    const end = new Date(now);

    end.setDate(now.getDate() + 7);

    return eventDate >= now && eventDate <= end;
  }

  if (filter === "custom") {
    if (!customDate) {
      return true;
    }

    const [year, month, day] =
      customDate.split("-").map(Number);

    const selectedDate =
      new Date(year, month - 1, day);

    return isSameDay(eventDate, selectedDate);
  }

  return true;
};