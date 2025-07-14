'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../../app/layouts/SimpleLayout';
import styles from './historico-atendimentos.module.css'; // seu arquivo CSS com as classes

export default function HistoricoRequerimentos() {
  const [usuario, setUsuario] = useState(null);
  const [requerimentos, setRequerimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUsuarioERequerimentos = async () => {
      try {
        setLoading(true);
        // Verificar login
        const loginRes = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login', {
          method: 'GET',
          credentials: 'include',
        });
        if (!loginRes.ok) throw new Error('Não autenticado');
        const loginData = await loginRes.json();

        // Buscar dados do usuário
        const usuarioRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/usuarios/Usuarios?nome=${encodeURIComponent(loginData.nome)}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (!usuarioRes.ok) throw new Error('Erro ao buscar dados do usuário');
        const usuarios = await usuarioRes.json();
        const usuarioAtual = usuarios[0];
        if (!usuarioAtual) throw new Error('Usuário não encontrado');

        setUsuario(usuarioAtual);

        // Buscar requerimentos do usuário
        const reqRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/requerimentos/solicitacao/usuario/${usuarioAtual.id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!reqRes.ok) throw new Error('Erro ao buscar requerimentos');

        const reqData = await reqRes.json();
        setRequerimentos(reqData);
      } catch (err) {
        console.error(err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarioERequerimentos();
  }, [router]);

  if (loading) {
    return (
      <SimpleLayout>
        <div className={styles.container}>
          <p>Carregando histórico de requerimentos...</p>
        </div>
      </SimpleLayout>
    );
  }

  if (error) {
    return (
      <SimpleLayout>
        <div className={styles.container}>
          <p className={styles.error}>{error}</p>
        </div>
      </SimpleLayout>
    );
  }

  return (
    <SimpleLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>📜 Histórico de Requerimentos</h1>

        {usuario && <p>Olá, {usuario.nome}! Veja seus requerimentos abaixo:</p>}

        {requerimentos.length === 0 ? (
          <p>Você não possui requerimentos cadastrados.</p>
        ) : (
          <table className={styles.tabelaRequerimentos}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Classificação</th>
                <th>Documento</th>
                <th>Status</th>
                <th>Data de Solicitação</th>
              </tr>
            </thead>
            <tbody>
              {requerimentos.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.descricao}</td>
                  <td>{req.classificacao}</td>
                  <td>{req.id_documentacao || '—'}</td>
                  <td>{req.status || 'Pendente'}</td>
                  <td>{new Date(req.data_solicitacao || req.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          className={styles.btnNovaSolicitacao}
          onClick={() => router.push('/Solicitar-Atendimento')}
        >
          + Nova Solicitação
        </button>
      </div>
    </SimpleLayout>
  );
}
