"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfigLayout from "../layouts/ConfigLayout";
import classNames from "classnames";
import styles from "../styles/Configuracoes.module.css";
import useTheme from "../../hook/useTheme";

const AdminLoginPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/colaborador/login-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setError("");
        router.push("/ConfigAdm");
      } else {
        setError(data.erro || "Erro ao realizar login.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigLayout>
      <main className={styles.content}>
        <section className={styles.smallSections}>
          <div className={styles.section}>
            <h2 className={styles.title}>Login ADM</h2>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="senha" className={styles.label}>
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button
                type="submit"
                className={classNames(styles.userButton, styles.blue)}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </section>

        <section className={styles.largeSections}>
          <div className={styles.largeSection}>
            <h2 className={styles.title}>Opções Adicionais</h2>
            <p className={styles.text}>
              Caso você não seja um administrador, clique no botão abaixo para voltar
              à página principal.
            </p>
            <button
              className={styles.userButton}
              onClick={() => router.push("/")}
            >
              Página Principal
            </button>
          </div>
        </section>
      </main>
    </ConfigLayout>
  );
};

export default AdminLoginPage;
