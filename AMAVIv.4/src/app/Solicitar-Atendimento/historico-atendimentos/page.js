"use client";
import React, { useEffect, useState } from 'react';
import styles from './historico-atendimentos.module.css';
import { useRouter } from "next/navigation";
import SimpleLayout from '../../layouts/SimpleLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://amaviapi.dev.ifro.edu.br/';

const HistoricoAtendimentos = () => {
  const router = useRouter();
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHistorico() {
      setLoading(true);
      try {
        // Busque o ID do usuário autenticado conforme sua lógica de autenticação
        // Exemplo: const userId = getUserIdFromContext();
        const userId = 1; // Substitua pelo ID real do usuário autenticado
        const response = await fetch(`${API_URL}/api/historico/atendimento/${userId}`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Erro ao buscar histórico');
        const data = await response.json();
        setHistorico(data);
      } catch (err) {
        setError('Erro ao carregar histórico');
      } finally {
        setLoading(false);
      }
    }
    fetchHistorico();
  }, []);

  const handleNovaSolicitacao = () => {
    router.push('/Solicitar-Atendimento');
  };

  return (
    <SimpleLayout>
      <div className={`${styles.container} ${styles.lightTheme}`}>
        <h1>Histórico de Requerimentos</h1>
        {loading && <p>Carregando...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <table className={styles.tabelaRequerimentos}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historico.map(requerimento => (
              <tr key={requerimento.solicitacao_id}>
                <td>{requerimento.solicitacao_id}</td>
                <td>{requerimento.solicitacao_descricao}</td>
                <td>{requerimento.data}</td>
                <td>{requerimento.solicitacao_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.btnNovaSolicitacao} onClick={handleNovaSolicitacao}>
          Nova Solicitação
        </button>
      </div>
    </SimpleLayout>
  );
};

export default HistoricoAtendimentos;