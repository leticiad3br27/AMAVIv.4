"use client";
import { useState } from 'react';
import Link from 'next/link'; // Usando Link para navegação
import styles from './page.module.css';

const CriarSenha = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [requisitos, setRequisitos] = useState({
    minLength: false,
    upperCase: false,
    number: false,
    specialChar: false,
  });
  const [senhasCoincidem, setSenhasCoincidem] = useState(true); // Para validar se as senhas coincidem

  const handleChange = (e) => {
    const valor = e.target.value;
    setSenha(valor);

    setRequisitos({
      minLength: valor.length >= 8,
      upperCase: /[A-Z]/.test(valor),
      number: /[0-9]/.test(valor),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(valor),
    });
  };

  const handleConfirmarSenhaChange = (e) => {
    const valor = e.target.value;
    setConfirmarSenha(valor);
    setSenhasCoincidem(valor === senha); // Verificando se as senhas coincidem
  };

  const isFormValid = 
    Object.values(requisitos).every((req) => req === true) && 
    senhasCoincidem;

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Criação de Senha</h1>
      <div className={styles.formulario}>
        <input
          type="password"
          className={styles.input}
          placeholder="Crie sua senha"
          value={senha}
          onChange={handleChange}
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChange={handleConfirmarSenhaChange}
        />
        <div className={styles.requisitos}>
          <div className={`${styles.requisito} ${requisitos.minLength ? styles.valido : styles.invalid}`}>
            Mínimo 8 caracteres
          </div>
          <div className={`${styles.requisito} ${requisitos.upperCase ? styles.valido : styles.invalid}`}>
            Pelo menos uma letra maiúscula
          </div>
          <div className={`${styles.requisito} ${requisitos.number ? styles.valido : styles.invalid}`}>
            Pelo menos um número
          </div>
          <div className={`${styles.requisito} ${requisitos.specialChar ? styles.valido : styles.invalid}`}>
            Pelo menos um caractere especial
          </div>
        </div>
        {!senhasCoincidem && (
          <div className={styles.erro}>As senhas não coincidem!</div>
        )}
        <Link href="/login">
          <button
            className={styles.botao}
            disabled={!isFormValid}
          >
            Criar Senha
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CriarSenha;
