"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import SimpleLayout from "../layouts/SimpleLayout";

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/agenda/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Erro ao buscar eventos:", err));
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
    if (event.target.id === "modal") {
      closeModal();
    }
  };

  return (
    <SimpleLayout>
      <div className={styles.body}>
        <div className={styles.eve}>
          <h1 className={styles.agaum}>Eventos</h1>
        </div>

        <div className={styles.divCards}>
          {eventos.map((evento) => (
            <div key={evento.id} className={styles.divCard} onClick={() => openModal(evento)}>
              <img className={styles.imgNh} src={evento.image} alt={evento.title} />
              <h3 className={styles.h3}>{evento.title}</h3>
              <p className={styles.para}>{evento.description}</p>
            </div>
          ))}
        </div>

        {modalOpen && modalData && (
          <div id="modal" className={styles.modal} onClick={handleOutsideClick}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
              <h2>{modalData.title}</h2>
              <img src={modalData.image} alt={modalData.title} />
              <p>
                <strong>Descrição:</strong> {modalData.description}
              </p>
              <p>
                <strong>Data:</strong> {modalData.date}
              </p>
              <p>
                <strong>Horário:</strong> {modalData.time}
              </p>
              <p>
                <strong>Local:</strong> {modalData.location}
              </p>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}

export default Eventos;
