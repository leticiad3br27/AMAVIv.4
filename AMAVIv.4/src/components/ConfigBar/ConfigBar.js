import { useState, useEffect } from "react";
import styles from "./ConfigBar.module.css";
import {
  FaCog,
  FaFolder,
  FaCalendarAlt,
  FaUser,
  FaHome,
  FaBars,
  FaTimes,
  FaSignInAlt,
} from "react-icons/fa";

const ConfigBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = estado indefinido enquanto checa

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login", {
          method: "GET",
          credentials: "include", // envia cookies
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();

    const handleResize = () => {
      if (window.innerWidth < 720) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Enquanto não sabe se está logado, pode mostrar um loading ou nada
  if (isLoggedIn === null) {
    return null; // Ou um loading, tipo <div>Carregando...</div>
  }

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

      {isLoggedIn ? (
        <>
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
        </>
      ) : (
        <div className={styles.loginBtnWrapper}>
          <a href="/login" className={styles.loginBtn}>
            <FaSignInAlt className={styles.icon} />
            {isOpen && <span>Login</span>}
          </a>
        </div>
      )}
    </div>
  );
};

export default ConfigBar;
