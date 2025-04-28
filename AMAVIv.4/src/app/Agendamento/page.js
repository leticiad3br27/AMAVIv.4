"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Layout from "../layouts/ConfigLayout";
import styles from "../styles/CalendarPage.module.css";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import useTheme from "../../hook/useTheme";

const CalendarPage = () => {
  const { isDarkMode } = useTheme();

  const eventColors = {
    reuniao: "#FF9800",    // Laranja
    consulta: "#4CAF50",   // Verde
    palestra: "#2196F3",   // Azul
    apoio: "#9C27B0"       // Roxo
  };

  const [events, setEvents] = useState([
    { id: 1, title: "Reunião Equipe Pedagógica", date: "2025-04-05", type: "reuniao" },
    { id: 2, title: "Consulta Médica", date: "2025-04-10", type: "consulta" },
    { id: 3, title: "Palestra de Conscientização", date: "2025-04-15", type: "palestra" },
    { id: 4, title: "Visita Domiciliar", date: "2025-04-18", type: "apoio" },
    { id: 5, title: "Reunião Estratégica", date: "2025-04-20", type: "reuniao" },
    { id: 6, title: "Consulta Psicológica", date: "2025-04-22", type: "consulta" },
    { id: 7, title: "Palestra Motivacional", date: "2025-04-25", type: "palestra" },
    { id: 8, title: "Atendimento de Apoio Familiar", date: "2025-04-28", type: "apoio" }
  ]);

  const formattedEvents = events.map(event => ({
    ...event,
    backgroundColor: eventColors[event.type],
    borderColor: eventColors[event.type],
  }));

  return (
    <Layout>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <h2 className={styles.title}>Calendário</h2>
          <div className={styles.legend}>
            <ul className={styles.legendList}>
              <li><span style={{ backgroundColor: eventColors.reuniao }} className={styles.legendColor}></span> Reuniões</li>
              <li><span style={{ backgroundColor: eventColors.consulta }} className={styles.legendColor}></span> Consultas</li>
              <li><span style={{ backgroundColor: eventColors.palestra }} className={styles.legendColor}></span> Palestras</li>
              <li><span style={{ backgroundColor: eventColors.apoio }} className={styles.legendColor}></span> Apoios</li>
            </ul>
          </div>
        </div>

        <div className={styles.calendarWrapper}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={formattedEvents}
            locale={ptLocale}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
