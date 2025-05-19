"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const validateForm = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    if (trimmedUsername === '' || trimmedPassword === '') {
      alert('Por favor, preencha todos os campos antes de continuar.');
      return;
    }
    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: trimmedUsername,
          senha: trimmedPassword,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao realizar login.');
      }
      const data = await response.json();
      // Armazenar o token no localStorage
      localStorage.setItem('token', data.token); // Supondo que o token esteja na resposta da API
      window.location.href = './'; // Redireciona após o login bem-sucedido
    } catch (error) {
      alert(error.message);
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
          placeholder="CPF"
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