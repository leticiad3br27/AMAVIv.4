"use client";

import styles from './SideMenu.module.css';

const SideMenu = ({ isMenuOpen, closeSideMenu }) => {
  return (
    <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}>
      <h1 className={styles.nameTi}>Fulano Da Silva Parreiras</h1>
      <button className={styles.closeBtn} onClick={closeSideMenu}>
        &times;
      </button>
      <a href="/conta" className={styles.sideLink}>Conta</a>
      <a href="/configuracoes" className={styles.sideLink}>Configurações</a>
      <a href="/requerimentos" className={styles.sideLink}>Requerimentos</a>
    </div>
  );
};

export default SideMenu;
