"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import SideMenu from "./SideMenu"; 
import { FaCog } from "react-icons/fa";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={styles.menuBar}>
        <div className={styles.iconContainer}>
          <div className={styles.menuIcon} onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
            <FaCog size={35} color="#ffffff"/>
          </div>
          {isMobile && (
            <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img src="/assets/SVGS/home-svgrepo-com.svg" alt="Menu" />
            </div>
          )}
        </div>
        {!isMobile && (
          <div className={styles.linkDiv}>
            <a href="/" className={styles.link}>Home</a>
            <a href="/Solicitar-Atendimento" className={styles.link}> Solicitar-Atendimento</a>
            <a href="/eventos" className={styles.link}>Eventos</a>
            <a href="/doacao" className={styles.link}>Doações</a>
            <a href="/login" className={styles.link}>Login</a>
          </div>
        )}
        {isMobile && isMenuOpen && (
          <div className={styles.floatingMenu}>
            <a href="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="/Solicitar-Atendimento" className={styles.link} onClick={() => setIsMenuOpen(false)}>Atendimento</a>
            <a href="/eventos" className={styles.link} onClick={() => setIsMenuOpen(false)}>Eventos</a>
            <a href="/doacao" className={styles.link} onClick={() => setIsMenuOpen(false)}>Doações</a>
            <a href="/login" className={styles.link} onClick={() => setIsMenuOpen(false)}>Login</a>
          </div>
        )}
      </header>
      
   
      <SideMenu isMenuOpen={isSideMenuOpen} closeSideMenu={() => setIsSideMenuOpen(false)} />
    </>
  );
};

export default Header;
