"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import SimpleLayout from "../layouts/SimpleLayout";

const eventos = [
  {
    id: 1,
    title: "Palestra: Direitos das Pessoas Autistas",
    description: "Uma palestra educativa sobre os direitos das pessoas autistas, abordando legislação, benefícios e inclusão.",
    date: "10/03/2025",
    time: "18:00",
    location: "Auditório da AMAVI",
    image: "/assets/img/DESCUBRA OS DIREITOS DOS AUTISTAS.jpg",
  },
  {
    id: 2,
    title: "Oficina de Comunicação Alternativa",
    description: "Atividade prática para ensinar métodos de comunicação alternativa e aumentativa para autistas não verbais.",
    date: "15/03/2025",
    time: "14:00",
    location: "Centro Comunitário AMAVI",
    image: "/assets/img/Palestra para as crianças.jpg",
  },
  {
    id: 3,
    title: "Encontro de Famílias e Profissionais",
    description: "Momento de troca entre famílias de autistas e profissionais da saúde e educação para compartilhar experiências e boas práticas.",
    date: "20/03/2025",
    time: "16:00",
    location: "Sede da AMAVI",
    image: "/assets/img/91180853-772f-4696-8cab-52a1369b11f0.jpg",
  },
  {
    id: 4,
    title: "Dia de Lazer para Crianças Autistas",
    description: "Um dia especial com atividades lúdicas e adaptadas para crianças autistas e seus familiares.",
    date: "25/03/2025",
    time: "10:00",
    location: "Parque Inclusivo AMAVI",
    image: "/assets/img/FESTA PIQUENIQUE Infantil_ 40 Dicas para Fazer.jpg",
  },
  {
    id: 5,
    title: "Grupo de Apoio para Pais e Cuidadores",
    description: "Encontro mensal para compartilhar desafios e estratégias no cuidado e educação de crianças e adultos autistas.",
    date: "30/03/2025",
    time: "19:00",
    location: "Sala de Reuniões AMAVI",
    image: "/assets/img/Símbolo de amizade interracial e solidariedade de pessoas e apoio na diversidade _ Vetor Premium.jpg",
  },
];

function Eventos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (evento) => {
    setModalData(evento);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  // Fecha o modal ao clicar fora do conteúdo
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
