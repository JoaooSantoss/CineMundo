"use client";
import Link from 'next/link';
import './login.css';

import { useState, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login()
{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mensagemApi, setMensagemApi] = useState('');

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (evento) =>
    {
        evento.preventDefault();
        setMensagemApi('');

        const urlDaApi = 'http://localhost:3001/Clientes/VerificaLogin';

        try
        {
            const resposta = await fetch(urlDaApi,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email , senha: senha }),
            });

            const dadosDaApi = await resposta.json();

            console.log("O QUE CHEGOU DA API:", dadosDaApi)

            if (resposta.ok && dadosDaApi.sucesso)
            {
                login(dadosDaApi.usuario);
                router.push('/')
            }
            else
            {
                setMensagemApi(dadosDaApi.mensagem || "Email ou senha incorretos. Caso não exista o registro desse login, será necessário realizar o cadastro.");
            }
        }
        catch (erro)
        {
            console.error("Erro ao conectar com a API:", erro);
            setMensagemApi("Não foi possivel conectar ao servidor. Tente novamente.");
        }
    };
    
    
    
    
    return (
        <div className="background">
            <div className="login-card">
                <img src='/logo.png' alt="CineMundoLogo" className="login-logo"/>
                
                <h2 className="">Entrar na sua conta</h2>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="user-email">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="senha">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        <span onClick={() => setMostrarSenha(!mostrarSenha)}>
                            {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                        </span>
                    </div>

                    <button type="submit" className="login-button">Entrar</button>
                </form>
                
                {mensagemApi && (
                    <p className="mensagem-api">{mensagemApi}</p>
                )}

                <div className="login-links">
                    <Link href="/cadastro">Cadastre-se</Link>
                </div>
            </div>
        </div>
    );
}

