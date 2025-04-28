'use client';
import { useState } from "react";
import styles from './page.module.css';
import SimpleLayout from "../layouts/SimpleLayout";
import { useRouter } from "next/navigation";
export default function SolicitarAtendimento() {
  const [descricao, setDescricao] = useState('');
  const [dependente, setDependente] = useState('');
  const [anexarDocumento, setAnexarDocumento] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ descricao, dependente, anexarDocumento });
  };

  const handleVerHistorico = () => {
    router.push('Solicitar-Atendimento/historico-atendimentos'); // Ajuste para a rota correta
  };

  return (
    <SimpleLayout>
      <h1 className={styles.title}>REQUERIMENTO/SOLICITAR ATENDIMENTO</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="descricao" className={styles.label}>Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            className={styles.textarea}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>

          <label htmlFor="dependente" className={styles.smallLabel}>Dependente:</label>
          <select
            id="dependente"
            name="dependente"
            className={styles.select}
            value={dependente}
            onChange={(e) => setDependente(e.target.value)}
          >
            <option value="">Selecione</option>
          </select>

          <label htmlFor="anexarDocumento" className={styles.smallLabel}>Anexar documento:</label>
          <select
            id="anexarDocumento"
            name="anexarDocumento"
            className={styles.select}
            value={anexarDocumento}
            onChange={(e) => setAnexarDocumento(e.target.value)}
          >
            <option value="">Selecione</option>
          </select>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>ENVIAR</button>
            <button type="button" className={styles.secondaryButton} onClick={handleVerHistorico}>
              VER HISTÓRICO
            </button>
          </div>
        </form>
      </div>
    </SimpleLayout>
  );
}
