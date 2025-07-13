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
        const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores');
        if (!response.ok) {
          throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setPeople(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResults = searchTerm
    ? people.filter((person) => {
        const nome = person.nome?.toLowerCase() || '';
        const cpf = person.cpf || '';
        const matricula = person.matricula?.toLowerCase() || '';
        const term = searchTerm.toLowerCase();
        return nome.includes(term) || cpf.includes(term) || matricula.includes(term);
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
            aria-label="Campo de busca"
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
                  filteredResults.map((person, index) => (
                    <tr
                      key={person.id || index}
                      onClick={() => setSelectedPerson(person)}
                      className={styles.row}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedPerson(person)}
                    >
                      <td>{person.nome || 'N/A'}</td>
                      <td>{person.email || 'N/A'}</td>
                      <td>{person.telefone || 'N/A'}</td>
                      <td>{person.cargo || 'N/A'}</td>
                      <td>{person.isAdmin ? 'Sim' : 'Não'}</td>
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
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalInfo}>
                <div className={styles.textInfo}>
                  <h2>{selectedPerson.nome}</h2>
                  <p><strong>Email:</strong> {selectedPerson.email || 'N/A'}</p>
                  <p><strong>Telefone:</strong> {selectedPerson.telefone || 'N/A'}</p>
                  <p><strong>Cargo:</strong> {selectedPerson.cargo || 'N/A'}</p>
                  <p><strong>Administrador:</strong> {selectedPerson.isAdmin ? 'Sim' : 'Não'}</p>
                  <p><strong>Criado em:</strong> {selectedPerson.criado_em ? new Date(selectedPerson.criado_em).toLocaleString() : 'N/A'}</p>
                </div>
                <img
                  src={
                    selectedPerson.foto_base64
                      ? `data:image/jpeg;base64,${selectedPerson.foto_base64}`
                      : '/assets/img/placeholder.jpg'
                  }
                  alt={`Imagem de ${selectedPerson.nome}`}
                  className={styles.image}
                />
              </div>
              <button onClick={closeModal} className={styles.closeButton}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}

export default ConsultarCooperador;
