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
    foto_url: "",
    isAdmin: false,
  });

  const [file, setFile] = useState(null);

  // Atualiza os campos de texto
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Lê e converte a imagem para base64
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        foto_url: reader.result, // Base64 da imagem
      }));
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  // Envia os dados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, telefone, foto_url, cargo } = formData;

    try {
      const response = await fetch(
        "https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, email, telefone, foto_url, cargo }),
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
      alert("Erro de conexão com o servidor.");
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
        <label className={styles.label} htmlFor="nome">
          Nome completo:
        </label>
        <input
          className={styles.input}
          type="text"
          id="nome"
          name="nome"
          required
          value={formData.nome}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor="email">
          Email:
        </label>
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor="telefone">
          Telefone:
        </label>
        <input
          className={styles.input}
          type="tel"
          id="telefone"
          name="telefone"
          required
          value={formData.telefone}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor="cargo">
          Cargo:
        </label>
        <input
          className={styles.input}
          type="text"
          id="cargo"
          name="cargo"
          required
          value={formData.cargo}
          onChange={handleChange}
        />

        <label className={styles.label} htmlFor="file">
          Selecionar Imagem:
        </label>
        <input
          className={styles.input}
          type="file"
          id="file"
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


