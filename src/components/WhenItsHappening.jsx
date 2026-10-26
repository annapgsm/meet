import React from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getWeekdayCounts,
} from "../utils/chartData";

function WhenItsHappening({ events }) {
  const data =
    getWeekdayCounts(events);

  const hasEvents = data.some(
    (day) => day.count > 0
  );

  return (
    <article className="pulse-chart-card">
      <div className="pulse-chart-heading">
        <span>WHEN IT'S HAPPENING</span>

        <h3>Week at a glance</h3>

        <p>
          See which days have the most
          happening.
        </p>
      </div>

      {hasEvents ? (
        <div className="pulse-chart-visual">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                bottom: 5,
                left: -25,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "rgba(244,241,233,0.65)",
                  fontSize: 9,
                }}
                tickFormatter={(day) =>
                  day.slice(0, 3)
                }
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "rgba(244,241,233,0.55)",
                  fontSize: 10,
                }}
              />

              <Tooltip
                cursor={{
                  fill:
                    "rgba(255,255,255,0.04)",
                }}
                contentStyle={{
                  background: "#f4f1e9",
                  border: "none",
                  borderRadius: "4px",
                  color: "#171714",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="count"
                fill="var(--coral)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="pulse-empty">
          No date data available for
          this selection.
        </p>
      )}
    </article>
  );
}

export default WhenItsHappening;