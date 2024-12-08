import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/integrantes.module.css";

function Integrantes() {
  const integrantes = [
    {
      nome: "Adel Mouhaidly",
      rm: "557705",
      turma: "1TDSA",
      github: "https://github.com/AdelMouhaidly",
      linkedin: "https://www.linkedin.com/in/adel-mouhaidly-bb5877339/",
      imagem: "/Adel.png",
    },
    {
      nome: "Afonso Correia Pereira",
      rm: "557863",
      turma: "1TDSA",
      github: "https://github.com/afonsocp",
      linkedin: "https://www.linkedin.com/in/afonso-correia-pereira/",
      imagem: "/Afonso.jpeg",
    },
    {
      nome: "Tiago Augusto Desiderato Ferro",
      rm: "558485",
      turma: "1TDSA",
      github: "https://github.com/Ferro333",
      linkedin: "https://www.linkedin.com/in/tiago-ferro-a8305631b/",
      imagem: "/Tiago.jpg",
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Integrantes</h1>
        <div className={styles.listaIntegrantes}>
          {integrantes.map((integrante, index) => (
            <div key={index} className={styles.integrante}>
              <img
                src={integrante.imagem}
                alt={`Foto de ${integrante.nome}`}
                className={styles.imagem}
              />
              <h2 className={styles.nome}>{integrante.nome}</h2>
              <p className={styles.info}>
                <strong>RM:</strong> {integrante.rm}
              </p>
              <p className={styles.info}>
                <strong>Turma:</strong> {integrante.turma}
              </p>
              <div className={styles.links}>
                <a
                  href={integrante.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  GitHub
                </a>
                <a
                  href={integrante.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Integrantes;
