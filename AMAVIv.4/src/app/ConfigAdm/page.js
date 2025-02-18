"use client";

import { useState } from "react";
import styles from "../styles/ConfigAdm.module.css";
import useTheme from "../../hook/useTheme";
import ADMlayout from "../layouts/ADMlayout";

const ConfigAdm = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ADMlayout>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles.contentWrapper}>
          <div className={styles.headerContainer}>
            <h1>Bem-vindo <span>ADM</span></h1>
          </div>
          <div className={styles.infoBoxContainer}>
            <p>
              Você está na sessão especialmente desenvolvida para os administradores desta aplicação. 
              Em caso de dúvidas sobre o funcionamento da aplicação, por favor, entre em contato com a equipe de desenvolvimento.
            </p>
          </div>
          <div className={styles.themeSwitcherContainer}>
            <div className={styles.themeSwitcher}>
              <span>Escuro</span>
              <label className={styles.switch}>
                <input type="checkbox" checked={!isDarkMode} onChange={toggleTheme} />
                <span className={styles.slider}></span>
              </label>
              <span>Claro</span>
            </div>
          </div>
        </div>
      </div>
    </ADMlayout>
  );
};

export default ConfigAdm;
