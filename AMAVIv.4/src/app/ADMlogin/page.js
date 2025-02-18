"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfigLayout from "../layouts/ConfigLayout";
import styles from "../styles/Configuracoes.module.css";
import useTheme from "../../hook/useTheme"; 

const adminData = [
  { username: "admin1", password: "password1" },
  { username: "admin2", password: "password2" },
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
      router.push("/ConfigAdm");
    } else {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <ConfigLayout>
      <main className={styles.content}>
        <section className={styles.largeSections}>
          <div className={styles.largeSection}>
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
              <button type="submit" className="buttonADM">
                Login
              </button>
            </form>
          </div>
        </section>
      </main>
      <style jsx>{`
        .buttonADM {
          width: 100%;
          padding: 0.75rem;
          background-color: #28a745;
          border: none;
          color: #fff;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .buttonADM:hover {
          background-color: #218838;
        }
      `}</style>
    </ConfigLayout>
  );
};

export default AdminLoginPage;
