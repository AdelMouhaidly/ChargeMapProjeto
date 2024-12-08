import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

function Header() {
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user") || "{}");
    setNomeUsuario(usuario.nome || "Usuário");
  }, []);

  const confirmarSaida = (salvarCredenciais: boolean) => {
    if (!salvarCredenciais) {
      localStorage.removeItem("user");
    }
    window.location.href = "/";
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>ChargeMap</div>

        <nav className={styles.nav}>
          <a href="/inicio" className={styles.link}>
            Sobre Nós
          </a>
          <a href="/carregadores" className={styles.link}>
            Carregadores Próximos
          </a>
          <a href="/reservas" className={styles.link}>
            Sistema de Reservas
          </a>
          <a href="/assinaturas" className={styles.link}>
            Assinaturas
          </a>
          <a href="/integrantes" className={styles.link}>
            Integrantes
          </a>
          <a href="/suporte" className={styles.link}>
            Suporte
          </a>
        </nav>

        <div className={styles.usuario}>
          <div
            className={styles.saudacao}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            Olá, {nomeUsuario} <span className={styles.seta}>&#x25BC;</span>
          </div>
          {menuAberto && (
            <div className={styles.menu}>
              <a href="/informacoes" className={styles.menuItem}>
                Informações Pessoais
              </a>
              <span
                onClick={() => {
                  setMenuAberto(false);
                  setModalAberto(true);
                }}
                className={`${styles.menuItem} ${styles.sair}`}
              >
                Sair
              </span>
            </div>
          )}
        </div>
      </header>

      {modalAberto && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.modalClose}
              onClick={() => setModalAberto(false)}
            >
              &#x2716;
            </button>
            <h3>Deseja salvar suas credenciais?</h3>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalButtonSalvar}
                onClick={() => {
                  setModalAberto(false);
                  confirmarSaida(true);
                }}
              >
                Salvar
              </button>
              <button
                className={styles.modalButtonExcluir}
                onClick={() => {
                  setModalAberto(false);
                  confirmarSaida(false);
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
