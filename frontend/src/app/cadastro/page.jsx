"use client";
import Link from 'next/link';
import './cadastro.css'; // Importando o CSS separado

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nome_completo: '',
        cpf: '',
        data_aniversario: '',
        endereco_completo: '',
        celular: '',
        email: '',
        senha: '',
        paga_meia_entrada: false
    });

    const [mensagem, setMensagem] = useState('');

    // --- MÁSCARAS ---
    const mascaraCPF = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .substring(0, 14);
    };

    const mascaraCelular = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 15);
    };

    // Remove qualquer número digitado
    const mascaraNome = (valor) => {
        return valor.replace(/[^a-zA-Z\u00C0-\u00FF\s]/g, '');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let valorFinal = type === 'checkbox' ? checked : value;

        if (name === 'cpf') valorFinal = mascaraCPF(value);
        if (name === 'celular') valorFinal = mascaraCelular(value);
        if (name === 'nome_completo') valorFinal = mascaraNome(value);

        // Proteção extra para data (impede ano com mais de 4 dígitos)
        if (name === 'data_aniversario') {
             // Se o ano tiver mais de 4 dígitos (ex: 20255), bloqueia ou corta
             // O formato padrão é YYYY-MM-DD. Se passar de 10 chars, algo está errado.
             if (value.length > 10) return; 
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: valorFinal
        }));
    };

    // --- VALIDAÇÃO ---
    const validaFormulario = () => {
        if (formData.senha.length < 6) {
            setMensagem("A senha precisa ter pelo menos 6 caracteres.");
            return false;
        }
        if (formData.cpf.length < 14) {
            setMensagem("CPF incompleto. Digite corretamente.");
            return false;
        }

        // Validação extra de Data: Ninguém nasce no futuro
        const dataNascimento = new Date(formData.data_aniversario);
        const hoje = new Date();
        if (dataNascimento > hoje) {
             setMensagem("Data de nascimento inválida (você não nasceu no futuro!)");
             return false;
        }
        // Validação extra de Data: Ano muito antigo (opcional)
        if (dataNascimento.getFullYear() < 1900) {
             setMensagem("Data de nascimento inválida (ano muito antigo).");
             return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');

        if (!validaFormulario()) return;

        // URL da rota de cadastro (Ajuste a porta se necessário)
        const urlDaApi = 'http://localhost:3001/Clientes'; 

        try {
            const resposta = await fetch(urlDaApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso!");
                router.push('/login');
            } else {
                setMensagem(dados.erro || "Erro ao cadastrar.");
            }
        } catch (erro) {
            console.error("Erro:", erro);
            setMensagem("Erro de conexão com a API.");
        }
    };

    // Pega a data de hoje no formato YYYY-MM-DD para usar no atributo 'max'
    const dataMaxima = new Date().toISOString().split("T")[0];

    return (
        <div className="cadastro-background">
            <div className="cadastro-card">
                <h2>Crie sua conta</h2>

                <form onSubmit={handleSubmit}>
                    
                    <div className="input-group">
                        <label>Nome Completo</label>
                        <input 
                            type="text"
                            name="nome_completo"
                            value={formData.nome_completo}
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="row">
                        <div className="input-group col">
                            <label>CPF</label>
                            <input 
                                type="text" 
                                name="cpf" 
                                placeholder="000.000.000-00" 
                                value={formData.cpf} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="input-group col">
                            <label>Celular</label>
                            <input 
                                type="text" 
                                name="celular" 
                                placeholder="(00) 00000-0000"
                                value={formData.celular} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Data de Nascimento</label>
                        <input
                            type="date"
                            name="data_aniversario"
                            value={formData.data_aniversario}
                            onChange={handleChange}
                            max={dataMaxima}
                            required
                        />
                        
                    </div>

                    <div className="input-group">
                        <label>Endereço Completo</label>
                        <input
                            type="text"
                            name="endereco_completo"
                            value={formData.endereco_completo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                        <small className="input-help">Mínimo de 6 caracteres</small>
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            name="paga_meia_entrada"
                            checked={formData.paga_meia_entrada}
                            onChange={handleChange}
                            id="meia"
                        />
                        <label htmlFor="meia">Sou estudante (Meia Entrada)</label>
                    </div>

                    <button type="submit" className="btn-cadastrar">Cadastrar</button>
                </form>

                {mensagem && <p className="mensagem-erro">{mensagem}</p>}

                <div className="cadastro-footer">
                    <span>Já tem conta? </span>
                    <Link href="/login" className="link-login">Faça Login</Link>
                </div>
            </div>
        </div>
    );
}