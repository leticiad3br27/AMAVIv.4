"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/famipage.module.css";
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
   
    router.push(`Solicitar-Atendimento/historico-atendimentos`); 
  };
  return (
    <ConfigLayout>
      <div className={`${styles.configLayout} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImage}></div>
            <h1 className={styles.profileName}>{usuarioPrincipal.nome}</h1>
            <p className={styles.profileText}><strong>Idade:</strong> {usuarioPrincipal.idade}</p>
            <p className={styles.profileText}><strong>Gênero:</strong> {usuarioPrincipal.genero}</p>
            <p className={styles.profileText}><strong>Número SUS:</strong> {usuarioPrincipal.numeroSUS}</p>
            <p className={styles.profileText}><strong>CPF:</strong> {usuarioPrincipal.cpf}</p>
            <p className={styles.profileText}><strong>RG:</strong> {usuarioPrincipal.rg}</p>
            <p className={styles.profileText}><strong>Endereço:</strong> {usuarioPrincipal.endereco}</p>
            <p className={styles.profileText}><strong>Telefone:</strong> {usuarioPrincipal.telefone}</p>
            <p className={styles.profileText}><strong>Email:</strong> {usuarioPrincipal.email}</p>
          </div>
          <div className={styles.historicoContainer}>
            <h2 className={styles.historicoTitle}>Histórico Médico</h2>
            <ul className={styles.historicoList}>
              {usuarioPrincipal.historico.map((item, index) => (
                <li 
                  key={index} 
                  className={styles.historicoItem} 
                  onClick={() => handleHistoricoClick(item)}
                >
                  <strong>{item.data}:</strong> {item.descricao}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ConfigLayout>
  );
};
export default FamiliaPage;