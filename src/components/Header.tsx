import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

function Header() {
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user") || "{}");
    setNomeUsuario(usuario.nome || "Usuário");
  }, []);

  const confirmarSaida = (salvarCredenciais: boolean) => {
    if (!salvarCredenciais) {
      localStorage.removeItem("user");
    }
    router.push("/");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>ChargeMap</div>

        <nav className={styles.nav}>
          <Link href="/inicio" className={styles.link}>
            Sobre Nós
          </Link>
          <Link href="/carregadores" className={styles.link}>
            Carregadores Próximos
          </Link>
          <Link href="/reservas" className={styles.link}>
            Sistema de Reservas
          </Link>
          <Link href="/assinaturas" className={styles.link}>
            Assinaturas
          </Link>
          <Link href="/integrantes" className={styles.link}>
            Integrantes
          </Link>
          <Link href="/suporte" className={styles.link}>
            Suporte
          </Link>
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
              <Link href="/informacoes" className={styles.menuItem}>
                Informações Pessoais
              </Link>
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
}

export default Header;
