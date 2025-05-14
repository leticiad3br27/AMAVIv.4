'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../app/layouts/SimpleLayout';
import styles from './requerimentos.module.css';
import { Search, CloudDownload } from 'lucide-react';

export default function Requerimentos() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleDownload = (reqName, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${reqName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavigateToCadastro = () => {
    router.push('/Solicitar-Atendimento');
  };

  const requerimentos = [
    { name: "Consulta Neurológica", content: "Requerimento para consulta com neurologista especializado." },
    { name: "Terapia Ocupacional", content: "Solicitação de atendimento em terapia ocupacional." },
    { name: "Avaliação Psicológica", content: "Pedido para avaliação psicológica do paciente." },
    { name: "Fisioterapia", content: "Requisição de sessões de fisioterapia para reabilitação." },
    { name: "Relatório Médico", content: "Solicitação de relatório médico detalhado para acompanhamento." },
  ];

  const filteredReqs = requerimentos.filter(req =>
    req.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <button type="button" onClick={handleNavigateToCadastro}>
                Cadastrar Requerimento
              </button>
            </a>
          </div>
        </div>

        {filteredReqs.length > 0 && (
          <div className={styles.resul}>
            {filteredReqs.map((req) => (
              <div key={req.name} className={styles['cad-donw']}>
                <div className={styles.txt}>
                  <h1>{req.name}</h1>
                  <h2>{req.content}</h2>
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