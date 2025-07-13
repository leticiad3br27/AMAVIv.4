"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfigLayout from "../layouts/ConfigLayout";
import classNames from "classnames";
import styles from "../styles/Configuracoes.module.css";
import useTheme from "../../hook/useTheme";

const AdminLoginPage = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Valida formato do e-mail
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validação básica
    if (!validateEmail(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }
    if (!senha || senha.length < 4) {
      setError("A senha deve conter pelo menos 4 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/login-admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        }
      );

      const data = await response.json();
      console.log("Resposta da API:", response.status, data); // Diagnóstico

      if (response.ok) {
        // Se a resposta for 200, login realizado com sucesso
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        router.push("/ConfigAdm");
      } else {
        if (response.status === 401) {
          setError("E-mail ou senha incorretos.");
        } else if (response.status === 404) {
          setError("Usuário não encontrado.");
        } else {
          setError(data?.erro || data?.message || "Erro ao realizar login.");
        }
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
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
                  placeholder="exemplo@dominio.com"
                  required
                  autoComplete="off"
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
                  placeholder="Digite sua senha"
                  required
                  autoComplete="off"
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button
                type="submit"
                className={classNames(styles.userButton, styles.blue)}
                disabled={loading || !email || !senha}
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
              type="button"
              className={styles.userButton}
              onClick={() => router.push("/")}
              title="Voltar à página principal"
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
