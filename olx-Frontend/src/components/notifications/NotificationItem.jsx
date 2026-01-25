/**
 * NotificationItem
 * Renders a single notification row
 */

export default function NotificationItem({ item, onRead }) {
  return (
    <div
      className={`list-group-item notification-item ${
        item.read ? "" : "unread"
      }`}
      onClick={() => onRead(item.id)}
    >
      <div className="d-flex justify-content-between">
        <h6 className="fw-semibold mb-1">{item.title}</h6>
        <small className="text-muted">{item.time}</small>
      </div>

      <p className="mb-1 text-secondary">{item.message}</p>

      {!item.read && <span className="badge bg-primary">New</span>}
    </div>
  );
}
