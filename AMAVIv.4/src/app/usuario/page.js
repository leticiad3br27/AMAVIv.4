"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/famipage.module.css";
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
  const { isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <ConfigLayout>
      <div className={`${styles.configLayout} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
        <div className={styles.content}>
          <div className={styles.smallSections}>
            <h1 className={styles.title}>Lista de Membros da Família</h1>
          </div>

          <div className={styles.largeSections}>
            <div className={styles.grid}>
              {familia.map((membro) => (
                <div key={membro.cpf} className={styles.card}>
                  <h2 className={styles.title}>{membro.nome}</h2>
                  <p className={styles.text}><strong>Idade:</strong> {membro.idade}</p>
                  <p className={styles.text}><strong>Gênero:</strong> {membro.genero}</p>
                  <p className={styles.text}><strong>Número SUS:</strong> {membro.numeroSUS}</p>
                  <p className={styles.text}><strong>Parentesco:</strong> {membro.parentesco}</p>
                  <p className={styles.text}><strong>CPF:</strong> {membro.cpf}</p>
                  <p className={styles.text}><strong>RG:</strong> {membro.rg}</p>
                  <p className={styles.text}><strong>Endereço:</strong> {membro.endereco}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConfigLayout>
  );
};

export default FamiliaPage;