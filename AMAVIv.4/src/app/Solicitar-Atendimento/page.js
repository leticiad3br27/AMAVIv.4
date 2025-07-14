'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../app/layouts/SimpleLayout';
import styles from './page.module.css';

export default function SolicitarRequerimento() {
  const [descricao, setDescricao] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [idDocumentacao, setIdDocumentacao] = useState('');
  const [documentos, setDocumentos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchDadosUsuarioEDocumentos = async () => {
      try {
        setLoading(true);

        // Verificar login
        const loginRes = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login', {
          method: 'GET',
          credentials: 'include',
        });

        if (!loginRes.ok) throw new Error('Não autenticado');

        const loginData = await loginRes.json();

        // Buscar dados do usuário
        const usuarioRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/usuarios/Usuarios?nome=${encodeURIComponent(loginData.nome)}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!usuarioRes.ok) throw new Error('Erro ao buscar dados do usuário');

        const usuarios = await usuarioRes.json();
        const usuarioAtual = usuarios[0];
        if (!usuarioAtual) throw new Error('Usuário não encontrado');

        setUsuario(usuarioAtual);

        // Buscar documentos do usuário
        const documentosRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/documentos/usuario/${usuarioAtual.id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        const documentosData = await documentosRes.ok ? await documentosRes.json() : [];
        setDocumentos(documentosData);
      } catch (err) {
        console.error(err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDadosUsuarioEDocumentos();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!usuario) {
      setError('Usuário não carregado. Refaça o login.');
      return;
    }

    const payload = {
      id_usuario: usuario.id,
      id_documentacao: idDocumentacao,
      descricao,
      classificacao,
    };

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/requerimentos/solicitacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 201 || response.ok) {
        setSuccess(data.message || 'Solicitação enviada com sucesso!');
        setDescricao('');
        setClassificacao('');
        setIdDocumentacao('');
      } else {
        setError(data.message || 'Erro ao enviar solicitação.');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
      console.error('Erro na solicitação:', err);
    }
  };

  const handleVerHistorico = () => {
    router.push('/Solicitar-Atendimento/historico-atendimentos');
  };

  if (loading) {
    return (
      <SimpleLayout>
        <p>Carregando dados do usuário...</p>
      </SimpleLayout>
    );
  }

  return (
    <SimpleLayout>
      <h1 className={styles.title}>📝 Requerimento / Solicitar Atendimento</h1>

      {usuario && <p className={styles.welcome}>Bem-vindo(a), {usuario.nome}!</p>}

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
          />

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
            {documentos.length > 0 ? (
              documentos.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.descricao}
                </option>
              ))
            ) : (
              <option value="" disabled>Nenhum documento disponível</option>
            )}
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
