"use client";
import styles from './Header.module.css';

const Header = ({ setIsMenuOpen, isMenuOpen }) => {
  return (
    <header className={styles.menuBar}>
      <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <img src="assets/SVGS/home-svgrepo-com.svg" alt="Menu" /> {/* Adicione um ícone de menu aqui */}
      </div>
      <div className={styles.linkDiv}>
        <a href="/" className={styles.link}>Home</a>
        <a href="/atendimento" className={styles.link}>Atendimento</a>
        <a href="/eventos" className={styles.link}>Eventos</a>
        <a href="/doacao" className={styles.link}>Doações</a>
        <a href="/login" className={styles.link}>Login</a>
      </div>
    </header>
  );
};

export default Header;