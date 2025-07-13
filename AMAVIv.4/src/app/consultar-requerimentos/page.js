'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../app/layouts/SimpleLayout';
import styles from './requerimentos.module.css';
import { Search, CloudDownload } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://amaviapi.dev.ifro.edu.br/';

export default function Requerimentos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [requerimentos, setRequerimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchRequerimentos() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/requerimentos/solicitacao`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Erro ao buscar requerimentos');
        const data = await response.json();
        setRequerimentos(data);
      } catch (err) {
        setError('Erro ao carregar requerimentos');
      } finally {
        setLoading(false);
      }
    }
    fetchRequerimentos();
  }, []);

  const filteredReqs = requerimentos.filter(req =>
    req.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SimpleLayout>
      <div className={styles.box}>
        <div className={styles.busc}>
          <div className={styles.busca}>
            <h1>BUSQUE PELOS SEUS REQUERIMENTOS MÉDICOS</h1>
            <div className={styles['search-container']}>
              <input
                type="text"
                className={styles['search-input']}
                placeholder="Buscar"
                aria-label="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className={styles['search-icon']}>
                <Search size={12} />
              </button>
            </div>
            <a className={styles.butao}>
              <button type="button" onClick={() => router.push('/Solicitar-Atendimento')}>
                Cadastrar Requerimento
              </button>
            </a>
          </div>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {filteredReqs.length > 0 && (
          <div className={styles.resul}>
            {filteredReqs.map((req) => (
              <div key={req.id} className={styles['cad-donw']}>
                <div className={styles.txt}>
                  <h1>{req.descricao}</h1>
                  <p>Status: {req.status}</p>
                  <p>Data: {req.data}</p>
                </div>
                <button onClick={() => handleDownload(req.name, req.content)}>
                  <CloudDownload size={40} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}