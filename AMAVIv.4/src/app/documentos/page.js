'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../layout/Simplelayout';
import styles from './documentos.module.css';
import { Search, SquareCheckBig, CloudDownload } from 'lucide-react';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nome'); // <- Novo estado de filtro
  const router = useRouter();

  const handleDownload = (docName, content) => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${docName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavigateToCadastro = () => {
    router.push('/cadastrar-documentacao');
  };

  const documents = [
    { name: "RG", content: "Documento de identidade oficial do usuário.", date: "2022-01-01", type: "Identificação" },
    { name: "CPF", content: "Cadastro de Pessoa Física do usuário.", date: "2021-06-15", type: "Fiscal" },
    { name: "CEP", content: "Código de Endereçamento Postal do endereço cadastrado.", date: "2020-12-10", type: "Endereço" },
    { name: "FICHAS", content: "Fichas de cadastro e atendimento registradas no sistema.", date: "2023-03-22", type: "Cadastro" },
    { name: "LAUDOS", content: "Laudos médicos e psicológicos arquivados no banco de dados.", date: "2023-02-10", type: "Saúde" },
  ];

  // Filtrando por busca
  const filteredDocs = documents
    .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'alfabetico') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'data') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'tipo') {
        return a.type.localeCompare(b.type);
      }
      return 0; // Padrão
    });

  return (
    <SimpleLayout>
      <div className={styles.box}>
        <div className={styles.busc}>
          <div className={styles.busca}>
            <h1>BUSQUE PELA SUA DOCUMENTAÇÃO</h1>
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
                Cadastrar Documentação
              </button>
            </a>
          </div>

          {/* Sugestões agora são filtros */}
          <div className={styles.sugestao}>
            <h1>FILTRAR POR</h1>
            <div className={styles['filter-buttons']}>
              <button className={styles.filterButton} onClick={() => setSortBy('alfabetico')}>Alfabético</button>
              <button className={styles.filterButton} onClick={() => setSortBy('data')}>Data</button>
              <button className={styles.filterButton} onClick={() => setSortBy('tipo')}>Tipo</button>
              <button className={styles.filterButton} onClick={() => setSortBy('nome')}>Nome</button>
            </div>
          </div>
        </div>

        {/* Resultado */}
        {filteredDocs.length > 0 && (
          <div className={styles.resul}>
            {filteredDocs.map((doc) => (
              <div key={doc.name} className={styles['cad-donw']}>
                <div className={styles.txt}>
                  <h1>{doc.name}</h1>
                  <h2>{doc.content}</h2>
                </div>
                <button onClick={() => handleDownload(doc.name, doc.content)}>
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
