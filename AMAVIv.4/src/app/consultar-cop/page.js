"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import SimpleLayout from "../layouts/SimpleLayout";
const people = [
  {
    name: "João Silva",
    cpf: "111.111.111-11",
    matricula: "A001",
    role: "Usuário",
    idade: 30,
    familiaRegistrada: true,
    responsavel: false,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: true,
    ofereceAtendimentos: false,
    cargo: null,
    imageUrl: "/assets/img/Family First.jpg",
  },
  {
    name: "Maria Souza",
    cpf: "222.222.222-22",
    matricula: "A002",
    role: "Cooperador",
    idade: 28,
    familiaRegistrada: true,
    responsavel: true,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: false,
    ofereceAtendimentos: true,
    cargo: null,
    imageUrl: "/assets/img/As mudanças em nossa relação com a beleza » STEAL THE LOOK.jpg",
  },
  {
    name: "Carlos Pereira",
    cpf: "333.333.333-33",
    matricula: "A003",
    role: "Administrador",
    idade: 40,
    familiaRegistrada: false,
    responsavel: false,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: false,
    ofereceAtendimentos: false,
    cargo: "Gerente de Sistema",
    imageUrl: "/assets/img/William Mcmera.jpg",
  },
  {
    name: "Lucas Souza",
    cpf: "444.444.444-44",
    matricula: "A004",
    role: "Beneficiário",
    idade: 8,
    familiaRegistrada: true,
    responsavel: true,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: true,
    ofereceAtendimentos: false,
    cargo: null,
    imageUrl: "/assets/img/27b3d754-ef34-4fa0-818b-bf5319453206.jpg",
  },
  {
    name: "Fernanda Lima",
    cpf: "555.555.555-55",
    matricula: "A005",
    role: "Responsável",
    idade: 35,
    familiaRegistrada: true,
    responsavel: true,
    beneficiarioResponsavel: true,
    atendimentosRegistrados: false,
    ofereceAtendimentos: false,
    cargo: null,
    imageUrl: "/assets/img/Katya Sitak.jpg",
  },
  {
    name: "Ana Clara Ribeiro",
    cpf: "666.666.666-66",
    matricula: "A006",
    role: "Beneficiário",
    idade: 10,
    familiaRegistrada: true,
    responsavel: true,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: true,
    ofereceAtendimentos: false,
    cargo: null,
    imageUrl: "/assets/img/- Freedom.jpg",
  },
  {
    name: "Ricardo Mendes",
    cpf: "777.777.777-77",
    matricula: "A007",
    role: "Responsável",
    idade: 42,
    familiaRegistrada: true,
    responsavel: true,
    beneficiarioResponsavel: true,
    atendimentosRegistrados: false,
    ofereceAtendimentos: false,
    cargo: null,
    imageUrl: "/assets/img/40 Cortes de Cabelo Crespo (sem definição) pra se Inspirar.jpg",
  },
  {
    name: "Beatriz Ferreira",
    cpf: "888.888.888-88",
    matricula: "A008",
    role: "Beneficiário",
    idade: 6,
    familiaRegistrada: true,
    responsavel: true,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: true,
    ofereceAtendimentos: false,
    cargo: null,
    imageUrl: "/assets/img/8cd27ce5-5728-4c79-8f7b-2f9dabfedeab.jpg",
  },
  {
    name: "Diego Santos",
    cpf: "999.999.999-99",
    matricula: "A009",
    role: "Cooperador",
    idade: 38,
    familiaRegistrada: true,
    responsavel: false,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: false,
    ofereceAtendimentos: true,
    cargo: null,
    imageUrl: "/assets/img/🎬.jpg",
  },
  {
    name: "Patrícia Almeida",
    cpf: "101.101.101-10",
    matricula: "A010",
    role: "Administrador",
    idade: 45,
    familiaRegistrada: true,
    responsavel: true,
    beneficiarioResponsavel: false,
    atendimentosRegistrados: true,
    ofereceAtendimentos: true,
    cargo: "Diretora Executiva",
    imageUrl: "/assets/img/95f40acc-f635-4f68-88d9-f5d40c555ede.jpg",
  }
];



function ConsultarCooperador() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredResults = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.cpf.includes(searchTerm) ||
      person.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => setSelectedPerson(null);

  return (
    <SimpleLayout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Consultar</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Consultar por Nome, CPF ou Matrícula"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
            aria-label="Campo de busca"
          />
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Matrícula</th>
                <th>Função</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length > 0 ? (
                filteredResults.map((result, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedPerson(result)}
                    className={styles.row}
                    tabIndex={0}
                    role="button"
                    onKeyPress={(e) => e.key === "Enter" && setSelectedPerson(result)}
                  >
                    <td>{result.name}</td>
                    <td>{result.cpf}</td>
                    <td>{result.matricula}</td>
                    <td>{result.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.noResults}>
                    Nenhum resultado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedPerson && (
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              
              <div className={styles.modalInfo}>
                <div className={styles.textInfo}>
                  <h2>{selectedPerson.name}</h2>
                  <p><strong>CPF:</strong> {selectedPerson.cpf}</p>
                  <p><strong>Matrícula:</strong> {selectedPerson.matricula}</p>
                  <p><strong>Idade:</strong> {selectedPerson.idade} anos</p>
                  <p><strong>Função:</strong> {selectedPerson.role}</p>
                  <p><strong>Tem família registrada?</strong> {selectedPerson.familiaRegistrada ? "Sim" : "Não"}</p>
                  <p><strong>É responsável?</strong> {selectedPerson.responsavel ? "Sim" : "Não"}</p>
                  <p><strong>É beneficiário responsável?</strong> {selectedPerson.beneficiarioResponsavel ? "Sim" : "Não"}</p>
                  <p><strong>Tem atendimentos registrados?</strong> {selectedPerson.atendimentosRegistrados ? "Sim" : "Não"}</p>
                  <p><strong>Oferece atendimentos?</strong> {selectedPerson.ofereceAtendimentos ? "Sim" : "Não"}</p>
                  {selectedPerson.role === "Administrador" && (
                    <p><strong>Cargo:</strong> {selectedPerson.cargo}</p>
                  )}
                </div>
                <img
                  src={selectedPerson.imageUrl}
                  alt={`Imagem de ${selectedPerson.name}`}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}

export default ConsultarCooperador;
