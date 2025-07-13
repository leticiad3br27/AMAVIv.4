'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SimpleLayout from "../layouts/SimpleLayout";
import styles from './page.module.css';

export default function SolicitarAtendimento() {
  const [descricao, setDescricao] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [idDocumentacao, setIdDocumentacao] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [erroLogin, setErroLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
          setErroLogin(false);
        } else {
          setErroLogin(true);
        }
      } catch (error) {
        console.error('Erro na verificação de login:', error);
        setErroLogin(true);
      }
    };

    fetchUsuario();
  }, []);

  useEffect(() => {
    if (erroLogin) {
      router.push('/login');
    }
  }, [erroLogin, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!descricao || !classificacao || !idDocumentacao) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const payload = {
      descricao,
      classificacao,
      id_documentacao: parseInt(idDocumentacao),
    };

    try {
      const res = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/requerimentos/solicitacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccess(data.message || 'Solicitação enviada com sucesso!');
        setDescricao('');
        setClassificacao('');
        setIdDocumentacao('');
      } else {
        setError(data.message || 'Erro ao enviar solicitação.');
        console.error('Erro na API:', data);
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
      console.error('Erro na solicitação:', err);
    }
  };

  const handleVerHistorico = () => {
    router.push('/Solicitar-Atendimento/historico-atendimentos');
  };

  return (
    <SimpleLayout>
      <h1 className={styles.title}>📝 Requerimento / Solicitar Atendimento</h1>

      {usuario && (
        <p className={styles.welcome}>Bem-vindo(a), {usuario.nome}!</p>
      )}

      <div className={styles.formContainer}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="descricao" className={styles.label}>Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            className={styles.textarea}
            placeholder="Descreva seu problema ou necessidade"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>

          <label htmlFor="classificacao" className={styles.smallLabel}>Classificação:</label>
          <select
            id="classificacao"
            name="classificacao"
            className={styles.select}
            value={classificacao}
            onChange={(e) => setClassificacao(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Urgente">Urgente</option>
            <option value="Normal">Normal</option>
            <option value="Baixa">Baixa</option>
          </select>

          <label htmlFor="idDocumentacao" className={styles.smallLabel}>Anexar Documento:</label>
          <select
            id="idDocumentacao"
            name="idDocumentacao"
            className={styles.select}
            value={idDocumentacao}
            onChange={(e) => setIdDocumentacao(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="1">Documento 1</option>
            <option value="2">Documento 2</option>
          </select>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>✅ ENVIAR</button>
            <button type="button" className={styles.secondaryButton} onClick={handleVerHistorico}>
              📜 VER HISTÓRICO
            </button>
          </div>
        </form>
      </div>
    </SimpleLayout>
  );
}
