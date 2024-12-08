import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/inicio.module.css";

function PaginaInicial() {
  const secaoRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add(styles.scrollVisivel);
          }
        });
      },
      { threshold: 0.3 }
    );

    secaoRefs.current.forEach((secao) => {
      if (secao) observador.observe(secao);
    });

    return () => observador.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <header className={styles.heroi}>
        <div className={styles.conteudoHeroi}>
          <h1 className={styles.titulo}>Simplifique sua vida com o ChargeMap</h1>
          <p className={styles.descricao}>
            A solução completa para motoristas de veículos elétricos, ajudando a encontrar pontos de
            carregamento, planejar viagens e receber suporte emergencial.
          </p>
        </div>
      </header>

      <main className={styles.principal}>
        <section
          className={`${styles.sobreNos} ${styles.scrollAnimado}`}
          ref={(el) => (secaoRefs.current[0] = el!)}
        >
          <h2 className={styles.tituloSecaoCentralizado}>Sobre Nós</h2>
          <div className={styles.sobreNosConteudo}>
            <div className={styles.sobreNosTexto}>
              <p>
                Na ChargeMap, nossa missão é simplificar e transformar a experiência dos motoristas
                de veículos elétricos, oferecendo uma solução completa e integrada que vai muito
                além da simples busca por pontos de carregamento. Com a crescente adesão a veículos
                elétricos como uma alternativa sustentável, entendemos que a transição para um
                futuro mais verde precisa ser acompanhada por ferramentas que tornem essa jornada
                prática, acessível e eficiente.
              </p>
              <p>
                Nossa plataforma permite que motoristas localizem, em poucos cliques, pontos de
                carregamento próximos com informações detalhadas e atualizadas em tempo real. Além
                disso, oferecemos a possibilidade de verificar a disponibilidade dos carregadores e
                até mesmo fazer reservas antecipadas, garantindo que nossos usuários tenham uma
                experiência tranquila e sem imprevistos.
              </p>
              <p>
                A ChargeMap se destaca por sua interface moderna e intuitiva, disponível tanto na
                web quanto no aplicativo móvel. Esses recursos foram cuidadosamente projetados para
                atender às necessidades de motoristas em movimento, proporcionando acesso fácil e
                rápido às informações que eles precisam.
              </p>
            </div>
            <div className={styles.sobreNosImagem}>
              <img src="/sobrenos.jpeg" alt="Sobre nós" className={styles.imagemSobre} />
            </div>
          </div>
          <div className={styles.sobreNosTextoFinal}>
            <p>
              Mais do que um simples serviço, a ChargeMap é um compromisso com o futuro. Nosso
              objetivo é facilitar a vida dos motoristas enquanto incentivamos a transição para uma
              mobilidade mais sustentável. Seja para uma viagem de longa distância ou para o dia a
              dia na cidade, a ChargeMap está ao lado dos motoristas de veículos elétricos,
              conectando tecnologia, sustentabilidade e conveniência.
            </p>
          </div>
        </section>

        <section
          className={`${styles.secao} ${styles.scrollAnimado}`}
          ref={(el) => (secaoRefs.current[1] = el!)}
        >
          <div className={styles.conteudoTexto}>
            <h2 className={styles.tituloSecao}>Encontre pontos de carregamento</h2>
            <p className={styles.textoSecao}>
              Na ChargeMap, encontrar um ponto de carregamento nunca foi tão fácil e eficiente. Com
              a nossa plataforma, os motoristas de veículos elétricos têm acesso a uma rede
              abrangente de estações de carregamento, cuidadosamente mapeadas e integradas em um
              sistema que fornece informações em tempo real. Desde a localização até a
              disponibilidade dos carregadores, tudo está ao alcance de alguns cliques, garantindo
              que você esteja sempre preparado para continuar sua viagem.
            </p>
          </div>
          <div className={styles.conteudoImagem}>
            <img src="/pontodecarregamento.jpg" alt="Ponto de carregamento" />
          </div>
        </section>

        <section
          className={`${styles.secao} ${styles.scrollAnimado}`}
          ref={(el) => (secaoRefs.current[2] = el!)}
        >
          <div className={styles.conteudoImagem}>
            <img src="/roteirizacao.jpg" alt="Interface do aplicativo" />
          </div>
          <div className={styles.conteudoTexto}>
            <h2 className={styles.tituloSecao}>Roteirização Inteligente</h2>
            <p className={styles.textoSecao}>
              A Roteirização Inteligente da ChargeMap foi projetada para proporcionar uma
              experiência de viagem tranquila e otimizada para motoristas de veículos elétricos.
              Esse recurso permite que o motorista planeje rotas detalhadas que consideram os pontos
              de recarga disponíveis ao longo do trajeto, bem como a autonomia atual do veículo e as
              condições do percurso.
            </p>
          </div>
        </section>

        <section
          className={`${styles.secao} ${styles.scrollAnimado}`}
          ref={(el) => (secaoRefs.current[3] = el!)}
        >
          <div className={styles.conteudoTexto}>
            <h2 className={styles.tituloSecao}>Status em Tempo Real</h2>
            <p className={styles.textoSecao}>
              O recurso de Status em Tempo Real da ChargeMap é projetado para oferecer informações
              atualizadas e precisas sobre a disponibilidade dos carregadores, garantindo que os
              motoristas tenham acesso aos dados mais relevantes para planejar suas recargas com
              eficiência.
            </p>
          </div>
          <div className={styles.conteudoImagem}>
            <img src="/status.jpg" alt="Planejamento de viagem" />
          </div>
        </section>

        <section
          className={`${styles.secao} ${styles.scrollAnimado}`}
          ref={(el) => (secaoRefs.current[4] = el!)}
        >
          <div className={styles.conteudoImagem}>
            <img src="/reserva.jpg" alt="Suporte emergencial" />
          </div>
          <div className={styles.conteudoTexto}>
            <h2 className={styles.tituloSecao}>Sistema de Reservas</h2>
            <p className={styles.textoSecao}>
              O Sistema de Reservas da ChargeMap foi desenvolvido para oferecer maior conveniência e
              tranquilidade aos motoristas de veículos elétricos, especialmente em momentos de alta
              demanda.
            </p>
          </div>
        </section>

        <section
          className={`${styles.secao} ${styles.scrollAnimado}`}
          ref={(el) => (secaoRefs.current[5] = el!)}
        >
          <div className={styles.conteudoTexto}>
            <h2 className={styles.tituloSecao}>Suporte para Emergência de Recarga</h2>
            <p className={styles.textoSecao}>
              O Suporte para Emergência de Recarga da ChargeMap foi criado para oferecer segurança e
              tranquilidade aos motoristas de veículos elétricos em situações imprevistas.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PaginaInicial;
