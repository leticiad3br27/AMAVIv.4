import { useState, useEffect } from "react";
import styles from "./ConfigBarADM.module.css";
import { FaUserMd, FaFileAlt, FaClipboardList, FaPlus, FaSearch, FaGift, FaBars, FaTimes } from "react-icons/fa";

const ConfigBarADM = () => {
  const [isOpen, setIsOpen] = useState(true);

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

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isOpen ? <FaBars /> : <FaTimes />} 
        </button>
        <span className={styles.title}>Administração</span>
      </div>

      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <a href="/consultar-paciente">
            <FaUserMd className={styles.icon} />
            {isOpen && <span>Consultar Paciente</span>}
          </a>
        </li>

        <li className={styles.menuItem}>
          <a href="/consultar-documentos">
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
          <a href="/verificar-doacoes">
            <FaGift className={styles.icon} />
            {isOpen && <span>Verificar Doações</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ConfigBarADM;
