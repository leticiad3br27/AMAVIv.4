"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SideMenu.module.css';

const SideMenu = ({ isMenuOpen, closeSideMenu }) => {
  const [usuario, setUsuario] = useState(null);
  const [erroLogin, setErroLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
          setErroLogin(false);
        } else {
          setErroLogin(true);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        setErroLogin(true);
      }
    };

    if (isMenuOpen) {
      fetchUsuario();
    }
  }, [isMenuOpen]);

  const irParaLogin = () => {
    router.push('/login');
  };

  return (
    <div className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ''}`}>
      {erroLogin ? (
        <button className={styles.loginBtn} onClick={irParaLogin}>
          Fazer login
        </button>
      ) : (
        <>
          <h1 className={styles.nameTi}>{usuario?.nome || 'Carregando...'}</h1>
          <button className={styles.closeBtn} onClick={closeSideMenu}>
            &times;
          </button>
          <a href="/usuario" className={styles.sideLink}>Conta</a>
          <a href="/configuracoes" className={styles.sideLink}>Configurações</a>
          <a href="/Solicitar-Atendimento/historico-atendimentos" className={styles.sideLink}>Requerimentos</a>
        </>
      )}
    </div>
  );
};

export default SideMenu;
