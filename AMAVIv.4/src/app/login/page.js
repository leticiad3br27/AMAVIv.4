"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateCPF = (cpf) => {
    const numericCPF = cpf.replace(/\D/g, "");
    return numericCPF.length === 11;
  };

  const validateForm = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === "" || trimmedPassword === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!validateCPF(trimmedUsername)) {
      alert("CPF inválido. Digite 11 números.");
      return;
    }

    try {
      const response = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ← ESSENCIAL para cookies funcionarem
        body: JSON.stringify({
          cpf: trimmedUsername,
          senha: trimmedPassword,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Erro ao realizar login.");
      }

      localStorage.setItem("token", data.token);

      // ✅ Não precisa salvar token, ele já vem via cookie HttpOnly

      router.push("/"); // Redireciona após login

    } catch (error) {
      alert(error.message || "Erro inesperado.");
    }
  };

  const handleRegister = () => {
    router.push("/Cadastrar-B");
  };

  const handleForgotPassword = () => {
    router.push("/recuperar-senha");
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape} />
        <div className={styles.shape} />
      </div>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          validateForm();
        }}
      >
        <h3 className={styles.title}>Entrar</h3>

        <label className={styles.label} htmlFor="username">
          Usuário
        </label>
        <input
          type="text"
          placeholder="CPF (somente números)"
          id="username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Usuário"
        />

        <label className={styles.label} htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          placeholder="Senha"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Senha"
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <div className={styles.actions}>
          <button type="button" className={styles.socialItem} onClick={handleRegister}>
            Cadastrar-se
          </button>
          <button type="button" className={`${styles.socialItem} ${styles.fb}`} onClick={handleForgotPassword}>
            Esqueceu a senha?
          </button>
        </div>
      </form>
    </div>
  );
}
