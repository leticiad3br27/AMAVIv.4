"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Layout from "../layouts/ConfigLayout";
import styles from "../styles/CalendarPage.module.css";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import useTheme from "../../hook/useTheme"; 

const CalendarPage = () => {
    const { isDarkMode, toggleTheme } = useTheme();
  
  const [events, setEvents] = useState([
    { id: 1, title: "Reunião", date: "2025-02-15" },
    { id: 2, title: "Consulta Médica", date: "2025-02-16" },
  ]);



  return (
    <Layout>
      <div className={styles.calendarContainer}>
        <div className={styles.sidebar}></div>
        <div className={styles.calendarWrapper}>
          <h2 className={styles.title}>Calendário</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale={ptLocale}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
