import React, { useState } from "react";
import styles from "../styles/login.module.css";

function PaginaLogin() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const alternarVisibilidadeSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const realizarLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const senha = (document.getElementById("senha") as HTMLInputElement).value;

    const usuario = localStorage.getItem("user");
    if (!usuario) {
      setMensagem("Nenhum usuário cadastrado. Por favor, registre-se.");
      return;
    }

    const { email: emailCadastrado, senha: senhaCadastrada } = JSON.parse(usuario);

    if (email === emailCadastrado && senha === senhaCadastrada) {
      setMensagem("Login bem-sucedido!");
      setTimeout(() => {
        window.location.href = "/inicio";
      }, 1500);
    } else {
      setMensagem("E-mail ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.caixaLogin}>
        <div className={styles.esquerda}>
          <h1 className={styles.titulo}>Login ao Sistema</h1>
          <p className={styles.subtitulo}>
            Por favor, insira suas informações de login ou{" "}
            <a href="/cadastro" className={styles.link}>
              clique aqui para se registrar
            </a>
          </p>
          <form onSubmit={realizarLogin}>
            <div className={styles.grupoInput}>
              <input
                id="email"
                type="text"
                placeholder="E-mail"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.grupoInputSenha}>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                className={styles.input}
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
            <div className={styles.lembrar}>
              <input type="checkbox" id="lembrar" />
              <label htmlFor="lembrar" className={styles.label}>
                Lembrar-me
              </label>
            </div>
            <button type="submit" className={styles.botaoEntrar}>
              Entrar
            </button>
          </form>
          {mensagem && (
            <p className={`${styles.mensagem} ${styles.erroMensagem}`}>
              {mensagem}
            </p>
          )}
        </div>
        <div className={styles.direita}>
          <h2 className={styles.tituloChargeMap}>ChargeMap</h2>
        </div>
      </div>
    </div>
  );
}

export default PaginaLogin;
