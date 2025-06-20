import { useState } from "react";
import styles from "./ConfigBar.module.css";
import {
  FaCog,
  FaFolder,
  FaCalendarAlt,
  FaUser,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const ConfigBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <button
          className={`${styles.toggleBtn} ${styles.icon}`}
          onClick={toggleSidebar}
          style={{ marginLeft: "20px" }}
        >
          {isOpen ? <FaBars /> : <FaTimes />}
        </button>
        <span className={styles.title}>Configurações</span>
      </div>

      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <a href="/configuracoes">
            <FaCog className={styles.icon} />
            {isOpen && <span>Geral</span>}
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/documentos">
            <FaFolder className={styles.icon} />
            {isOpen && <span>Documentos</span>}
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/Agendamento">
            <FaCalendarAlt className={styles.icon} />
            {isOpen && <span>Agendamentos</span>}
          </a>
        </li>
        <li className={styles.menuItem}>
          <a href="/usuario">
            <FaUser className={styles.icon} />
            {isOpen && <span>Usuário</span>}
          </a>
        </li>
      </ul>

      <button className={styles.returnBtn}>
        <a href="/" className={styles.returnLink}>
          <FaHome className={styles.returnIcon} />
          {isOpen && <span>Retornar ao Menu</span>}
        </a>
      </button>
    </div>
  );
};

export default ConfigBar;