'use client';

import React, { useState, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import styles from './page.module.css';
import SimpleLayout from '../layouts/SimpleLayout';

export default function Agenda() {
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      if (isMounted) {
        setError('Tempo de resposta excedido');
        setLoading(false);
      }
    }, 10000);

    async function fetchEventos() {
      try {
        const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/agenda', {
          signal: controller.signal,
        });
        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setEventos(data);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setError('Erro ao carregar eventos');
            setLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Erro de conexão: ' + err.message);
          setLoading(false);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }

    fetchEventos();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  const openModal = (evento) => {
    setModalData(evento);
    setModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    document.body.classList.remove('modal-open');
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === 'modal') {
      closeModal();
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Data inválida';
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return 'Data inválida';
    }
  };

  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    return (
      url.startsWith('data:image') ||
      url.match(/\.(jpeg|jpg|png|gif|webp)$/i) ||
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('file://')
    );
  };

  if (loading) return <p className={styles.loading}>Carregando...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <SimpleLayout>
      <Container className={styles.body}>
        <div className={styles.eve}>
          <h1 className={styles.agaum}>Eventos</h1>
        </div>

        <div className={styles.divCards}>
          {eventos.map((evento) => (
            <div key={evento.id} className={styles.divCard} onClick={() => openModal(evento)}>
              {isValidImageUrl(evento.foto_url) && (
                <img
                  className={styles.imgNh}
                  src={evento.foto_url}
                  alt={evento.titulo || 'Evento'}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.warn(`Erro ao carregar imagem do evento ${evento.id}`);
                  }}
                />
              )}
              <h3 className={styles.h3}>{evento.titulo || 'Sem título'}</h3>
              <p className={styles.para}>{evento.descricao || 'Sem descrição'}</p>
            </div>
          ))}
        </div>

        {modalOpen && modalData && (
          <div id="modal" className={styles.modal} onClick={handleOutsideClick}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={closeModal}>×</span>
              <h2>{modalData.titulo || 'Sem título'}</h2>

              {isValidImageUrl(modalData.foto_url) && (
                <img
                  src={modalData.foto_url}
                  alt={modalData.titulo || 'Evento'}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.warn(`Imagem do modal não carregada para o evento ${modalData.id}`);
                  }}
                />
              )}

              <p><strong>Descrição:</strong> {modalData.descricao || 'Sem descrição'}</p>
              <p><strong>Data:</strong> {formatDate(modalData.data_evento)}</p>
              <p><strong>Horário:</strong> {modalData.horario_evento || 'Sem horário'}</p>
              <p><strong>Público:</strong> {modalData.publico || 'Sem público definido'}</p>
              <p><strong>Tipo:</strong> {modalData.tipo_evento || 'Sem tipo'}</p>
            </div>
          </div>
        )}
      </Container>
    </SimpleLayout>
  );
}
