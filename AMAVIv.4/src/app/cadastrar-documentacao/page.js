"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./CadastrarDocumentacao.module.css";
import useTheme from "../../hook/useTheme";
import ConfigLayout from "../layouts/ConfigLayout";

const DocumentacaoPage = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  // Carrega o usuário autenticado e os documentos dele
  useEffect(() => {
    const fetchUserAndDocuments = async () => {
      try {
        setLoading(true);
        setError(null);

        const verificaRes = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login", {
          method: "GET",
          credentials: "include",
        });

        if (!verificaRes.ok) throw new Error("Usuário não autenticado.");

        const verificaData = await verificaRes.json();
        const idUsuario = verificaData.id;
        if (!idUsuario || isNaN(idUsuario)) throw new Error("ID do usuário inválido.");

        setUserId(idUsuario);

        await carregarDocumentos(idUsuario);
      } catch (err) {
        console.error("Erro:", err.message);
        setError(err.message);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndDocuments();
  }, [router]);

  const carregarDocumentos = async (idUsuario) => {
    try {
      const res = await fetch(`https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/documentos/usuario/${idUsuario}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erro ao buscar documentos.");
      const data = await res.json();
      setDocumentos(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Apenas arquivos PDF, JPEG ou PNG são permitidos.");
        setFile(null);
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("O arquivo excede o limite de 10MB.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !descricao || !userId) {
      setError("Por favor, preencha a descrição e selecione um arquivo.");
      return;
    }

    if (descricao.length > 255) {
      setError("A descrição não pode exceder 255 caracteres.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("id_usuario", userId);
      formData.append("descricao", descricao);
      formData.append("documento", file);

      const response = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/documentos", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao cadastrar documentação.");
      }

      const result = await response.json();
      setSuccess(result.message);
      setDescricao("");
      setFile(null);
      fileInputRef.current.value = null;

      await carregarDocumentos(userId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/documentos/${id}`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao baixar o arquivo.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `documento_${id}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error && !userId) {
    return (
      <div className={styles.error}>
        {error}
        <button onClick={() => router.push("/login")}>Voltar ao Login</button>
      </div>
    );
  }

  return (
    <ConfigLayout>
      <div className={`${styles.pageContainer} ${isDarkMode ? styles.darkTheme : styles.lightTheme}`}>
        <h1 className={styles.pageTitle}>Gerenciar Documentação</h1>

        <div className={styles.formContainer}>
          <h2 className={styles.sectionTitle}>Cadastrar Nova Documentação</h2>
          <form onSubmit={handleSubmit} className={styles.uploadForm}>
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
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? "Enviando..." : "Cadastrar Documento"}
            </button>
          </form>
        </div>

        <div className={styles.documentsContainer}>
          <h2 className={styles.sectionTitle}>Documentos Cadastrados</h2>
          {documentos.length > 0 ? (
            <ul className={styles.documentList}>
              {documentos.map((doc) => (
                <li key={doc.id} className={styles.documentItem}>
                  <span>
                    <strong>{doc.dia || "Data não informada"}:</strong> {doc.descricao}
                  </span>
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className={styles.downloadButton}
                    disabled={loading}
                  >
                    Baixar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noDocuments}>Nenhum documento encontrado.</p>
          )}
        </div>
      </div>
    </ConfigLayout>
  );
};

export default DocumentacaoPage;
