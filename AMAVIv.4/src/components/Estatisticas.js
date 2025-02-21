"use client";

import styles from "../styles/ConfigAdm.module.css";

const Estatisticas = () => {
  const usuariosCadastrados = 120;
  const usuariosOnline = 8;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statBox}>
        <h3>Usuários Cadastrados</h3>
        <p>{usuariosCadastrados}</p>
      </div>
      <div className={styles.statBox}>
        <h3>Usuários Online</h3>
        <p>{usuariosOnline}</p>
      </div>
    </div>
  );
};

export default Estatisticas;
