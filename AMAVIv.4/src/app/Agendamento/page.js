"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Layout from "../layouts/ConfigLayout";
import styles from "./CalendarPage.module.css";

// Função para adicionar evento
const addEvent = (date, setEvents, events) => {
  const title = prompt("Título do evento:");
  if (title) {
    setEvents([...events, { title, date: date.dateStr }]);
  }
};

// Função para editar evento
const editEvent = (clickInfo) => {
  const newTitle = prompt("Editar título do evento:", clickInfo.event.title);
  if (newTitle) {
    clickInfo.event.setProp("title", newTitle);
  }
};

// Função para excluir evento
const deleteEvent = (clickInfo, setEvents, events) => {
  const confirmDelete = window.confirm("Deseja excluir este evento?");
  if (confirmDelete) {
    const updatedEvents = events.filter(
      (event) => event.title !== clickInfo.event.title
    );
    setEvents(updatedEvents);
  }
};

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { title: "Reunião", date: "2025-02-15" },
    { title: "Consulta Médica", date: "2025-02-16" },
  ]);

  return (
    <Layout>
      <div className={styles.calendarContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}> {/* Seu código de sidebar aqui */} </div>

        {/* Calendar */}
        <div className={styles.calendarWrapper}>
          <h2 className={styles.title}>Calendário</h2>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={(arg) => addEvent(arg, setEvents, events)} // Adiciona evento
            editable={true} // Permite arrastar e soltar eventos
            eventClick={(clickInfo) => {
              // Oferece opções para editar ou excluir
              const action = prompt("Deseja editar ou excluir este evento? (editar/excluir)");
              if (action === "editar") {
                editEvent(clickInfo);
              } else if (action === "excluir") {
                deleteEvent(clickInfo, setEvents, events);
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
