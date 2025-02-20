"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/FamiliaPage.module.css";
import useTheme from "../../hook/useTheme";

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
  const router = useRouter();

  return (
    <div className={`ConfigLayout ${isDarkMode ? "darkTheme" : "lightTheme"}`}>
      <div className="content">
        <div className="smallSections">
          <h1 className="title">Lista de Membros da Família</h1>
          <button className="userButton blue" onClick={toggleTheme}>
            Alternar Tema
          </button>
        </div>

        <div className="largeSections">
          <div className="grid">
            {familia.map((membro) => (
              <div key={membro.cpf} className="card">
                <h2 className="title">{membro.nome}</h2>
                <p className="text"><strong>Idade:</strong> {membro.idade}</p>
                <p className="text"><strong>Gênero:</strong> {membro.genero}</p>
                <p className="text"><strong>Número SUS:</strong> {membro.numeroSUS}</p>
                <p className="text"><strong>Parentesco:</strong> {membro.parentesco}</p>
                <p className="text"><strong>CPF:</strong> {membro.cpf}</p>
                <p className="text"><strong>RG:</strong> {membro.rg}</p>
                <p className="text"><strong>Endereço:</strong> {membro.endereco}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamiliaPage;
