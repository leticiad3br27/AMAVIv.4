"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import SideMenu from "./SideMenu";
import { FaCog } from "react-icons/fa";

// Função para setar item com expiração
function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Função para pegar item com expiração
function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Responsividade
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Verifica login ao montar
  useEffect(() => {
    const checkLogin = async () => {
      const localLogin = getItemWithExpiry("amavi_logged_in");
      if (localLogin) {
        setIsLoggedIn(true);
        return;
      }
      try {
        const response = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          setIsLoggedIn(true);
          setItemWithExpiry("amavi_logged_in", true, 60 * 60 * 1000); // 1 hora
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("amavi_logged_in");
        }
      } catch {
        setIsLoggedIn(false);
        localStorage.removeItem("amavi_logged_in");
      }
    };
    checkLogin();
  }, []);

  // Escuta evento customizado para atualizar login dinamicamente
  useEffect(() => {
    const handleLoginStatusChange = (event) => {
      setIsLoggedIn(event.detail.isLoggedIn);
      if (event.detail.isLoggedIn) {
        setItemWithExpiry("amavi_logged_in", true, 60 * 60 * 1000);
      } else {
        localStorage.removeItem("amavi_logged_in");
      }
    };
    window.addEventListener("loginStatusChanged", handleLoginStatusChange);
    return () => window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        localStorage.removeItem("amavi_logged_in");
        window.dispatchEvent(new CustomEvent("loginStatusChanged", { detail: { isLoggedIn: false } }));
        window.location.href = "/";
      } else {
        alert("Erro ao sair. Tente novamente.");
      }
    } catch {
      alert("Erro ao sair. Tente novamente.");
    }
  };

  return (
    <>
      <header className={styles.menuBar}>
        <div className={styles.iconContainer}>
          <div className={styles.menuIcon} onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
            <FaCog size={35} color="#ffffff" />
          </div>
          {isMobile && (
            <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img src="/assets/SVGS/home-svgrepo-com.svg" alt="Menu" />
            </div>
          )}
        </div>
        {!isMobile && (
          <div className={styles.linkDiv}>
            <a href="/" className={styles.link}>
              Home
            </a>
            <a href="/Solicitar-Atendimento" className={styles.link}>
              Solicitar-Atendimento
            </a>
            <a href="/eventos" className={styles.link}>
              Eventos
            </a>
            <a href="/doacao" className={styles.link}>
              Doações
            </a>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={styles.link}
                style={{ background: "none", border: "none", cursor: "pointer", color: "white", padding: 0 }}
              >
                Logout
              </button>
            ) : (
              <a href="/login" className={styles.link}>
                Login
              </a>
            )}
          </div>
        )}
        {isMobile && isMenuOpen && (
          <div className={styles.floatingMenu}>
            <a href="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="/Solicitar-Atendimento" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              Atendimento
            </a>
            <a href="/eventos" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              Eventos
            </a>
            <a href="/doacao" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              Doações
            </a>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className={styles.link}
                style={{ background: "none", border: "none", cursor: "pointer", color: "white", padding: 0 }}
              >
                Logout
              </button>
            ) : (
              <a href="/login" className={styles.link} onClick={() => setIsMenuOpen(false)}>
                Login
              </a>
            )}
          </div>
        )}
      </header>
      <SideMenu isMenuOpen={isSideMenuOpen} closeSideMenu={() => setIsSideMenuOpen(false)} />
    </>
  );
};

export default Header;
