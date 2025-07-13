"use client";

import React, { useState, useRef } from "react";
import styles from "./CadastrarDocumentacao.module.css";
import useTheme from "../../hook/useTheme";
import ConfigLayout from "../layouts/ConfigLayout";

const isValidCPF = (cpf) => {
  // Validação simples só para formato: 000.000.000-00 ou somente números
  const regex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
  return regex.test(cpf);
};

const DocumentacaoPage = () => {
  const { isDarkMode } = useTheme();

  const [cpf, setCpf] = useState("");
  const [descricao, setDescricao] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fileInputRef = useRef(null);

  // Manipula seleção de arquivo, valida tamanho e tipo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Apenas arquivos PDF, JPEG ou PNG são permitidos.");
      setFile(null);
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("O arquivo deve ter no máximo 10MB.");
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setError(null);
  };

  // Envio do formulário para cadastrar documento
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!cpf.trim() || !descricao.trim() || !file) {
      setError("Por favor, preencha CPF, descrição e selecione um arquivo.");
      return;
    }

    if (!isValidCPF(cpf.trim())) {
      setError("CPF inválido. Formato esperado: 000.000.000-00 ou somente números.");
      return;
    }

    if (descricao.length > 255) {
      setError("A descrição deve ter no máximo 255 caracteres.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("cpf", cpf.trim());
      formData.append("descricao", descricao.trim());
      formData.append("documento", file);

      const response = await fetch(
        "https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/documentos",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Erro ao cadastrar documento.");
      }

      const result = await response.json();
      setSuccess(result.message || "Documento cadastrado com sucesso!");
      setDescricao("");
      setCpf("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigLayout>
      <div
        className={`${styles.pageContainer} ${
          isDarkMode ? styles.darkTheme : styles.lightTheme
        }`}
      >
        <h1 className={styles.pageTitle}>Cadastrar Documentação</h1>

        <section className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Cadastrar Nova Documentação</h2>
          <form onSubmit={handleSubmit} className={styles.uploadForm} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="cpf">CPF do Usuário:</label>
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                maxLength={14}
                placeholder="000.000.000-00"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="descricao">Descrição:</label>
              <input
                type="text"
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxLength={255}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="documento">Selecionar Arquivo (PDF, JPEG, PNG):</label>
              <input
                type="file"
                id="documento"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                ref={fileInputRef}
                required
                className={styles.fileInput}
              />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && <div className={styles.successMessage}>{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
              aria-busy={loading}
            >
              {loading ? "Enviando..." : "Cadastrar Documento"}
            </button>
          </form>
        </section>
      </div>
    </ConfigLayout>
  );
};

export default DocumentacaoPage;