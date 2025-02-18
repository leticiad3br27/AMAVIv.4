
"use client"; 

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SideMenu from '@/components/SideMenu'; 

export default function MainLayout({ children }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar o SideMenu
  const closeSideMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="main-layout">
      
      <Header setIsMenuOpen={setIsMenuOpen} />

    
      <SideMenu isMenuOpen={isMenuOpen} closeSideMenu={closeSideMenu} />

    
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}