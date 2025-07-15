"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './CadastrarR.module.css';
import useTheme from '../../hook/useTheme';

const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    let weight = 10;
    for (let i = 0; i < 9; i++) {
        sum += cpf[i] * weight--;
    }
    let firstVerifier = 11 - (sum % 11);
    firstVerifier = firstVerifier >= 10 ? 0 : firstVerifier;
    sum = 0;
    weight = 11;
    for (let i = 0; i < 10; i++) {
        sum += cpf[i] * weight--;
    }
    let secondVerifier = 11 - (sum % 11);
    secondVerifier = secondVerifier >= 10 ? 0 : secondVerifier;
    return cpf[9] == firstVerifier && cpf[10] == secondVerifier;
};

const formatCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
};

export default function Beneficiario() {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        nascimento: '',
        rg: '',
        profissao: '',
        rua: '',
        numero: '',
        cidade: '',
        estado: '',
        cep: '',
        sexo: '',
        cartaoSus: '',
        laudo_medico: null,
        foto_blob: null,
        informacoesMedicas: ''
    });

    const [profissoes, setProfissoes] = useState([]);
    const [progress, setProgress] = useState(0);
    const [cpfError, setCpfError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const router = useRouter();

    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [requisitos, setRequisitos] = useState({
        minLength: false,
        upperCase: false,
        number: false,
        specialChar: false,
    });
    const [senhasCoincidem, setSenhasCoincidem] = useState(true);
    const [mostrarSenhaForm, setMostrarSenhaForm] = useState(false);

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await fetch("/lista_cargos.json");
                const data = await response.json();
                setProfissoes(data.profissoes || []);
            } catch (error) {
                console.error('Erro ao buscar profissões:', error);
                alert('Erro ao buscar profissões. Tente novamente.');
            }
        };
        fetchProfessions();
    }, []);

    useEffect(() => {
        const filledFields = Object.values(formData).filter(value => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string' && value.trim() === '') return false;
            return true;
        }).length;
        const totalFields = Object.keys(formData).length;
        setProgress((filledFields / totalFields) * 100);
    }, [formData]);

    useEffect(() => {
        const buscarEnderecoPorCep = async () => {
            const cepLimpo = formData.cep.replace(/\D/g, '');
            if (cepLimpo.length === 8) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                    const data = await response.json();
                    if (!data.erro) {
                        setFormData(prev => ({
                            ...prev,
                            rua: data.logradouro || '',
                            cidade: data.localidade || '',
                            estado: data.uf || ''
                        }));
                    } else {
                        alert('CEP não encontrado.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar endereço pelo CEP:', error);
                    alert('Erro ao buscar endereço. Verifique o CEP e tente novamente.');
                }
            }
        };

        if (formData.cep) buscarEnderecoPorCep();
    }, [formData.cep]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "cpf") {
            const formattedCPF = formatCPF(value);
            setFormData({ ...formData, cpf: formattedCPF });
            if (formattedCPF && !validateCPF(formattedCPF.replace(/[^\d]+/g, ''))) {
                setCpfError("CPF inválido!");
            } else {
                setCpfError("");
            }
            return;
        }

        if (name === "cep") {
            const cepFormatado = value.replace(/\D/g, '').slice(0, 8);
            setFormData({ ...formData, cep: cepFormatado });
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const handleBeneficiarioSubmit = (e) => {
        e.preventDefault();

        const rawCPF = formData.cpf.replace(/[^\d]+/g, '');
        if (!validateCPF(rawCPF)) {
            setCpfError("CPF inválido! Por favor, insira um CPF válido.");
            return;
        }

        const age = calculateAge(formData.nascimento);
        if (age < 18) {
            router.push("/Cadastrar-R");
            return;
        }

        const requiredBeneficiarioFields = [
            'nome', 'cpf', 'telefone', 'email', 'nascimento',
            'rg', 'profissao', 'rua', 'numero', 'cidade',
            'estado', 'cep', 'sexo', 'cartaoSus'
        ];

        for (const field of requiredBeneficiarioFields) {
            if (!formData[field]) {
                alert(`Por favor, preencha todos os campos obrigatórios. Campo faltante: ${field}`);
                return;
            }
        }

        setMostrarSenhaForm(true);
    };

    const handleSenhaChange = (e) => {
        const valor = e.target.value;
        setSenha(valor);
        setRequisitos({
            minLength: valor.length >= 8,
            upperCase: /[A-Z]/.test(valor),
            number: /[0-9]/.test(valor),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(valor),
        });
    };

    const handleConfirmarSenhaChange = (e) => {
        const valor = e.target.value;
        setConfirmarSenha(valor);
        setSenhasCoincidem(valor === senha);
    };

    const isSenhaValid = Object.values(requisitos).every((req) => req) && senhasCoincidem;

    const handleFinalSubmit = async () => {
        const finalFormData = new FormData();
        for (const key in formData) {
            if (key === 'cartaoSus') {
                finalFormData.append('num_sus', formData[key]);
            } else if (key === 'nascimento') {
                finalFormData.append('data_nascimento', formData[key]);
            } else if (formData[key] instanceof File) {
                finalFormData.append(key, formData[key]);
            } else {
                finalFormData.append(key, formData[key]);
            }
        }
        finalFormData.append('senha', senha);

        try {
            const response = await fetch('https://amaviapi.dev.vilhena.ifro.edu.br/api/usuarios/Usuarios', {
                method: 'POST',
                body: finalFormData,
            });
            const data = await response.json();
            if (response.ok) {
                setUserId(data.id);
                setShowSuccessModal(true);
            } else {
                alert('Erro: ' + (data.error || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao cadastrar usuário.');
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        router.push("/login");
    };

    return (
        <div className={styles.container}>
            {!mostrarSenhaForm ? (
                <>
                    <h1 className={styles.title}>Informações Pessoais</h1>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
                    </div>
                    <form className={styles.formContainer} onSubmit={handleBeneficiarioSubmit}>
                        <h2 className={styles.sectionTitle1}>DADOS PESSOAIS DO BENEFICIARIO</h2>
                        <div className={styles.gridContainer}>
                            <label>Nome: <input type="text" name="nome" value={formData.nome} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>CPF: 
                                <input 
                                    type="text" 
                                    name="cpf" 
                                    value={formData.cpf} 
                                    onChange={handleChange} 
                                    className={styles.inputField} 
                                    required 
                                    placeholder="000.000.000-00"
                                />
                                {cpfError && <span className={styles.error}>{cpfError}</span>}
                            </label>
                            <label>Telefone: <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>E-MAIL: <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>Nascimento: <input type="date" name="nascimento" value={formData.nascimento} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>RG: <input type="text" name="rg" value={formData.rg} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>Profissão:
                                <input
                                    type="text"
                                    name="profissao"
                                    value={formData.profissao}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    list="profissoes-list"
                                    required
                                />
                                <datalist id="profissoes-list">
                                    {profissoes.map((profissao, index) => (
                                        <option key={index} value={profissao} />
                                    ))}
                                </datalist>
                            </label>
                            <label>Foto do Usuário:
                                <input 
                                    type="file" 
                                    name="foto_blob" 
                                    onChange={(e) => setFormData({ ...formData, foto_blob: e.target.files[0] })} 
                                    className={styles.inputField} 
                                    accept="image/*"
                                />
                            </label>
                        </div>
                        
                        <h2 className={styles.sectionTitle2}>ENDEREÇO</h2>
                        <div className={styles.gridContainer}>
                            <label>CEP: <input type="text" name="cep" value={formData.cep} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>Rua: <input type="text" name="rua" value={formData.rua} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>Número: <input type="text" name="numero" value={formData.numero} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>Cidade: <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className={styles.inputField} required /></label>
                            <label>Estado: <input type="text" name="estado" value={formData.estado} onChange={handleChange} className={styles.inputField} required /></label>
                        </div>
                        
                        <h2 className={styles.sectionTitle3}>INFORMAÇÕES MÉDICAS</h2>
                        <div className={styles.gridContainer}>
                            <label>Sexo:
                                <select 
                                    name="sexo" 
                                    value={formData.sexo || ''} 
                                    onChange={handleChange} 
                                    className={styles.inputField} 
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </label>
                            <label>Cartão do SUS:
                                <input 
                                    type="text" 
                                    name="cartaoSus" 
                                    value={formData.cartaoSus || ''} 
                                    onChange={handleChange} 
                                    className={styles.inputField} 
                                    required 
                                />
                            </label>
                            <label>Laudo Médico:
                                <input 
                                    type="file" 
                                    name="laudo_medico" 
                                    onChange={(e) => setFormData({ ...formData, laudo_medico: e.target.files[0] })} 
                                    className={styles.inputField} 
                                />
                            </label>
                            <label>Outras Informações Médicas:
                                <textarea 
                                    name="informacoesMedicas" 
                                    value={formData.informacoesMedicas || ''} 
                                    onChange={handleChange} 
                                    className={styles.inputField} 
                                    rows="4"
                                />
                            </label>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit" className={styles.buttonEnviar}>PRÓXIMO: CRIAR SENHA</button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <h1 className={styles.title}>Criação de Senha</h1>
                    <div className={styles.formContainer}>
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="Crie sua senha"
                            value={senha}
                            onChange={handleSenhaChange}
                        />
                        <input
                            type="password"
                            className={styles.inputField}
                            placeholder="Confirme sua senha"
                            value={confirmarSenha}
                            onChange={handleConfirmarSenhaChange}
                        />
                        <div className={styles.requisitos}>
                            <div className={`${styles.requisito} ${requisitos.minLength ? styles.valido : styles.invalid}`}>
                                Mínimo 8 caracteres
                            </div>
                            <div className={`${styles.requisito} ${requisitos.upperCase ? styles.valido : styles.invalid}`}>
                                Uma letra maiúscula
                            </div>
                            <div className={`${styles.requisito} ${requisitos.number ? styles.valido : styles.invalid}`}>
                                Um número
                            </div>
                            <div className={`${styles.requisito} ${requisitos.specialChar ? styles.valido : styles.invalid}`}>
                                Um caractere especial
                            </div>
                        </div>
                        {!senhasCoincidem && <div className={styles.error}>As senhas não coincidem!</div>}
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.buttonEnviar}
                                disabled={!isSenhaValid}
                                onClick={handleFinalSubmit}
                            >
                                FINALIZAR CADASTRO
                            </button>
                        </div>
                    </div>
                </>
            )}

            {showSuccessModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>Cadastro Concluído!</h2>
                            <p className={styles.modalMessage}>
                                Usuário cadastrado com sucesso! 
                            </p>
                            <button className={styles.modalButton} onClick={handleCloseModal}>
                                Ir para o Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}