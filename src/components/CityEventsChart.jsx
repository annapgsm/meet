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
  getCityCounts,
} from "../utils/chartData";

function CityEventsChart({ events }) {
  const data =
    getCityCounts(events);

  return (
    <article className="pulse-chart-card">
      <div className="pulse-chart-heading">
        <span>WHERE IT'S HAPPENING</span>

        <h3>Top cities</h3>

        <p>
          Cities with the most events
          in your current results.
        </p>
      </div>

      {data.length > 0 ? (
        <div className="pulse-chart-visual">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 10,
                bottom: 5,
                left: 0,
              }}
            >
              <CartesianGrid
                horizontal={false}
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                type="number"
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "rgba(244,241,233,0.55)",
                  fontSize: 10,
                }}
              />

              <YAxis
                type="category"
                dataKey="city"
                width={75}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#f4f1e9",
                  fontSize: 11,
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
                fill="var(--lime)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="pulse-empty">
          No city data available for
          this selection.
        </p>
      )}
    </article>
  );
}

export default CityEventsChart;