"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import useTheme from "../../hook/useTheme";
import ADMlayout from "../layouts/ADMlayout";
import styles from "../styles/ConfigAdm.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LargeSection = ({ children }) => (
  <section className={styles.largeSection}>{children}</section>
);

const Section = ({ children }) => (
  <section className={styles.section}>{children}</section>
);

const AcessosChart = () => {
  const acessos = [5, 10, 15, 30, 40, 50, 70, 90, 100, 120];
  const novosCadastros = [2, 5, 8, 10, 15, 20, 25, 30, 35, 40];
  const exclusoes = [1, 2, 3, 5, 6, 8, 10, 12, 14, 15];
  const diferenca = novosCadastros.map((cad, index) => cad - exclusoes[index]);

  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
    datasets: [
      {
        label: "Acessos Mensais",
        data: acessos,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointHoverBackgroundColor: "#4CAF50",
      },
      {
        label: "Diferença de Cadastros e Exclusões",
        data: diferenca,
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        pointHoverBackgroundColor: "#FF5733",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <LargeSection>
      <h3>Gráfico de Acessos</h3>
      <Line data={data} options={options} />
    </LargeSection>
  );
};

const Estatisticas = () => {
  const usuariosCadastrados = 120;
  const usuariosOnline = 8;

  return (
    <LargeSection>
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
    </LargeSection>
  );
};

const ConfigAdm = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <ADMlayout>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles.contentWrapper}>
          <LargeSection>
            <div className={styles.headerContainer}>
              <h1>Bem-vindo <span>ADM</span></h1>
            </div>
          </LargeSection>

          <Section>
            <div className={styles.infoBoxContainer}>
              <p>
                Você está na sessão especialmente desenvolvida para os administradores desta aplicação. 
                Em caso de dúvidas sobre o funcionamento da aplicação, por favor, entre em contato com a equipe de desenvolvimento.
              </p>
            </div>
          </Section>

          <Estatisticas />
          <AcessosChart />

          <LargeSection>
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
          </LargeSection>
        </div>
      </div>
    </ADMlayout>
  );
};

export default ConfigAdm;