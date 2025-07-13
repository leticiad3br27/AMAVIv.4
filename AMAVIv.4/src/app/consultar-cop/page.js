'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import SimpleLayout from '../layouts/SimpleLayout';

function ConsultarCooperador() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores', {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Formato de dados inválido: esperado um array');
        }

        // Converte foto_url para base64 se for array de bytes
        const peopleWithImg = data.map(person => {
          if (person.foto_url && typeof person.foto_url !== 'string') {
            // Se vier como array de bytes
            try {
              const base64 = arrayBufferToBase64(person.foto_url.data || person.foto_url);
              return { ...person, foto_url: base64 };
            } catch {
              return { ...person, foto_url: null };
            }
          }
          return person;
        });

        setPeople(peopleWithImg);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lista todos os colaboradores se searchTerm estiver vazio
  const filteredResults = searchTerm
    ? people.filter((person) => {
        const name = person.name && typeof person.name === 'string' ? person.name.toLowerCase() : '';
        const cpf = person.cpf && typeof person.cpf === 'string' ? person.cpf : '';
        const matricula = person.matricula && typeof person.matricula === 'string' ? person.matricula.toLowerCase() : '';
        const term = searchTerm && typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '';
        return name.includes(term) || cpf.includes(term) || matricula.includes(term);
      })
    : people;

  const closeModal = () => setSelectedPerson(null);

  return (
    <SimpleLayout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Consultar</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Consultar por Nome, CPF ou Matrícula"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
            aria-label="Campo de busca por nome, CPF ou matrícula"
          />
        </div>
        <div className={styles.tableContainer}>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className={styles.error}>Erro: {error}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Cargo</th>
                  <th>Administrador?</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <tr
                      key={result.id || index}
                      onClick={() => setSelectedPerson(result)}
                      className={styles.row}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedPerson(result)}
                      aria-label={`Selecionar ${result.nome || 'colaborador'}`}
                    >
                      <td>{result.nome || 'N/A'}</td>
                      <td>{result.email || 'N/A'}</td>
                      <td>{result.telefone || 'N/A'}</td>
                      <td>{result.cargo || 'N/A'}</td>
                      <td>{result.isAdmin ? 'Sim' : 'Não'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noResults}>
                      Nenhum colaborador encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {selectedPerson && (
          <div className={styles.modal} onClick={closeModal} role="dialog" aria-labelledby="modal-title">
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalInfo}>
                <div className={styles.textInfo}>
                  <h2 id="modal-title">{selectedPerson.nome || 'Nome não disponível'}</h2>
                  <p><strong>Email:</strong> {selectedPerson.email || 'N/A'}</p>
                  <p><strong>Telefone:</strong> {selectedPerson.telefone || 'N/A'}</p>
                  <p><strong>Cargo:</strong> {selectedPerson.cargo || 'N/A'}</p>
                  <p><strong>Administrador?:</strong> {selectedPerson.isAdmin ? 'Sim' : 'Não'}</p>
                  <p><strong>Criado em:</strong> {selectedPerson.criado_em ? new Date(selectedPerson.criado_em).toLocaleString() : 'N/A'}</p>
                </div>
                <img
                  src={selectedPerson.foto_base64 ? `data:image/jpeg;base64,${selectedPerson.foto_base64}` : '/assets/img/placeholder.jpg'}
                  alt={`Imagem de ${selectedPerson.nome || 'colaborador'}`}
                  className={styles.image}
                />
              </div>
              <button onClick={closeModal} className={styles.closeButton} aria-label="Fechar modal">
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}

export default ConsultarCooperador;