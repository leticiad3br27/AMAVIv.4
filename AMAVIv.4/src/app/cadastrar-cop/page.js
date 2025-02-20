"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"; 

function CadastrarCooperador() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    funcao: "",
    setor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados cadastrados:", formData);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className={styles.container}>
      <h1>CADASTRAR COOPERADOR</h1>
      <button type="button" className={styles.buttonVoltar} onClick={() => router.push("/ConfigAdm")}>Voltar para Configuração</button>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="nome">Nome completo:</label>
        <input className={styles.input} type="text" id="nome" name="nome" required value={formData.nome} onChange={handleChange} />

        <label className={styles.label} htmlFor="email">Email:</label>
        <input className={styles.input} type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />

        <label className={styles.label} htmlFor="telefone">Telefone:</label>
        <input className={styles.input} type="tel" id="telefone" name="telefone" required value={formData.telefone} onChange={handleChange} />

        <label className={styles.label}  htmlFor="cpf">CPF:</label>
        <input className={styles.input} type="text" id="cpf" name="cpf" required value={formData.cpf} onChange={handleChange} />

        <label className={styles.label} htmlFor="data_nascimento">Data de Nascimento:</label>
        <input className={styles.input} type="date" id="data_nascimento" name="dataNascimento" required value={formData.dataNascimento} onChange={handleChange} />

        <label className={styles.label} htmlFor="funcao">Função:</label>
        <input className={styles.input} type="text" id="funcao" name="funcao" required value={formData.funcao} onChange={handleChange} />

        <label className={styles.label} htmlFor="setor">Setor:</label>
        <input className={styles.input} type="text" id="setor" name="setor" required value={formData.setor} onChange={handleChange} />

        <button type="submit" className={styles.button}>Finalizar Cadastro</button>
      </form>
      
      
    </div>
  );
}

export default CadastrarCooperador;

