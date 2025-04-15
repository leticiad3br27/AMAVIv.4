const MenuItem = ({ icon: Icon, label, isOpen, onClick, children }) => {
    return (
      <li className={styles.menuItem}>
        <div className={styles.menuHeader} onClick={onClick}>
          <Icon className={styles.icon} />
          <span className={styles.textSpan}>{label}</span>
          {children && <span className={styles.arrow}>{isOpen ? '▼' : '▶'}</span>}
        </div>
        {children && (
          <motion.ul
            className={styles.submenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.ul>
        )}
      </li>
    );
  };
  