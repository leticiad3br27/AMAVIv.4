"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ConfigLayout from "../layouts/ConfigLayout";
import classNames from "classnames";
import styles from "../styles/Configuracoes.module.css";
import useTheme from "../../hook/useTheme";

const ConfiguracoesPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const handleAdminToggle = (e) => {
    if (e.target.checked) {
      router.push("/ADMlogin");
    }
  };

  const handleVisualizarDocumentos = () => {
    router.push("/documentos");
  };

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
              <input type="checkbox" onChange={handleAdminToggle} />
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
            <h2 className={styles.title}>Meus Documentos</h2>
            <p className={styles.text}>Visualizar seus documentos?</p>
            <button className={styles.userButton} onClick={handleVisualizarDocumentos}>
              Visualizar
            </button>
          </div>
        </section>
      </main>
    </ConfigLayout>
  );
};

export default ConfiguracoesPage;
