"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RedefinirSenha.module.css";

const RedefinirSenha = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setError("");
    setSuccess("Senha redefinida com sucesso! Redirecionando...");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Redefinir Senha</h1>

        <div className={styles.inputContainer}>
          <label htmlFor="password">Nova Senha:</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua nova senha"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="confirmPassword">Confirme a Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme sua nova senha"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button
          type="submit"
          className={styles.button}
          disabled={!password || !confirmPassword}
        >
          Redefinir Senha
        </button>
      </form>
    </div>
  );
};

export default RedefinirSenha;

