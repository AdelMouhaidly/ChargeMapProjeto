import React, { useState } from "react";
import styles from "../styles/cadastro.module.css";

function PaginaCadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [erroSenha, setErroSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const alternarVisibilidadeSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const alternarVisibilidadeConfirmarSenha = () => {
    setMostrarConfirmarSenha(!mostrarConfirmarSenha);
  };

  const realizarCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    const nome = (document.getElementById("nome") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const senha = (document.getElementById("senha") as HTMLInputElement).value;
    const confirmarSenha = (document.getElementById("confirmarSenha") as HTMLInputElement).value;

    if (senha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }

    setErroSenha("");
    setMensagem("Cadastro realizado com sucesso!");

    localStorage.setItem("user", JSON.stringify({ nome, email, senha }));

    setTimeout(() => {
      window.location.href = "/"; 
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.caixaCadastro}>
        <div className={styles.esquerda}>
          <h1 className={styles.titulo}>Crie Sua Conta</h1>
          <p className={styles.subtitulo}>
            Preencha as informações abaixo para criar sua conta ou{" "}
            <a href="/" className={styles.link}>
              clique aqui para fazer login
            </a>
          </p>
          <form onSubmit={realizarCadastro}>
            <div className={styles.grupoEntrada}>
              <input
                id="nome"
                type="text"
                placeholder="Nome Completo"
                className={styles.entrada}
                required
              />
            </div>
            <div className={styles.grupoEntrada}>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                className={styles.entrada}
                required
              />
            </div>
            <div className={styles.grupoEntradaSenha}>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                className={styles.entrada}
                required
              />
              <button
                type="button"
                className={styles.botaoOlhinho}
                onClick={alternarVisibilidadeSenha}
              >
                {mostrarSenha ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={styles.iconeOlho}
                  >
                    <path d="M12 5c-5.5 0-10 6-10 6s4.5 6 10 6 10-6 10-6-4.5-6-10-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={styles.iconeOlho}
                  >
                    <path d="M12 5c-5.5 0-10 6-10 6s4.5 6 10 6 10-6 10-6-4.5-6-10-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.9-10.6l-2.4 2.4c.7 1.1 1.1 2.5 1.1 4 0 1.6-.6 3-1.6 4.1l2.4 2.4c2.1-1.8 3.6-4.5 3.6-6.5s-1.5-4.7-3.6-6.5zm-14 0c-2.1 1.8-3.6 4.5-3.6 6.5s1.5-4.7 3.6-6.5l2.4-2.4c-1-1.1-1.6-2.5-1.6-4 0-1.5.4-2.9 1.1-4l-2.4-2.4z" />
                  </svg>
                )}
              </button>
            </div>
            <div className={styles.grupoEntradaSenha}>
              <input
                id="confirmarSenha"
                type={mostrarConfirmarSenha ? "text" : "password"}
                placeholder="Confirme a Senha"
                className={styles.entrada}
                required
              />
              <button
                type="button"
                className={styles.botaoOlhinho}
                onClick={alternarVisibilidadeConfirmarSenha}
              >
                {mostrarConfirmarSenha ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={styles.iconeOlho}
                  >
                    <path d="M12 5c-5.5 0-10 6-10 6s4.5 6 10 6 10-6 10-6-4.5-6-10-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.9-10.6l-2.4 2.4c.7 1.1 1.1 2.5 1.1 4 0 1.6-.6 3-1.6 4.1l2.4 2.4c2.1-1.8 3.6-4.5 3.6-6.5s-1.5-4.7-3.6-6.5zm-14 0c-2.1 1.8-3.6 4.5-3.6 6.5s1.5-4.7 3.6-6.5l2.4-2.4c-1-1.1-1.6-2.5-1.6-4 0-1.5.4-2.9 1.1-4l-2.4-2.4z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={styles.iconeOlho}
                  >
                    <path d="M12 5c-5.5 0-10 6-10 6s4.5 6 10 6 10-6 10-6-4.5-6-10-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.9-10.6l-2.4 2.4c.7 1.1 1.1 2.5 1.1 4 0 1.6-.6 3-1.6 4.1l2.4 2.4c2.1-1.8 3.6-4.5 3.6-6.5s-1.5-4.7-3.6-6.5zm-14 0c-2.1 1.8-3.6 4.5-3.6 6.5s1.5-4.7 3.6-6.5l2.4-2.4c-1-1.1-1.6-2.5-1.6-4 0-1.5.4-2.9 1.1-4l-2.4-2.4z" />
                  </svg>
                )}
              </button>
              {erroSenha && <p className={styles.erroMensagem}>{erroSenha}</p>}
            </div>
            <button type="submit" className={styles.botaoCadastrar}>
              Cadastrar
            </button>
          </form>
          {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
        </div>
        <div className={styles.direita}>
          <h2 className={styles.tituloChargeMap}>ChargeMap</h2>
        </div>
      </div>
    </div>
  );
};

export default PaginaCadastro;
