'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Alert, Container } from 'react-bootstrap';
import { Calendar } from 'lucide-react';
import styles from './page.module.css';
import SimpleLayout from '../layouts/SimpleLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://amaviapi.dev.ifro.edu.br/';

export default function Eventos() {
  const router = useRouter();
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await fetch(`${API_URL}/eventos`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setEventos(data);
        } else if (response.status === 401) {
          setError('Usuário não autenticado. Faça login.');
        } else {
          setError('Erro ao carregar eventos');
        }
      } catch (err) {
        setError('Erro de conexão com o servidor');
      } finally {
        setLoading(false);
      }
    }
    fetchEventos();
  }, []);

  const openModal = (evento) => {
    setModalData(evento);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === 'modal') {
      closeModal();
    }
  };

  if (loading) {
    return (
      <SimpleLayout>
        <Container className={styles.body}>
          <p className={styles.loading}>Carregando...</p>
        </Container>
      </SimpleLayout>
    );
  }

  if (error) {
    return (
      <SimpleLayout>
        <Container className={styles.body}>
          <Alert variant="danger">{error}</Alert>
        </Container>
      </SimpleLayout>
    );
  }

  return (
    <SimpleLayout>
      <Container className={styles.body}>
        <div className={styles.eve}>
          <h1 className={styles.agaum}>Eventos</h1>
          <Link href="/eventos/cadastrar" className={styles.voltarBtn}>
            <Calendar size={16} className="me-2" />
            Adicionar Evento
          </Link>
        </div>

        <div className={styles.divCards}>
          {eventos.map((evento) => (
            <div key={evento.id} className={styles.divCard} onClick={() => openModal(evento)}>
              {evento.foto_url ? (
                <img className={styles.imgNh} src={evento.foto_url} alt={evento.titulo} />
              ) : (
                <div className={styles.imgPlaceholder}>Sem imagem</div>
              )}
              <h3 className={styles.h3}>{evento.titulo}</h3>
              <p className={styles.para}>{evento.descricao}</p>
            </div>
          ))}
        </div>

        {modalOpen && modalData && (
          <div id="modal" className={styles.modal} onClick={handleOutsideClick}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={closeModal}>
                ×
              </span>
              <h2>{modalData.titulo}</h2>
              {modalData.foto_url && <img src={modalData.foto_url} alt={modalData.titulo} />}
              <p>
                <strong>Descrição:</strong> {modalData.descricao}
              </p>
              <p>
                <strong>Data:</strong>{' '}
                {modalData.data_evento ? new Date(modalData.data_evento).toLocaleDateString('pt-BR') : 'Sem data'}
              </p>
              <p>
                <strong>Horário:</strong> {modalData.horario_evento || 'Sem horário'}
              </p>
              <p>
                <strong>Público:</strong> {modalData.publico || 'Não informado'}
              </p>
            </div>
          </div>
        )}
      </Container>
    </SimpleLayout>
  );
}
