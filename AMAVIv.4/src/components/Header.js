"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import SideMenu from "./SideMenu"; 
import { FaCog } from "react-icons/fa";

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={styles.menuBar}>
        <div className={styles.iconContainer}>
          <button className={styles.menuIcon} onClick={() => setIsSideMenuOpen(!isSideMenuOpen)} aria-label="Configurações">
            <FaCog size={35} color="#ffffff" />
          </button>
          {isMobile && (
            <button className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
              <img src="/assets/SVGS/home-svgrepo-com.svg" alt="Ícone do menu" />
            </button>
          )}
        </div>
        {!isMobile ? (
          <nav className={styles.linkDiv}>
            <a href="/" className={styles.link}>Home</a>
            <a href="/Solicitar-Atendimento" className={styles.link}>Solicitar Atendimento</a>
            <a href="/eventos" className={styles.link}>Eventos</a>
            <a href="/doacao" className={styles.link}>Doações</a>
            <a href="/login" className={styles.link}>Login</a>
          </nav>
        ) : (
          isMenuOpen && (
            <nav className={styles.floatingMenu}>
              {["/", "/Solicitar-Atendimento", "/eventos", "/doacao", "/login"].map((href, index) => (
                <a key={index} href={href} className={styles.link} onClick={() => setIsMenuOpen(false)}>
                  {href.replace("/", "").replace("-", " ") || "Home"}
                </a>
              ))}
            </nav>
          )
        )}
      </header>

      {isSideMenuOpen && <SideMenu isMenuOpen={isSideMenuOpen} closeSideMenu={() => setIsSideMenuOpen(false)} />}
    </>
  );
};

export default Header;
