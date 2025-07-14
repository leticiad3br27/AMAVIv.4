'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import SimpleLayout from '../../app/layouts/SimpleLayout';
import styles from './documentos.module.css';
import { Search, CloudDownload } from 'lucide-react';

// Função debounce simples
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nome');
  const [usuario, setUsuario] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState({});
  const router = useRouter();

  // Debounce para a busca
  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        setLoading(true);
        // Verificar autenticação
        const verificaRes = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/auth/verificar-login', {
          method: 'GET',
          credentials: 'include',
        });

        if (!verificaRes.ok) {
          throw new Error('Falha na autenticação. Por favor, faça login novamente.');
        }

        const verificaData = await verificaRes.json();
        const nomeUsuario = verificaData.nome;

        // Buscar dados do usuário
        const usuarioRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/usuarios/Usuarios?nome=${encodeURIComponent(nomeUsuario)}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!usuarioRes.ok) {
          const erroTexto = await usuarioRes.text();
          throw new Error(`Erro ao buscar usuário: ${usuarioRes.status} - ${erroTexto}`);
        }

        const usuarios = await usuarioRes.json();
        const usuarioEncontrado = usuarios[0];

        if (!usuarioEncontrado) {
          throw new Error('Usuário não encontrado.');
        }

        setUsuario(usuarioEncontrado);

        // Buscar documentos do usuário
        const documentosRes = await fetch(
          `https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/documentos/usuario/${usuarioEncontrado.id}`,
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
        }
      } catch (error) {
        setError(error.message);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentos();
  }, [router]);

  const handleDownload = async (docId, docName, arquivoUrl) => {
    // Adicione este log para depuração
    console.log('handleDownload:', { docId, docName, arquivoUrl });

    if (!docId || !docName || !arquivoUrl) {
      setError('ID, nome ou arquivo do documento inválido.');
      return;
    }

    // Verificar se o documento existe na lista
    const doc = documentos.find((d) => d.id === docId);
    if (!doc) {
      setError('Documento não encontrado na lista de documentos disponíveis.');
      return;
    }

    setDownloading((prev) => ({ ...prev, [docId]: true }));
    try {
      let fileBlob;
      let fileType = 'application/pdf'; // Padrão: PDF
      let fileExtension = '.pdf';

      // Verificar se arquivoUrl é uma string base64
      const base64Regex = /^data:(application\/pdf|image\/(png|jpeg));base64,/;
      let base64Data = arquivoUrl;

      if (base64Regex.test(arquivoUrl)) {
        // Caso seja um data URL completo (ex.: data:application/pdf;base64,...)
        const [, mimeType, base64String] = arquivoUrl.match(base64Regex);
        base64Data = arquivoUrl.split(',')[1];
        fileType = mimeType;
        fileExtension = mimeType.includes('pdf') ? '.pdf' : mimeType.includes('png') ? '.png' : '.jpg';
      } else if (/^[A-Za-z0-9+/=]+$/.test(arquivoUrl)) {
        // Caso seja apenas a string base64 sem prefixo
        fileType = 'application/pdf'; // Assumir PDF por padrão
        fileExtension = '.pdf';
      } else {
        throw new Error('Formato do arquivo inválido. Esperado: string base64.');
      }

      // Decodificar base64 para blob
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      fileBlob = new Blob([byteArray], { type: fileType });

      // Criar link para download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(fileBlob);
      const safeFileName = docName.endsWith(fileExtension) ? docName : `${docName}${fileExtension}`;
      link.download = safeFileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      setError(`Erro ao baixar o arquivo: ${error.message}`);
    } finally {
      setDownloading((prev) => ({ ...prev, [docId]: false }));
    }
  };

  // Adicione esta função para download via endpoint do backend (fetch + blob)
  const downloadFromApi = async (docId) => {
    setDownloading((prev) => ({ ...prev, [docId]: true }));
    try {
      // Ajuste a URL conforme seu endpoint real de download
      const response = await fetch(
        `https://amaviapi.dev.vilhena.ifro.edu.br/api/documentacao/download/${docId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      if (!response.ok) throw new Error('Erro ao baixar arquivo do servidor');
      // Extrai o nome do arquivo do header (se backend enviar)
      const disposition = response.headers.get('Content-Disposition');
      let filename = 'documento';
      if (disposition && disposition.includes('filename=')) {
        filename = decodeURIComponent(disposition.split('filename=')[1].replace(/"/g, ''));
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      setError('Erro ao baixar o arquivo.');
    } finally {
      setDownloading((prev) => ({ ...prev, [docId]: false }));
    }
  };

  const handleNavigateToCadastro = () => {
    router.push('/cadastrar-documentacao');
  };

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const filteredDocs = documentos
    .filter((doc) => doc.descricao?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'nome') {
        return a.descricao.localeCompare(b.descricao);
      }
      if (sortBy === 'data') {
        return new Date(b.criado_em) - new Date(a.criado_em);
      }
      if (sortBy === 'tipo') {
        // Ajustar quando o campo 'tipo' estiver disponível no backend
        return a.descricao.localeCompare(b.descricao);
      }
      return 0;
    });

  if (loading) {
    return (
      <SimpleLayout>
        <div className={styles.box}>
          <div className={styles.loading} aria-busy="true">
            Carregando documentos...
          </div>
        </div>
      </SimpleLayout>
    );
  }

  if (error) {
    return (
      <SimpleLayout>
        <div className={styles.box}>
          <div className={styles.error} role="alert">
            <p>{error}</p>
            <button onClick={() => setError(null)} className={styles.closeErrorButton}>
              Fechar
            </button>
          </div>
        </div>
      </SimpleLayout>
    );
  }

  return (
    <SimpleLayout>
      <div className={styles.box}>
        <div className={styles.busc}>
          <div className={styles.busca}>
            <h1>Busque pela sua documentação</h1>
            <div className={styles['search-container']}>
              <input
                type="text"
                className={styles['search-input']}
                placeholder="Buscar documentos..."
                aria-label="Buscar documentos por descrição"
                onChange={handleSearchChange}
              />
              <button type="button" className={styles['search-icon']} aria-label="Pesquisar">
                <Search size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleNavigateToCadastro}
              className={styles.butao}
              aria-label="Cadastrar nova documentação"
            >
              Cadastrar Documentação
            </button>
          </div>

          <div className={styles.sugestao}>
            <h2>Filtrar por</h2>
            <div className={styles['filter-buttons']}>
              <button
                className={`${styles.filterButton} ${sortBy === 'nome' ? styles.active : ''}`}
                onClick={() => setSortBy('nome')}
                aria-pressed={sortBy === 'nome'}
              >
                Nome
              </button>
              <button
                className={`${styles.filterButton} ${sortBy === 'data' ? styles.active : ''}`}
                onClick={() => setSortBy('data')}
                aria-pressed={sortBy === 'data'}
              >
                Data
              </button>
              <button
                className={`${styles.filterButton} ${sortBy === 'tipo' ? styles.active : ''}`}
                onClick={() => setSortBy('tipo')}
                aria-pressed={sortBy === 'tipo'}
              >
                Tipo
              </button>
            </div>
          </div>
        </div>

        {filteredDocs.length > 0 ? (
          <ul className={styles.resul} role="list">
            {filteredDocs.map((doc) => {
              // Detecta o campo base64 ou url de arquivo
              const arquivoBase64 = doc.arquivo_url || doc.arquivo || doc.file || doc.base64 || '';
              const temArquivo = !!(doc.arquivo_url || doc.arquivo || doc.file || doc.base64);

              // Tenta obter nome do arquivo ou gera um padrão
              const nomeArquivo =
                doc.nome_arquivo ||
                doc.descricao ||
                `documento_${doc.id || ''}`;

              // Função universal para baixar qualquer tipo de arquivo base64 ou data URL
              const baixarArquivo = () => {
                let fileName = nomeArquivo;
                let fileData = arquivoBase64;
                let fileType = '';
                let fileExtension = '';

                // Detecta se é data URL
                if (fileData.startsWith('data:')) {
                  // Exemplo: data:application/pdf;base64,....
                  const matches = fileData.match(/^data:(.+);base64,(.*)$/);
                  if (matches) {
                    fileType = matches[1];
                    fileData = matches[2];
                    // Tenta extrair extensão do tipo MIME
                    if (fileType.includes('pdf')) fileExtension = '.pdf';
                    else if (fileType.includes('png')) fileExtension = '.png';
                    else if (fileType.includes('jpeg') || fileType.includes('jpg')) fileExtension = '.jpg';
                    else if (fileType.includes('docx')) fileExtension = '.docx';
                    else if (fileType.includes('doc')) fileExtension = '.doc';
                    else if (fileType.includes('xls')) fileExtension = '.xls';
                    else if (fileType.includes('xlsx')) fileExtension = '.xlsx';
                    else if (fileType.includes('txt')) fileExtension = '.txt';
                    else if (fileType.includes('zip')) fileExtension = '.zip';
                    else fileExtension = '';
                  }
                } else {
                  // Assume base64 puro, tenta usar extensão do nome_arquivo ou padrão PDF
                  fileType = '';
                  if (nomeArquivo.endsWith('.pdf')) fileExtension = '.pdf';
                  else if (nomeArquivo.endsWith('.png')) fileExtension = '.png';
                  else if (nomeArquivo.endsWith('.jpg') || nomeArquivo.endsWith('.jpeg')) fileExtension = '.jpg';
                  else if (nomeArquivo.endsWith('.docx')) fileExtension = '.docx';
                  else if (nomeArquivo.endsWith('.doc')) fileExtension = '.doc';
                  else if (nomeArquivo.endsWith('.xls')) fileExtension = '.xls';
                  else if (nomeArquivo.endsWith('.xlsx')) fileExtension = '.xlsx';
                  else if (nomeArquivo.endsWith('.txt')) fileExtension = '.txt';
                  else if (nomeArquivo.endsWith('.zip')) fileExtension = '.zip';
                  else fileExtension = '.pdf';
                }

                // Garante extensão no nome do arquivo
                if (!fileName.endsWith(fileExtension)) fileName += fileExtension;

                // Decodifica base64 para blob
                try {
                  const byteCharacters = atob(fileData);
                  const byteNumbers = new Array(byteCharacters.length);
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                  }
                  const byteArray = new Uint8Array(byteNumbers);
                  const blob = new Blob([byteArray], { type: fileType || undefined });

                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = fileName;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(link.href);
                } catch (err) {
                  alert('Erro ao baixar o arquivo.');
                }
              };

              return (
                <li key={doc.id} className={styles['cad-donw']}>
                  <div className={styles.txt}>
                    <h3>{doc.descricao}</h3>
                    <p>Data: {new Date(doc.criado_em).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <button
                    onClick={() => downloadFromApi(doc.id)}
                    disabled={downloading[doc.id]}
                    className={styles.downloadButton}
                    aria-label={`Baixar documento ${doc.descricao}`}
                    aria-busy={downloading[doc.id]}
                  >
                    {downloading[doc.id] ? 'Baixando...' : <CloudDownload size={24} />}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.resul}>
            <div className={styles['cad-donw']}>
              <p className={styles.txt}>Nenhum documento encontrado.</p>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}
  