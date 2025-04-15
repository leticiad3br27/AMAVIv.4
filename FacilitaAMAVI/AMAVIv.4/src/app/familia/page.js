"use client";
import React, { useState } from "react";
import styles from "../styles/FamiliaPage.module.css";
import useTheme from "../../hook/useTheme";
import ConfigLayout from "../layouts/ConfigLayout";

const familia = [
  {
    nome: "João Silva",
    idade: 40,
    genero: "Masculino",
    numeroSUS: "1234567890",
    parentesco: "Pai",
    cpf: "111.111.111-11",
    rg: "MG-12.345.678",
    endereco: "Rua A, 123, Bairro X, Cidade Y, Estado Z",
  },
  {
    nome: "Maria Silva",
    idade: 38,
    genero: "Feminino",
    numeroSUS: "0987654321",
    parentesco: "Mãe",
    cpf: "222.222.222-22",
    rg: "MG-87.654.321",
    endereco: "Rua A, 123, Bairro X, Cidade Y, Estado Z",
  },
  {
    nome: "Pedro Silva",
    idade: 10,
    genero: "Masculino",
    numeroSUS: "1122334455",
    parentesco: "Filho",
    cpf: "333.333.333-33",
    rg: "MG-23.456.789",
    endereco: "Rua A, 123, Bairro X, Cidade Y, Estado Z",
  },
  {
    nome: "Ana Silva",
    idade: 8,
    genero: "Feminino",
    numeroSUS: "5566778899",
    parentesco: "Filha",
    cpf: "444.444.444-44",
    rg: "MG-98.765.432",
    endereco: "Rua A, 123, Bairro X, Cidade Y, Estado Z",
  },
];

const FamiliaPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSelectMember = (membro) => {
    setSelectedMember(selectedMember === membro ? null : membro);
  };

  return (
    <ConfigLayout>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
        <h1 className={styles.title}>Lista de Membros da Família</h1>
        
        <ul className={styles.list}>
          {familia.map((membro) => (
            <li
              key={membro.cpf}
              className={styles.listItem}
              onClick={() => handleSelectMember(membro)}
            >
              {membro.nome}
              {selectedMember === membro && (
                <div className={styles.details}>
                  <p><strong>Idade:</strong> {membro.idade}</p>
                  <p><strong>Gênero:</strong> {membro.genero}</p>
                  <p><strong>Número SUS:</strong> {membro.numeroSUS}</p>
                  <p><strong>Parentesco:</strong> {membro.parentesco}</p>
                  <p><strong>CPF:</strong> {membro.cpf}</p>
                  <p><strong>RG:</strong> {membro.rg}</p>
                  <p><strong>Endereço:</strong> {membro.endereco}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </ConfigLayout>
  );
};

export default FamiliaPage;
