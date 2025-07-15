"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RecuperarSenha.module.css";
import useTheme from "../../hook/useTheme";
import emailjs from "emailjs-com";

const credenciaisValidas = {
  emails: ["almeida.leticia@estudante.ifro.edu.br", "teste@dominio.com", "exemplo@amavi.org"],
  cpfs: ["05873188211", "222.222.222-22", "333.333.333-33"],
  matriculas: ["123456", "987654", "654321"],
};

const RecuperarSenha = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validarEntrada = (valor) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const matriculaRegex = /^\d+$/;

    if (emailRegex.test(valor) && credenciaisValidas.emails.includes(valor)) {
      return true;
    }
    if (cpfRegex.test(valor) && credenciaisValidas.cpfs.includes(valor)) {
      return true;
    }
    if (matriculaRegex.test(valor) && credenciaisValidas.matriculas.includes(valor)) {
      return true;
    }
    return false;
  };

  const enviarEmailRecuperacao = (email) => {
    const codigoRecuperacao = Math.floor(100000 + Math.random() * 900000);
    const templateParams = {
      to_name: "Usuário",
      codigo_recuperacao: codigoRecuperacao,
      link_recuperacao: `https://seusite.com/redefinir-senha?token=${codigoRecuperacao}`,
      to_email: email,
    };

    emailjs
      .send("service_bif0rvw", "template_0aujz4i", templateParams, "hanOF7cUS6AldQgrz")
      .then((response) => {
        console.log("✅ E-mail enviado!", response.status, response.text);
        setSuccess("E-mail de recuperação enviado com sucesso!");
        setTimeout(() => {
          router.push(`/token?code=${codigoRecuperacao}`);
        }, 2000);
      })
      .catch((error) => {
        console.error("❌ Erro ao enviar e-mail:", error);
        setError("Erro ao enviar e-mail. Tente novamente.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError("Por favor, preencha este campo.");
      return;
    }

    if (!validarEntrada(inputValue)) {
      setError("Credencial inválida. Verifique seu email, CPF ou matrícula.");
      return;
    }

    setError("");
    setSuccess("");
    enviarEmailRecuperacao(inputValue);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Recuperar Senha</h1>

        <div className={styles.inputContainer}>
          <label htmlFor="input">Matrícula, Email ou CPF:</label>
          <input
            type="text"
            id="input"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua matrícula, email ou CPF"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.button} disabled={!inputValue.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RecuperarSenha;
