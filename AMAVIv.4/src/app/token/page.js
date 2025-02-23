"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Token.module.css";

const TokenPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (searchParams) {
      const tokenFromURL = searchParams.get("code") || "";
      setToken(tokenFromURL);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError("Por favor, insira o código de recuperação.");
      return;
    }

    if (inputValue.trim().toString() !== token.trim().toString()) {
      setError("Código inválido. Verifique o e-mail de recuperação.");
      return;
    }

    setError("");
    setSuccess("Código validado com sucesso! Redirecionando...");

    setTimeout(() => {
      router.push("/redefinir-senha");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Validação de Código</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="token">Digite o código enviado para seu e-mail:</label>
          <input
            type="text"
            id="token"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Código de recuperação"
          />
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>

        <button type="submit" className={styles.button} disabled={!inputValue.trim()}>
          Validar Código
        </button>
      </form>
    </div>
  );
};

export default TokenPage;
