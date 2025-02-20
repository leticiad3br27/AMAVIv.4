"use client";
import React from "react";
import styles from "./ConfigLayout.module.css";
import ConfigBar from "../../components/ConfigBar/ConfigBar";
import useTheme from "../../hook/useTheme";

export default function ConfigLayout({ children }) {
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? "darkTheme" : "lightTheme";

  return (
    <div className={`${styles.ConfigLayout} ${themeClass}`}>
      <ConfigBar />
      <main>{children}</main>
    </div>
  );
}
