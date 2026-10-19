import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TimeFilter from "../components/TimeFilter";

describe("<TimeFilter />", () => {
    test("shows the current date option", () => {
        render(
        <TimeFilter
            value="any"
            customDate=""
            onChange={() => {}}
            onCustomDateChange={() => {}}
        />
        );

        expect(
        screen.getByRole("button", {
            name: /any date/i,
        })
        ).toBeInTheDocument();
    });

    test("opens the date options when the user clicks the filter", async () => {
        const user = userEvent.setup();

        render(
        <TimeFilter
            value="any"
            customDate=""
            onChange={() => {}}
            onCustomDateChange={() => {}}
        />
        );

        await user.click(
        screen.getByRole("button", {
            name: /any date/i,
        })
        );

        expect(
        screen.getByRole("listbox", {
            name: /when/i,
        })
        ).toBeInTheDocument();

        expect(
        screen.getByRole("option", {
            name: /this weekend/i,
        })
        ).toBeInTheDocument();
    });

    test("calls onChange when the user selects an option", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();

        render(
        <TimeFilter
            value="any"
            customDate=""
            onChange={onChange}
            onCustomDateChange={() => {}}
        />
        );

        await user.click(
        screen.getByRole("button", {
            name: /any date/i,
        })
        );

        await user.click(
        screen.getByRole("option", {
            name: /tomorrow/i,
        })
        );

        expect(onChange).toHaveBeenCalledWith(
        "tomorrow"
        );
    });

    test("shows a date picker when custom is selected", () => {
        render(
        <TimeFilter
            value="custom"
            customDate=""
            onChange={() => {}}
            onCustomDateChange={() => {}}
        />
        );

        const dateInput =
        screen.getByLabelText(/pick a date/i);

        expect(dateInput).toBeInTheDocument();
        expect(dateInput).toHaveAttribute(
        "type",
        "date"
        );
    });
});