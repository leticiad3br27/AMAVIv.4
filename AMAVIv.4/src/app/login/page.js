"use client";
import React, { useState } from 'react';
import styles from './login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername === '' || trimmedPassword === '') {
      alert('Por favor, preencha todos os campos antes de continuar.');
      return;
    }
    
    // Validação simples: usuário e senha devem ser "root"
    if (trimmedUsername === 'root' && trimmedPassword === 'root') {
      window.location.href = './';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const handleRegister = () => {
    window.location.href = './Cadastrar-B'; // Redireciona para a página de cadastro
  };

  const handleForgotPassword = () => {
    window.location.href = './recuperar-senha'; // Redireciona para a página de recuperação de senha
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape} />
        <div className={styles.shape} />
      </div>

      <form className={styles.form} id="loginForm" onSubmit={(e) => { e.preventDefault(); validateForm(); }}>
        <h3 className={styles.title}>Entrar</h3>

        <label className={styles.label} htmlFor="username">
          Usuário
        </label>
        <input
          type="text"
          placeholder="Email ou Telefone"
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

        <button type="button" className={styles.button} onClick={validateForm}>
          Entrar
        </button>
        <div className={styles.social}>
          <button 
            type="button"
            className={styles.socialItem}
            onClick={handleRegister}
          >
            Cadastrar-se
          </button>
          <button 
            type="button"
            className={`${styles.socialItem} ${styles.fb}`}
            onClick={handleForgotPassword}
          >
            Esqueceu a senha?
          </button>
        </div>
      </form>
    </div>
  );
}
