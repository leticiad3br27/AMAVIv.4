"use client";

import { useState } from "react";
import styles from "../styles/ConsultarCop.module.css";
import useTheme from "../../hook/useTheme";
import ADMlayout from "../layouts/ADMlayout";

const operadores = [
  { nome: "Carlos Silva", matricula: "12345", especialidade: "Psicologia" },
  { nome: "Ana Souza", matricula: "67890", especialidade: "Fonoaudiologia" },
  { nome: "João Mendes", matricula: "54321", especialidade: "Terapia Ocupacional" },
];

const ConsultarCOP = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("nome");

  const filteredOperadores = operadores.filter((operador) =>
    operador[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ADMlayout>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles.contentWrapper}>
          <div className={styles.headerContainer}>
            <h1>Consultar <span>Cooperadores</span></h1>
          </div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder={`Pesquisar por ${filterBy}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className={styles.filterSelect}>
              <option value="nome">Nome</option>
              <option value="matricula">Matrícula</option>
              <option value="especialidade">Especialidade</option>
            </select>
          </div>
          <div className={styles.resultContainer}>
            {filteredOperadores.length > 0 ? (
              <ul>
                {filteredOperadores.map((operador, index) => (
                  <li key={index} className={styles.operadorItem}>
                    <strong>Nome:</strong> {operador.nome} <br />
                    <strong>Matrícula:</strong> {operador.matricula} <br />
                    <strong>Especialidade:</strong> {operador.especialidade}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noResults}>Nenhum cooperador encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </ADMlayout>
  );
};

export default ConsultarCOP;