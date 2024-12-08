import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/assinaturas.module.css";

function Assinaturas() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Planos de Assinatura</h1>
        <p className={styles.descricao}>
          Escolha o plano que melhor atende às suas necessidades e aproveite
          todos os benefícios!
        </p>

        <div className={styles.planos}>
          {/* Plano Básico */}
          <div className={`${styles.plano} ${styles.planoBasico}`}>
            <img
              src="/plano1.webp"
              alt="Plano Básico"
              className={styles.imagemPlano}
            />
            <h2 className={styles.nomePlano}>Plano Básico</h2>
            <ul className={styles.beneficios}>
              <li>Acesso a 100 carregadores próximos</li>
              <li>Suporte padrão</li>
              <li>1 reserva ativa por vez</li>
            </ul>
            <p className={styles.valor}>R$ 19,99/mês</p>
            <button className={styles.botaoContratar}>Contrate Agora</button>
          </div>

          {/* Plano Premium */}
          <div className={`${styles.plano} ${styles.planoPremium}`}>
            <img
              src="/plano2.webp"
              alt="Plano Premium"
              className={styles.imagemPlano}
            />
            <h2 className={styles.nomePlano}>Plano Premium</h2>
            <ul className={styles.beneficios}>
              <li>Acesso ilimitado a carregadores</li>
              <li>Suporte prioritário</li>
              <li>Reservas múltiplas</li>
              <li>Relatórios mensais detalhados</li>
            </ul>
            <p className={styles.valor}>R$ 49,99/mês</p>
            <button className={styles.botaoContratar}>Contrate Agora</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Assinaturas;
