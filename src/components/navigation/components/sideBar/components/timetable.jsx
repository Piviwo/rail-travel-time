import { useState } from "react";
import "./timetable.css";

export const Timetable = () => {
    const [schedule, setSchedule] = useState([
        { time: "08:00", city: "Berlin" },
        { time: "12:00", city: "Vienna" },
        { time: "16:00", city: "Moscow" },
    ]);

    return (
        <div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr key={index}>
                                <td>{item.time}</td>
                                <td>{item.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};