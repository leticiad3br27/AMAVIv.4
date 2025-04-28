'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importando o roteador do Next.js
import SimpleLayout from '@/app/layouts/SimpleLayout';
import styles from './documentos.module.css';
import { Search, SquareCheckBig, CloudDownload } from 'lucide-react';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); // Inicializando o roteador

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
    { name: "RG", content: "Documento de identidade oficial do usuário." },
    { name: "CPF", content: "Cadastro de Pessoa Física do usuário." },
    { name: "CEP", content: "Código de Endereçamento Postal do endereço cadastrado." },
    { name: "FICHAS", content: "Fichas de cadastro e atendimento registradas no sistema." },
    { name: "LAUDOS", content: "Laudos médicos e psicológicos arquivados no banco de dados." },
  ];

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className={styles.sugestao}>
            <h1>SUGESTÕES</h1>
            <table className={styles.table}>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.name}>
                    <td className={styles.type}>{doc.name} :</td>
                    <td>
                      <button className={styles.SquareCheckBig} type="submit">
                        <SquareCheckBig size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
