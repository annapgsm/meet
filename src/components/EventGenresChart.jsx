import React, { useState, useEffect } from 'react';
import {
    Pie,
    PieChart,
    Cell,
    Legend,
    ResponsiveContainer
} from 'recharts';

const EventGenresChart = ({events}) =>{

    const [data, setData ] = useState([]);

    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
    const colors = ['#C7D9B7', '#CED0CE','#9FB8AD','#475841','#A6AEBF'];
    
    useEffect(() => {
        setData(getData());
    }, [`${events}`])

    const getData = () => {
        const chartData = genres
        .map((genre) => {
            const filteredEvents = events.filter((event) =>
            event.summary.includes(genre)
            );
            return {
            name: genre,
            value: filteredEvents.length,
            };
        })
        .filter((item) => item.value > 0); // ✅ remove zeros

        return chartData;
    };


    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.2;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.2;

        return percent ? (
            <text
            x={x}
            y={y}
            fill="#3F403F"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={12}
            fontWeight={500}
            >
            {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    return (
        <div className="chart-card">
            <h2 className="chart-title">Event Genres Distribution</h2>
            <ResponsiveContainer width="99%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}   
                    >
                        {data.map((entry, index) => (
                            <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventGenresChart;