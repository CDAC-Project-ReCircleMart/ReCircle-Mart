import React, { useState } from "react";

export default function Notification() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Offer Received",
            message: "A buyer made an offer on your Redmi Note 12.",
            time: "5m ago",
            read: false,
        },
        {
            id: 2,
            title: "Message from Rohan",
            message: "Is the TV still available?",
            time: "30m ago",
            read: true,
        },
        {
            id: 3,
            title: "Price Drop Alert",
            message: "A similar product price dropped. Check now!",
            time: "2h ago",
            read: false,
        },
        {
            id: 4,
            title: "Ad Approved",
            message: "Your ad 'HP Laptop' is now live.",
            time: "Yesterday",
            read: true,
        },
    ]);

    function markAsRead(id) {
        setNotifications(
            notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    }

    function markAllRead() {
        setNotifications(
            notifications.map((n) => ({ ...n, read: true }))
        );
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">Notifications</h4>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={markAllRead}
                >
                    Mark all as read
                </button>
            </div>

            <div className="list-group shadow-sm rounded">
                {notifications.map((item) => (
                    <div
                        key={item.id}
                        className={`list-group-item list-group-item-action d-flex flex-column ${item.read ? "" : "bg-light"
                            }`}
                        onClick={() => markAsRead(item.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="d-flex justify-content-between">
                            <h6 className="fw-semibold mb-1">{item.title}</h6>
                            <small className="text-muted">{item.time}</small>
                        </div>
                        <p className="mb-1 text-secondary">{item.message}</p>
                        {!item.read && (
                            <span className="badge bg-primary align-self-start">
                                New
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
