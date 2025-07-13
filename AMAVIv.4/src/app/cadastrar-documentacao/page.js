'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CadastrarDocumentacao.module.css';

function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = { value, expiry: now.getTime() + ttl };
  localStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export default function CadastrarDocumentacao() {
  const router = useRouter();

  const [idUsuarioLogado, setIdUsuarioLogado] = useState(null);
  const [descricao, setDescricao] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const verificarLogin = async () => {
      const localLogin = getItemWithExpiry('amavi_logged_in');
      if (localLogin) {
        try {
          const res = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login', {
            method: 'GET',
            credentials: 'include', // importante enviar credenciais
          });
          if (res.ok) {
            const data = await res.json();
            setIdUsuarioLogado(data.id);
            setAutenticado(true);
            setItemWithExpiry('amavi_logged_in', true, 60 * 60 * 1000);
          } else {
            setAutenticado(false);
            router.push('/login');
          }
        } catch {
          setAutenticado(false);
          router.push('/login');
        }
        return;
      }
      router.push('/login');
    };
    verificarLogin();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!descricao || !arquivo) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    if (!idUsuarioLogado) {
      setMensagem('Usuário não identificado, faça login novamente.');
      return;
    }

    const formData = new FormData();
    formData.append('id_usuario', idUsuarioLogado);
    formData.append('descricao', descricao); // corrigido aqui
    formData.append('arquivo', arquivo);

    try {
      const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao', {
        method: 'POST',
        body: formData,
        credentials: 'include', // importante para manter sessão
      });

      if (response.ok) {
        setMensagem('✅ Documentação cadastrada com sucesso!');
        router.push('/documentacao');
      } else {
        const data = await response.json();
        setMensagem(`❌ Erro: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMensagem('❌ Erro ao enviar dados.');
    }
  };

  if (!autenticado) return <p className={styles.verificando}>Verificando login...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Cadastrar Documentação</h1>

      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <div className={styles.campo}>
          <label className={styles.label}>Descrição</label>
          <input
            type="text"
            className={styles.input}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className={styles.campo}>
          <label className={styles.label}>Arquivo</label>
          <input
            type="file"
            className={styles.input}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setArquivo(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className={styles.botao}>
          Enviar
        </button>
      </form>
    </div>
  );
}
