import { useState, useEffect } from "react";
import styles from "./ConfigBarADM.module.css";
import {
  FaUserMd,
  FaFileAlt,
  FaClipboardList,
  FaPlus,
  FaSearch,
  FaGift,
  FaBars,
  FaTimes,
  FaCog
} from "react-icons/fa";

const ConfigBarADM = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <span className={styles.title}>Administração</span>
      </div>

      <ul className={styles.menu}>

        <li className={styles.menuItem}>
          <a href="/documentos">
            <FaFileAlt className={styles.icon} />
            {isOpen && <span>Consultar Documentos</span>}
          </a>
        </li>

        <li className={styles.menuItem}>
          <a href="/consultar-requerimentos">
            <FaClipboardList className={styles.icon} />
            {isOpen && <span>Consultar Requerimentos</span>}
          </a>
        </li>

        <li className={styles.menuItem}>
          <a href="/cadastrar-cop">
            <FaPlus className={styles.icon} />
            {isOpen && <span>Cadastrar COP</span>}
          </a>
        </li>

        <li className={styles.menuItem}>
          <a href="/consultar-cop">
            <FaSearch className={styles.icon} />
            {isOpen && <span>Consultar COP</span>}
          </a>
        </li>

        <li className={styles.menuItem}>
          <a href="/cadastrar-evento">
            <FaPlus className={styles.icon} />
            {isOpen && <span>Cadastrar Evento</span>}
          </a>
        </li>

        <li className={styles.menuItem}>
          <a href="/Deleta">
            <FaTimes className={styles.icon} />
            {isOpen && <span>Deletar Evento</span>}
          </a>
        </li>

        <li className={styles.menuItem}>
          <a href="/configuracoes">
            <FaCog className={styles.icon} />
            {isOpen && <span>Modo Padrão</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ConfigBarADM;
