"use client";
import React from 'react';
import styles from './login.module.css';

export default function Login() {
  const validateForm = () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
      alert('Por favor, preencha todos os campos antes de continuar.');
      return;
    }
    
    // Validação simples: usuário e senha devem ser "root"
    if (username === 'root' && password === 'root') {
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

      <form className={styles.form} id="loginForm">
        <h3>&lt;-----Login-----&gt;</h3>

        <label className={styles.label} htmlFor="username">
          Usuário
        </label>
        <input
          type="text"
          placeholder="Email ou Telefone"
          id="username"
          className={styles.input}
        />

        <label className={styles.label} htmlFor="password">
          Senha
        </label>
        <input
          type="password"
          placeholder="Senha"
          id="password"
          className={styles.input}
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
            Primeira vez aqui?
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
