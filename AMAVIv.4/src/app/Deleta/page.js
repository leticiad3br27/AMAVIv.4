'use client';
import React, { useEffect, useState } from 'react';
import { Trash2, Loader2, X } from 'lucide-react';
import styles from './deletarEvento.module.css';
import SimpleLayout from '../layouts/SimpleLayout';

const API_URL = 'https://amaviapi.dev.vilhena.ifro.edu.br/api/agenda';

export default function DeletarEvento() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [notificacao, setNotificacao] = useState({ mensagem: '', tipo: 'info' });
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  const mostrarNotificacao = (mensagem, tipo = 'info') => {
    setNotificacao({ mensagem, tipo });
    setTimeout(() => setNotificacao({ mensagem: '', tipo: 'info' }), 4000);
  };

  const carregarEventos = async () => {
    try {
      setCarregando(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setEventos(data);
    } catch (err) {
      setErro('Erro ao carregar eventos.');
    } finally {
      setCarregando(false);
    }
  };

  const abrirConfirmacao = (evento) => {
    setEventoSelecionado(evento);
    setConfirmacaoAberta(true);
  };

  const fecharConfirmacao = () => {
    setEventoSelecionado(null);
    setConfirmacaoAberta(false);
  };

  const confirmarDeletar = async () => {
    if (!eventoSelecionado) return;
    try {
      const response = await fetch(`${API_URL}/${eventoSelecionado.id}`, { method: 'DELETE' });
      if (response.ok) {
        mostrarNotificacao('Evento deletado com sucesso!', 'sucesso');
        setEventos(eventos.filter((ev) => ev.id !== eventoSelecionado.id));
      } else {
        const data = await response.json();
        mostrarNotificacao(`Erro ao deletar: ${data?.erro || 'Erro desconhecido'}`, 'erro');
      }
    } catch {
      mostrarNotificacao('Erro de conexão com o servidor.', 'erro');
    } finally {
      fecharConfirmacao();
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  return (
    <SimpleLayout>
      <div className={styles.container}>
        <h1 className={styles.titulo}>🗑️ Deletar Evento da Agenda</h1>

        {carregando && (
          <div className={styles.carregando}>
            <Loader2 className={styles.loader} /> Carregando eventos...
          </div>
        )}

        {erro && <p className={styles.erro}>{erro}</p>}

        {!carregando && eventos.length === 0 && (
          <p className={styles.nenhumEvento}>Nenhum evento encontrado.</p>
        )}

        <ul className={styles.lista}>
          {eventos.map((evento) => (
            <li key={evento.id} className={styles.item}>
              <div className={styles.info}>
                <h2 className={styles.itemTitulo}>{evento.titulo}</h2>
                <p className={styles.itemDescricao}>{evento.descricao}</p>
                <p className={styles.meta}>
                  <strong>Data:</strong> {new Date(evento.data_evento).toLocaleDateString()} <br />
                  <strong>Horário:</strong> {evento.horario_evento} <br />
                  <strong>Público:</strong> {evento.publico}
                </p>
              </div>

              {evento.foto_url && (
                <img src={evento.foto_url} alt="Imagem do evento" className={styles.imagem} />
              )}

              <button
                onClick={() => abrirConfirmacao(evento)}
                className={styles.botaoDeletar}
                title="Deletar evento"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>

        {/* Notificação */}
        {notificacao.mensagem && (
          <div className={`${styles.toast} ${styles[notificacao.tipo]}`}>
            <span>{notificacao.mensagem}</span>
            <button
              className={styles.closeBtn}
              onClick={() => setNotificacao({ mensagem: '', tipo: 'info' })}
              aria-label="Fechar notificação"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Modal de confirmação */}
        {confirmacaoAberta && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Confirmação</h2>
              <p>Tem certeza que deseja deletar o evento:</p>
              <strong>{eventoSelecionado?.titulo}</strong>
              <div className={styles.modalBotoes}>
                <button onClick={confirmarDeletar} className={styles.confirmarBtn}>
                  Confirmar
                </button>
                <button onClick={fecharConfirmacao} className={styles.cancelarBtn}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}
