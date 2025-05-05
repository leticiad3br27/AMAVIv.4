"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideMenu from "../..//components/SideMenu";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.mainLayout}>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <SideMenu isMenuOpen={isMenuOpen} closeSideMenu={() => setIsMenuOpen(false)} />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}
