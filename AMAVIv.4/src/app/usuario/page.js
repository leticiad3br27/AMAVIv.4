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
    parentesco: "Usuário Principal",
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

const usuarioPrincipal = familia.find((membro) => membro.parentesco === "Usuário Principal");
const parentes = familia.filter((membro) => membro.parentesco !== "Usuário Principal");

const FamiliaPage = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <ConfigLayout>
      <div className={`${styles.configLayout} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <div className={styles.profileImage}></div>
            <h1 className={styles.profileName}>{usuarioPrincipal?.nome}</h1>
            <p className={styles.profileText}><strong>Idade:</strong> {usuarioPrincipal?.idade}</p>
            <p className={styles.profileText}><strong>Gênero:</strong> {usuarioPrincipal?.genero}</p>
            <p className={styles.profileText}><strong>Número SUS:</strong> {usuarioPrincipal?.numeroSUS}</p>
            <p className={styles.profileText}><strong>CPF:</strong> {usuarioPrincipal?.cpf}</p>
            <p className={styles.profileText}><strong>RG:</strong> {usuarioPrincipal?.rg}</p>
            <p className={styles.profileText}><strong>Endereço:</strong> {usuarioPrincipal?.endereco}</p>
          </div>

          <div className={styles.relationsContainer}>
            <h2 className={styles.relationsTitle}>Vinculados</h2>
            <ul className={styles.relationsList}>
              {parentes.map((membro) => (
                <li 
                  key={membro.cpf} 
                  className={styles.relationItem} 
                  onClick={() => router.push("/login")}
                >
                  {membro.nome}
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
