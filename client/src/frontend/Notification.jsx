import React from 'react';
import '../css/notification.css';
const Notification = ({ notification }) => {
    console.log(notification)
  return (
    <div className="notification-container">
        <h2 className="notification-heading">Notifications</h2>
        <ul className="notification-list">
        {Array.isArray(notification) &&
            notification.map((notification, index) => (
            <li key={index} className="notification-item">
                <div className="notification-content">
                <span className="notification-icon">🔔</span>
                <span className="notification-text">Update status of {notification.clientName}</span>
                </div>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default Notification;
