import { useState, useEffect } from "react";
import styles from "./ConfigBar.module.css";
import { FaCog, FaFolder, FaUsers, FaCalendarAlt, FaUser, FaChevronDown, FaChevronUp, FaHome, FaBars, FaTimes } from "react-icons/fa";

const ConfigBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setIsOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <button className={`${styles.toggleBtn} ${styles.icon}`} onClick={toggleSidebar} style={{ marginLeft: '20px' }}>
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

        <li onClick={() => toggleDropdown("dependents")} className={styles.menuItem}>
          <FaUsers className={styles.icon} />
          {isOpen && <span>Dependentes</span>} 
          {isOpen && (openDropdown === "dependents" ? <FaChevronUp className={styles.chevron} /> : <FaChevronDown className={styles.chevron} />)}
        </li>
        {openDropdown === "dependents" && isOpen && (
          <ul className={styles.submenu}>
            <li><a href="/familia">Família</a></li>
            
          </ul>
        )}

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
