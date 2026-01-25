import { useState } from "react";
import "./Calendar.css";

/* 🔹 HARD CODED EVENTS (LATER FROM DATABASE) */
const eventsData = {
  "2026-01-10": [
    { time: "10:00 AM", title: "Meeting with seller" },
    { time: "02:00 PM", title: "Approve listings" },
  ],
  "2026-01-15": [{ time: "11:30 AM", title: "User verification" }],
  "2026-01-20": [
    { time: "09:00 AM", title: "System maintenance" },
    { time: "04:00 PM", title: "Admin review" },
  ],
};

export default function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  /* 🔹 FORMAT DATE → yyyy-mm-dd */
  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  /* 🔹 GET DAYS OF CURRENT MONTH */
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];

  // empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // actual days
  for (let day = 1; day <= totalDays; day++) {
    daysArray.push(day);
  }

  /* 🔹 EVENTS FOR SELECTED DAY */
  const events = eventsData[selectedDate] || [];

  return (
    <div className="calendar-root">
      {/* -------- CALENDAR PANEL -------- */}
      <div className="calendar-panel">
        {/* HEADER */}
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
            ◀
          </button>

          <h3>
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h3>

          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
            ▶
          </button>
        </div>

        {/* DAYS NAME */}
        <div className="calendar-days">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="day-name">
              {d}
            </div>
          ))}
        </div>

        {/* DATE GRID */}
        <div className="calendar-grid">
          {daysArray.map((day, index) => {
            if (!day) return <div key={index} className="empty"></div>;

            const fullDate = `${year}-${String(month + 1).padStart(
              2,
              "0",
            )}-${String(day).padStart(2, "0")}`;

            return (
              <div
                key={index}
                className={`calendar-date ${
                  selectedDate === fullDate ? "active" : ""
                }`}
                onClick={() => setSelectedDate(fullDate)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------- EVENTS PANEL -------- */}
      <div className="events-panel">
        <h3>Events on {selectedDate}</h3>

        {events.length === 0 ? (
          <p className="no-events">No events for this day</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <span className="event-time">{event.time}</span>
              <p className="event-title">{event.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
