"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/famipage.module.css"; // Seu novo CSS
import useTheme from "../../hook/useTheme";
import ConfigLayout from "../layouts/ConfigLayout";

const usuarioPrincipal = {
  nome: "João Silva",
  idade: 40,
  genero: "Masculino",
  numeroSUS: "1234567890",
  cpf: "111.111.111-11",
  rg: "MG-12.345.678",
  endereco: "Rua A, 123, Bairro X, Cidade Y, Estado Z",
  telefone: "(31) 98765-4321",
  email: "joao.silva@example.com",
  historico: [
    { data: "2023-01-10", descricao: "Consulta médica geral" },
    { data: "2023-03-15", descricao: "Exame de sangue" },
    { data: "2023-06-20", descricao: "Consulta com especialista" },
  ],
};

const FamiliaPage = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const handleHistoricoClick = (item) => {
    router.push("Solicitar-Atendimento/historico-atendimentos");
  };

  return (
    <ConfigLayout>
      <div className={`${styles.pageContainer} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
        {/* Coluna de Dados */}
        <div className={styles.dataColumn}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImage}></div>
            <h1 className={styles.profileName}>{usuarioPrincipal.nome}</h1>
          </div>
          <p className={styles.profileInfo}><strong>Idade:</strong> {usuarioPrincipal.idade}</p>
          <p className={styles.profileInfo}><strong>Gênero:</strong> {usuarioPrincipal.genero}</p>
          <p className={styles.profileInfo}><strong>Número SUS:</strong> {usuarioPrincipal.numeroSUS}</p>
          <p className={styles.profileInfo}><strong>CPF:</strong> {usuarioPrincipal.cpf}</p>
          <p className={styles.profileInfo}><strong>RG:</strong> {usuarioPrincipal.rg}</p>
          <p className={styles.profileInfo}><strong>Endereço:</strong> {usuarioPrincipal.endereco}</p>
          <p className={styles.profileInfo}><strong>Telefone:</strong> {usuarioPrincipal.telefone}</p>
          <p className={styles.profileInfo}><strong>Email:</strong> {usuarioPrincipal.email}</p>
        </div>

        {/* Coluna de Histórico */}
        <div className={styles.historyColumn}>
          <h2 className={styles.sectionTitle}>Histórico Médico</h2>
          <ul className={styles.historyList}>
            {usuarioPrincipal.historico.map((item, index) => (
              <li
                key={index}
                className={styles.historyItem}
                onClick={() => handleHistoricoClick(item)}
              >
                <strong>{item.data}:</strong> {item.descricao}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ConfigLayout>
  );
};

export default FamiliaPage;
