"use client";
import React from 'react';
import styles from './historico-atendimentos.module.css';
import { useRouter } from "next/navigation"; // Importando useRouter
import SimpleLayout from 'import SimpleLayout from '../../layouts/SimpleLayout';';
const App = () => {
    const router = useRouter(); 
    const requerimentos = [
        { id: 1, descricao: "Requerimento de licença de funcionamento", data: "2023-01-15", status: "Deferido" },
        { id: 2, descricao: "Solicitação de documento pessoal", data: "2023-02-20", status: "Indeferido" },
        { id: 3, descricao: "Pedido de isenção de taxas", data: "2023-03-10", status: "Requerido" },
        { id: 4, descricao: "Requerimento de alteração cadastral", data: "2023-04-05", status: "Deferido" },
        { id: 5, descricao: "Solicitação de informações", data: "2023-05-12", status: "Requerido" }
    ];
    const handleNovaSolicitacao = () => {
        router.push('/Solicitar-Atendimento'); 
        alert("Redirecionando para nova solicitação..."); 
    };
    return (
        <SimpleLayout>
            <div className={`${styles.container} ${styles.lightTheme}`}> {/* Adicionando classe de tema claro */}
                <h1>Histórico de Requerimentos</h1>
                <table className={styles.tabelaRequerimentos}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requerimentos.map(requerimento => (
                            <tr key={requerimento.id}>
                                <td>{requerimento.id}</td>
                                <td>{requerimento.descricao}</td>
                                <td>{requerimento.data}</td>
                                <td>{requerimento.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className={styles.btnNovaSolicitacao} onClick={handleNovaSolicitacao}>
                    Nova Solicitação
                </button>
            </div>
        </SimpleLayout>
    );
};
export default App;