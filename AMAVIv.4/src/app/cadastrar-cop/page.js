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
    cargo: "",
    isAdmin: false,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("nome", formData.nome);
    form.append("email", formData.email);
    form.append("telefone", formData.telefone);
    form.append("cargo", formData.cargo);
    if (file) form.append("foto", file); // campo deve ser "foto" se for o que a API espera

    try {
      const response = await fetch(
        "https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores",
        {
          method: "POST",
          body: form, // NÃO definir Content-Type (o navegador define automaticamente)
        }
      );

      const text = await response.text();
      console.log("Status:", response.status);
      console.log("Resposta:", text);

      if (response.ok) {
        const data = JSON.parse(text);
        alert("Cadastro realizado com sucesso!");
        if (formData.isAdmin) router.push("/cadastrar-senha");
      } else {
        alert("Erro ao cadastrar: " + text);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro na requisição.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>CADASTRAR COOPERADOR</h1>
      <button
        type="button"
        className={styles.buttonVoltar}
        onClick={() => router.push("/ConfigAdm")}
      >
        Voltar para Configuração
      </button>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Nome completo:</label>
        <input
          className={styles.input}
          type="text"
          name="nome"
          required
          value={formData.nome}
          onChange={handleChange}
        />

        <label className={styles.label}>Email:</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label className={styles.label}>Telefone:</label>
        <input
          className={styles.input}
          type="tel"
          name="telefone"
          required
          value={formData.telefone}
          onChange={handleChange}
        />

        <label className={styles.label}>Cargo:</label>
        <input
          className={styles.input}
          type="text"
          name="cargo"
          required
          value={formData.cargo}
          onChange={handleChange}
        />

        <label className={styles.label}>Selecionar Imagem:</label>
        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <label className={styles.label}>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          É Administrador?
        </label>

        <button type="submit" className={styles.button}>
          Finalizar Cadastro
        </button>
      </form>
    </div>
  );
}

export default CadastrarCooperador;



