'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../app/layouts/SimpleLayout';
import styles from './requerimentos.module.css';
import { Search, CloudDownload } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://amaviapi.dev.vilhena.ifro.edu.br';

export default function Requerimentos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [requerimentos, setRequerimentos] = useState([]);
  const [usuariosMap, setUsuariosMap] = useState({}); // { id_usuario: { nome, cpf } }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchRequerimentosEUsuarios() {
      setLoading(true);
      try {
        // Buscar requerimentos
        const resReqs = await fetch(`${API_URL}/api/requerimentos/solicitacao`);
        if (!resReqs.ok) throw new Error('Erro ao buscar requerimentos');
        const reqs = await resReqs.json();

        // Ordenar do mais antigo para o mais novo
        reqs.sort((a, b) => new Date(a.data || a.created_at) - new Date(b.data || b.created_at));
        setRequerimentos(reqs);

        // Extrair ids únicos de usuários
        const idsUsuarios = [...new Set(reqs.map(r => r.id_usuario))];

        // Buscar dados dos usuários em paralelo
        const usuariosFetches = idsUsuarios.map(id =>
          fetch(`${API_URL}/api/usuarios/Usuarios/${id}`).then(res => {
            if (!res.ok) throw new Error(`Erro ao buscar usuário ${id}`);
            return res.json();
          })
        );

        const usuariosDados = await Promise.all(usuariosFetches);

        // Montar mapa id_usuario => dados
        const map = {};
        usuariosDados.forEach(usr => {
          map[usr.id] = usr;
        });
        setUsuariosMap(map);

        setError('');
      } catch (err) {
        setError(err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchRequerimentosEUsuarios();
  }, []);

  // Atualiza status para 'Realizado'
  async function marcarRealizado(id) {
    try {
      const res = await fetch(`${API_URL}/api/requerimentos/solicitacao/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Realizado' }),
      });
      if (!res.ok) throw new Error('Falha ao atualizar status');

      setRequerimentos(prev =>
        prev.map(req => (req.id === id ? { ...req, status: 'Realizado' } : req))
      );
    } catch (err) {
      alert('Erro ao atualizar status: ' + err.message);
    }
  }

  const filteredReqs = requerimentos.filter(req =>
    req.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDownload(name, content) {
    alert(`Implementar download para ${name}`);
  }

  return (
    <SimpleLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>BUSQUE PELOS REQUERIMENTOS MÉDICOS</h1>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Buscar"
            aria-label="Buscar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button
            className={styles.btnNovaSolicitacao}
            onClick={() => router.push('/Solicitar-Atendimento')}
            style={{ marginTop: '10px' }}
          >
            Cadastrar Requerimento
          </button>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {filteredReqs.length > 0 ? (
          filteredReqs.map(req => {
            const usuario = usuariosMap[req.id_usuario];
            return (
              <div key={req.id} className={styles['cad-donw']}>
                <div className={styles.txt}>
                  <h2>{req.descricao}</h2>
                  <p><strong>Status:</strong> {req.status || 'Pendente'}</p>
                  <p>
                    <strong>Data:</strong>{' '}
                    {req.data
                      ? new Date(req.data).toLocaleDateString()
                      : req.created_at
                      ? new Date(req.created_at).toLocaleDateString()
                      : 'Não informada'}
                  </p>
                  {usuario ? (
                    <>
                      <p><strong>Nome:</strong> {usuario.nome}</p>
                      <p><strong>CPF:</strong> {usuario.cpf || 'Não informado'}</p>
                    </>
                  ) : (
                    <p><em>Carregando dados do usuário...</em></p>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => handleDownload(req.name, req.content)}>
                    <CloudDownload size={40} />
                  </button>
                  {req.status !== 'Realizado' && (
                    <button
                      onClick={() => marcarRealizado(req.id)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#001755',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Marcar como Realizado
                    </button>
                  )}
                </div>
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
