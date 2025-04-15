"use client";
import styles from './SideMenu.module.css';
const SideMenu = ({ isMenuOpen, closeSideMenu }) => {
  return (
    <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}>
      <div className={styles.profileContainer}>
        <img src="../assets/img/doacao.jpeg" alt="Foto de perfil" className={styles.profileImage} />
      </div>
      <h1 className={styles.nameTi}>Fulano Da Silva Parreiras</h1>
      <button className={styles.closeBtn} onClick={closeSideMenu}>
        &times;
      </button>
      <a href="/usuario" className={styles.sideLink}>Conta</a>
      <a href="/configuracoes" className={styles.sideLink}>Configurações</a>
      <a href="/Solicitar-Atendimento/historico-atendimentos" className={styles.sideLink}>Requerimentos</a>
    </div>
  );
};
export default SideMenu;