import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configuração das fontes Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados do site
export const metadata = {
  title: "AMAVI",
  description: "Um site incrível criado por Letisia S.A, Marcos Casimiro, João Oliveira, Alini Perroni e Luana Vitória.",
};

// Layout raiz
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}