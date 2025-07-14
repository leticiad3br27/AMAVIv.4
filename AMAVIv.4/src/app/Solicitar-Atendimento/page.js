'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SimpleLayout from "../layouts/SimpleLayout";
import styles from './page.module.css';

// Helpers para localStorage com expiração
function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export default function SolicitarAtendimento() {
  const [descricao, setDescricao] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [idDocumentacao, setIdDocumentacao] = useState('');
  const [documentos, setDocumentos] = useState([]); // New state for documents
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verificarUsuario() {
      const localUsuario = getItemWithExpiry("amavi_logged_in");
      if (localUsuario) {
        // Já está logado, pode prosseguir
        const res = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
          // Fetch documents for the user
          await fetchDocumentos(data.id);
        } else {
          localStorage.removeItem("amavi_logged_in");
          router.push("/login");
        }

        setLoading(false);
        return;
      }

      // Não logado, tenta verificar com o backend
      try {
        const res = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
          setItemWithExpiry("amavi_logged_in", true, 60 * 60 * 1000); // 1 hora
          // Fetch documents for the user
          await fetchDocumentos(data.id);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Erro ao verificar login:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    // Function to fetch documents
    async function fetchDocumentos(usuarioId) {
      try {
        const documentosRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/documentos/usuario/${usuarioId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (documentosRes.ok) {
          const documentosData = await documentosRes.json();
          setDocumentos(documentosData);
        } else {
          setDocumentos([]);
          setError('Erro ao carregar documentos do usuário.');
        }
      } catch (err) {
        console.error("Erro ao buscar documentos:", err);
        setDocumentos([]);
        setError('Erro ao conectar com o servidor para carregar documentos.');
      }
    }

    verificarUsuario();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!descricao || !classificacao || !idDocumentacao) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!usuario?.id) {
      setError('Usuário não identificado. Faça login novamente.');
      router.push('/login');
      return;
    }

    const payload = {
      descricao,
      classificacao,
      id_documentacao: Number(idDocumentacao),
      id_usuario: usuario.id,
    };

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/requerimentos/solicitacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 201) {
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