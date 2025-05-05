"use client";

import { useState } from "react";
import Header from "../..//components/Header";
import SideMenu from "../../components/SideMenu";
import styles from "./SimpleLayout.module.css";

export default function SimpleLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.mainLayout}>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <SideMenu isMenuOpen={isMenuOpen} closeSideMenu={() => setIsMenuOpen(false)} />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
