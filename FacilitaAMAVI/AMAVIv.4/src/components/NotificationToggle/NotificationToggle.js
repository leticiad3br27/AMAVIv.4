// components/NotificationToggle/NotificationToggle.jsx
import styles from './NotificationToggle.module.css';

const NotificationToggle = ({ notifications, onNotificationsChange }) => {
  return (
    <div className={styles.section}>
      <h3>Notificações</h3>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={notifications}
          onChange={onNotificationsChange}
          className={styles.input}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default NotificationToggle;