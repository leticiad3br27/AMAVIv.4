'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../app/layouts/SimpleLayout';
import styles from './requerimentos.module.css';
import { CloudDownload } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://amaviapi.dev.vilhena.ifro.edu.br';

export default function Requerimentos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [requerimentos, setRequerimentos] = useState([]);
  const [usuariosMap, setUsuariosMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openCardId, setOpenCardId] = useState(null); // <- Novo estado
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const reqsRes = await fetch(`${API_URL}/api/requerimentos/solicitacao`);
        if (!reqsRes.ok) throw new Error('Erro ao buscar requerimentos');
        const reqs = await reqsRes.json();

        reqs.sort((a, b) => new Date(a.data || a.created_at) - new Date(b.data || b.created_at));
        setRequerimentos(reqs);

        const idsUnicos = [...new Set(reqs.map(r => r.id_usuario))];
        const usuarios = await Promise.all(
          idsUnicos.map(async id => {
            try {
              const res = await fetch(`${API_URL}/api/usuarios/Usuarios/${id}`);
              if (!res.ok) return null;
              return await res.json();
            } catch {
              return null;
            }
          })
        );

        const map = {};
        usuarios.forEach(u => {
          if (u) map[u.id] = u;
        });

        setUsuariosMap(map);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const marcarRealizado = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/requerimentos/solicitacao/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Realizado' }),
      });

      if (!res.ok) throw new Error('Erro ao atualizar status');

      setRequerimentos(prev =>
        prev.map(r => r.id === id ? { ...r, status: 'Realizado' } : r)
      );
    } catch (err) {
      alert('Erro: ' + err.message);
    }
  };

  const filteredReqs = requerimentos.filter(req =>
    req.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (name, content) => {
    alert(`Download não implementado para ${name}`);
  };

  return (
    <SimpleLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Busque pelos Requerimentos Médicos</h1>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={() => router.push('/Solicitar-Atendimento')} className={styles.btnNovaSolicitacao}>
            Cadastrar Requerimento
          </button>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {filteredReqs.length > 0 ? (
          filteredReqs.map(req => {
            const usuario = usuariosMap[req.id_usuario];
            const aberto = openCardId === req.id;

            return (
              <div key={req.id} className={`${styles.card} ${aberto ? styles.aberto : ''}`} onClick={() => setOpenCardId(aberto ? null : req.id)}>
                <div className={styles.cardHeader}>
                  <h2>{req.descricao || 'Sem descrição'}</h2>
                  <span className={styles.status}>{req.status || 'Pendente'}</span>
                </div>

                {aberto && (
                  <div className={styles.cardContent}>
                    <p><strong>Data:</strong> {new Date(req.data || req.created_at).toLocaleDateString()}</p>
                    <p><strong>Descrição Completa:</strong> {req.descricao || 'Sem descrição'}</p>
                    {usuario ? (
                      <>
                        <p><strong>Nome:</strong> {usuario.nome}</p>
                        <p><strong>CPF:</strong> {usuario.cpf || 'Não informado'}</p>
                      </>
                    ) : (
                      <p><em>Usuário não encontrado</em></p>
                    )}
                    <div className={styles.actions}>
                      <button onClick={(e) => { e.stopPropagation(); handleDownload(req.name, req.content); }}>
                        <CloudDownload size={30} />
                      </button>
                      {req.status !== 'Realizado' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); marcarRealizado(req.id); }}
                          className={styles.btnRealizado}
                        >
                          Marcar como Realizado
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          !loading && <p>Nenhum requerimento encontrado.</p>
        )}
      </div>
    </SimpleLayout>
  );
}
