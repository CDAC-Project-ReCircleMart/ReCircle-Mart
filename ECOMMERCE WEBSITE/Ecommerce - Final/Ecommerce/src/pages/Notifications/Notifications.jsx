/**
 * Notifications Page
 * - Shows all notifications
 * - Mark single / all as read
 */

import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

import NotificationList from "../../components/notifications/NotificationList";
import { notificationsData } from "../../data/notificationsData";

import "../../components/notifications/Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // Mark all notifications as read
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
      <Navbar />

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

        <NotificationList notifications={notifications} onRead={markAsRead} />
      </div>
    </>
  );
}
