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
        setPeople(data);
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
                  <th>CPF</th>
                  <th>Matrícula</th>
                  <th>Função</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <tr
                      key={result.cpf || index}
                      onClick={() => setSelectedPerson(result)}
                      className={styles.row}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedPerson(result)}
                      aria-label={`Selecionar ${result.name || 'colaborador'}`}
                    >
                      <td>{result.name || 'N/A'}</td>
                      <td>{result.cpf || 'N/A'}</td>
                      <td>{result.matricula || 'N/A'}</td>
                      <td>{result.role || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.noResults}>
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
                  <h2 id="modal-title">{selectedPerson.name || 'Nome não disponível'}</h2>
                  <p><strong>CPF:</strong> {selectedPerson.cpf || 'N/A'}</p>
                  <p><strong>Matrícula:</strong> {selectedPerson.matricula || 'N/A'}</p>
                  <p><strong>Idade:</strong> {selectedPerson.idade || 'N/A'} anos</p>
                  <p><strong>Função:</strong> {selectedPerson.role || 'N/A'}</p>
                  <p><strong>Tem família registrada?</strong> {selectedPerson.familiaRegistrada ? 'Sim' : 'Não'}</p>
                  <p><strong>É responsável?</strong> {selectedPerson.responsavel ? 'Sim' : 'Não'}</p>
                  <p><strong>É beneficiário responsável?</strong> {selectedPerson.beneficiarioResponsavel ? 'Sim' : 'Não'}</p>
                  <p><strong>Tem atendimentos registrados?</strong> {selectedPerson.atendimentosRegistrados ? 'Sim' : 'Não'}</p>
                  <p><strong>Oferece atendimentos?</strong> {selectedPerson.ofereceAtendimentos ? 'Sim' : 'Não'}</p>
                  {selectedPerson.role === 'Administrador' && (
                    <p><strong>Cargo:</strong> {selectedPerson.cargo || 'N/A'}</p>
                  )}
                </div>
                <img
                  src={selectedPerson.imageUrl || '/assets/img/placeholder.jpg'}
                  alt={`Imagem de ${selectedPerson.name || 'colaborador'}`}
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