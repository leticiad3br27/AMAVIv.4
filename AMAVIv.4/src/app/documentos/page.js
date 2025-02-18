'use client';
import React from 'react';
import SimpleLayout from '@/app/layouts/SimpleLayout';
import styles from './documentos.module.css';
import { Search, SquareCheckBig, CloudDownload } from 'lucide-react';

export default function Documents() {
  return (
    <SimpleLayout>
      <div className={styles.box}>
        <div className={styles.busc}>
          <div className={styles.busca}>
            <h1>BUSQUE PELA SUA DOCUMENTAÇÃO</h1>
            <div className={styles['search-container']}>
              <input
                type="text"
                className={styles['search-input']}
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <button type="submit" className={styles['search-icon']}>
                <Search size={12} />
              </button>
            </div>
            <a className={styles.butao}>
              <button type="submit">Cadastrar Documentação</button>
            </a>
          </div>
          <div className={styles.sugestao}>
            <h1>SUGESTÕES</h1>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.type}>RG :</td>
                  <td>
                    <button className={styles.SquareCheckBig} type="submit">
                      <SquareCheckBig size={12} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.type}>CEP :</td>
                  <td>
                    <button className={styles.SquareCheckBig} type="submit">
                      <SquareCheckBig size={12} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.type}>FICHAS :</td>
                  <td>
                    <button className={styles.SquareCheckBig} type="submit">
                      <SquareCheckBig size={12} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className={styles.type}>LAUDOS :</td>
                  <td>
                    <button className={styles.SquareCheckBig} type="submit">
                      <SquareCheckBig size={12} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.resul}>
          <div className={styles['cad-donw']}>
            <div className={styles.txt}>
              <h1>Nome do Documento</h1>
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </h2>
            </div>
            <button>
              <CloudDownload size={40} />
            </button>
          </div>
          <div className={styles['cad-donw']}>
            <div className={styles.txt}>
              <h1>Nome do Documento</h1>
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </h2>
            </div>
            <button>
              <CloudDownload size={40} />
            </button>
          </div>
          <div className={styles['cad-donw']}>
            <div className={styles.txt}>
              <h1>Nome do Documento</h1>
              <h2>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </h2>
            </div>
            <button>
              <CloudDownload size={40} />
            </button>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}
