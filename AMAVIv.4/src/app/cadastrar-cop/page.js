'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function CadastrarCooperador() {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'foto_url' && value.length > 255) {
      setError('A URL da foto não pode exceder 255 caracteres.');
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
      <Link href="/ConfigAdm" className={styles.voltarBtn}>
        ← Voltar para Configuração
      </Link>

      <h1 className={styles.titulo}>Cadastrar Cooperador</h1>

      {error && <p className={styles.error}>Erro: {error}</p>}
      {loading && <p className={styles.loading}>Carregando...</p>}

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

          <label htmlFor="foto_url" className={styles.label}>URL da Foto (opcional):</label>
          <input
            type="url"
            id="foto_url"
            name="foto_url"
            value={form.foto_url}
            onChange={handleChange}
            placeholder="https://exemplo.com/foto.jpg"
            maxLength={255}
            aria-describedby="foto_url_help"
            className={styles.input}
          />
          <p id="foto_url_help" className={styles.helpText}>
            Insira uma URL válida para a foto (máximo 255 caracteres).
          </p>

          <label htmlFor="foto" className={styles.label}>Selecionar Imagem (opcional):</label>
          <input
            type="file"
            id="foto"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
          />

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CadastrarCooperador;


