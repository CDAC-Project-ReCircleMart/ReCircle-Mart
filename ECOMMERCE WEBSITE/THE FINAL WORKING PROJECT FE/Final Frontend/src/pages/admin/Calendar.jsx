import { useState, useEffect } from "react";
import {
  getEventsByDate,
  addEvent,
  deleteEvent,
} from "../../services/adminApi";
import "./Calendar.css";

export default function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [events, setEvents] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let day = 1; day <= totalDays; day++) daysArray.push(day);

  // 🔥 LOAD EVENTS WHEN DATE CHANGES
  useEffect(() => {
    loadEvents(selectedDate);
  }, [selectedDate]);

  const loadEvents = async (date) => {
    try {
      const data = await getEventsByDate(date);
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    }
  };

  // 🔹 ADD EVENT
  const handleAddEvent = async () => {
    if (!title) return alert("Title required");

    try {
      await addEvent({
        title,
        event_date: selectedDate,
        description,
      });

      setTitle("");
      setDescription("");
      setShowForm(false);
      loadEvents(selectedDate);
    } catch (err) {
      alert("Failed to add event");
    }
  };

  // 🔹 DELETE EVENT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      loadEvents(selectedDate);
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="calendar-root">
      {/* -------- CALENDAR PANEL -------- */}
      <div className="calendar-panel">
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

        <div className="calendar-days">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="day-name">
              {d}
            </div>
          ))}
        </div>

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
        <div className="events-header">
          <h3>Events on {selectedDate}</h3>

          <button className="add-btn" onClick={() => setShowForm(true)}>
            +
          </button>
        </div>

        {events.length === 0 ? (
          <p className="no-events">No events for this day</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <p className="event-title">{event.title}</p>
              <p className="event-desc">{event.description}</p>

              <button
                className="delete-event"
                onClick={() => handleDelete(event.id)}
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>

      {/* -------- ADD EVENT MODAL -------- */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add Event</h3>

            <input
              type="text"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={handleAddEvent}>Save</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
