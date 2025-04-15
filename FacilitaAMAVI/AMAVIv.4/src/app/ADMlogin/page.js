"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfigLayout from "../layouts/ConfigLayout";
import classNames from "classnames";
import styles from "../styles/Configuracoes.module.css";
import useTheme from "../../hook/useTheme";

const adminData = [
  { username: "admin1", password: "password1" },
  { username: "admin2", password: "password2" },
  { username: "root", password: "root" },
];

const AdminLoginPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const admin = adminData.find(
      (item) => item.username === username && item.password === password
    );

    if (admin) {
      setError("");
      router.push("/ConfigAdm"); // redireciona para a página de administração
    } else {
      setError("Credenciais inválidas.");
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
                <label htmlFor="username" className={styles.label}>
                  Usuário
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={classNames(styles.userButton, styles.blue)}>
                Entrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.largeSections}>
          <div className={styles.largeSection}>
            <h2 className={styles.title}>Opções Adicionais</h2>
            <p className={styles.text}>
              Caso você não seja um administrador, clique no botão abaixo para voltar à página principal.
            </p>
            <button className={styles.userButton} onClick={() => router.push("/")}>
              Página Principal
            </button>
          </div>
        </section>
      </main>
    </ConfigLayout>
  );
};

export default AdminLoginPage;
