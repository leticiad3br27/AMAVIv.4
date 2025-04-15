
"use client";  
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './beneficiario.module.css';
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
    const { isDarkMode, toggleTheme } = useTheme();
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
        laudoMedico: null,
        informacoesMedicas: '',
        nomeResponsavel: '',
        cpfResponsavel: '',
    });
    const [profissoes, setProfissoes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [progress, setProgress] = useState(0);
    const [isUnderage, setIsUnderage] = useState(false);
    const [cpfError, setCpfError] = useState("");
    const [cpfResponsavelError, setCpfResponsavelError] = useState("");
    const router = useRouter();
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
        const filledFields = Object.values(formData).filter(value => value).length;
        const totalFields = Object.keys(formData).length;
        setProgress((filledFields / totalFields) * 100);
        
        if (formData.nascimento) {
            const age = calculateAge(formData.nascimento);
            setIsUnderage(age < 18);
        } else {
            setIsUnderage(false); // Se não houver data de nascimento, não é menor de idade.
        }
    }, [formData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "cpf") {
            const formattedCPF = formatCPF(value);
            setFormData({ ...formData, cpf: formattedCPF });
            if (formattedCPF && !validateCPF(formattedCPF.replace(/[^\d]+/g, ''))) {
                setCpfError("CPF inválido!");
            } else {
                setCpfError("");
            }
        }
        
        if (name === "cpfResponsavel") {
            const formattedCPFResponsavel = formatCPF(value);
            setFormData({ ...formData, cpfResponsavel: formattedCPFResponsavel });
            if (formattedCPFResponsavel && !validateCPF(formattedCPFResponsavel.replace(/[^\d]+/g, ''))) {
                setCpfResponsavelError("CPF do responsável inválido!");
            } else {
                setCpfResponsavelError("");
            }
        }
        
        if (name === "profissao") {
            setSearchTerm(value);
        }
    };
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const rawCPF = formData.cpf.replace(/[^\d]+/g, '');
        if (!validateCPF(rawCPF)) {
            setCpfError("CPF inválido! Por favor, insira um CPF válido.");
            return;
        }
        
        // Verifique se todos os campos necessários estão preenchidos
        const allFieldsFilled = Object.values(formData).every(value => value);
        if (isUnderage) {
            const rawCPFResponsavel = formData.cpfResponsavel.replace(/[^\d]+/g, '');
            if (!validateCPF(rawCPFResponsavel)) {
                setCpfResponsavelError("CPF do responsável inválido! Por favor, insira um CPF válido.");
                return;
            }
            // Se todos os campos estiverem preenchidos, redirecione para "definir senha"
            if (allFieldsFilled) {
                router.push("/definir-senha");
            }
        } else {
            // Se todos os campos estiverem preenchidos, redirecione para "definir senha"
            if (allFieldsFilled) {
                router.push("/definir-senha");
            }
        }
    };
    const filteredProfissoes = profissoes.filter(profissao =>
        profissao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Informações Pessoais</h1>
            <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
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
                        />
                        <datalist id="profissoes-list">
                            {filteredProfissoes.map((profissao, index) => (
                                <option key={index} value={profissao} />
                            ))}
                        </datalist>
                    </label>
                </div>
                {isUnderage && (
                    <div>
                        <h2 className={styles.sectionTitle4}>DADOS DO RESPONSÁVEL</h2>
                        <div className={styles.gridContainer}>
                            <label>Nome do Responsável: 
                                <input 
                                    type="text" 
                                    name="nomeResponsavel" 
                                    value={formData.nomeResponsavel} 
                                    onChange={handleChange} 
                                    className={styles.inputField} 
                                    required 
                                />
                            </label>
                            <label>CPF do Responsável: 
                                <input 
                                    type="text" 
                                    name="cpfResponsavel" 
                                    value={formData.cpfResponsavel} 
                                    onChange={handleChange} 
                                    className={styles.inputField} 
                                    required 
                                />
                                {cpfResponsavelError && <span className={styles.error}>{cpfResponsavelError}</span>}
                            </label>
                        </div>
                    </div>
                )}
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
                            name="laudoMedico" 
                            onChange={(e) => setFormData({ ...formData, laudoMedico: e.target.files[0] })} 
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
                    <button type="submit" className={styles.buttonEnviar}>ENVIAR</button>
                </div>
            </form>
        </div>
    );
}