"use client";
import React from "react";
import ConfigLayout from "../layouts/ConfigLayout";
import classNames from "classnames";
import styles from "../styles/configuracoes.module.css";
import useTheme from "../../hook/useTheme";

const ConfiguracoesPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ConfigLayout>
      <main className={styles.content}>
        <section className={styles.smallSections}>
          <div className={styles.section}>
            <h2 className={styles.title}>Tema</h2>
            <div className={styles.themeToggle}>
              <label className={styles.switch}>
                <input type="checkbox" onChange={toggleTheme} checked={isDarkMode} />
                <span className={styles.slider} />
              </label>
            </div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.title}>Modo ADM</h2>
            <label className={styles.switch}>
              <input type="checkbox" id="adminSwitch" />
              <span className={styles.slider} />
            </label>
          </div>
          <div className={styles.section}>
            <h2 className={styles.title}>Notificações</h2>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider} />
            </label>
          </div>
        </section>

        <section className={styles.largeSections}>
          <div className={styles.largeSection}>
            <h2 className={styles.title}>Alerta</h2>
            <p className={styles.text}>Você está no modo responsável. Deseja mudar para o modo paciente?</p>
            <button className={classNames(styles.userButton, styles.blue)}>Mudar para Paciente</button>
          </div>
          <div className={styles.largeSection}>
            <h2 className={styles.title}>Meus Documentos</h2>
            <p className={styles.text}>Visualizar seus documentos?</p>
            <button className={styles.userButton}>Visualizar</button>
          </div>
        </section>
      </main>
    </ConfigLayout>
  );
};

export default ConfiguracoesPage;
