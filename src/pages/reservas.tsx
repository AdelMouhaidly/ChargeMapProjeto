import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/reservas.module.css";

function Reservas() {
  const [cep, setCep] = useState("");
  const [carregadores, setCarregadores] = useState<any[]>([]);
  const [reservas, setReservas] = useState<any[]>([]);

  const gerarRuasProximas = () => {
    const ruas = [
      "Rua das Flores",
      "Avenida Brasil",
      "Rua do Comércio",
      "Rua das Palmeiras",
      "Travessa João de Barro",
      "Avenida Independência",
      "Rua Dom Pedro",
      "Rua Central",
      "Travessa dos Pioneiros",
      "Rua dos Andrades",
    ];
    return ruas.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  const gerarHorarios = () => {
    const horarios = [];
    for (let i = 9; i <= 20; i++) {
      horarios.push({
        hora: `${i}:00`,
        disponivel: Math.random() > 0.3,
      });
    }
    return horarios;
  };

  const gerarCarregadores = (cep: string) => {
    const ruas = gerarRuasProximas();
    return ruas.map((rua, index) => ({
      id: index + 1,
      nome: `Eletroposto ${index + 1}`,
      endereco: `${rua}, ${cep} - Cidade XYZ`,
      status: Math.random() > 0.5 ? "disponível" : "indisponível",
      tempoDisponibilidade: `${Math.floor(Math.random() * 30 + 10)} minutos`,
      horarios: gerarHorarios(),
    }));
  };

  const buscarCarregadores = () => {
    if (cep.length === 8) {
      const carregadoresGerados = gerarCarregadores(cep);
      setCarregadores(carregadoresGerados);
    }
  };

  const reservarHorario = (carregadorId: number, horario: string) => {
    const carregador = carregadores.find((c) => c.id === carregadorId);
    if (carregador) {
      setReservas([
        ...reservas,
        { carregadorId, endereco: carregador.endereco, horario },
      ]);
      alert(`Horário reservado: ${horario}`);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Reservas de Carregadores</h1>
        <p className={styles.descricao}>
          Insira o CEP para encontrar os carregadores mais próximos e verificar a
          disponibilidade.
        </p>
        <div className={styles.cepInput}>
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            maxLength={8}
            className={styles.input}
          />
          <button onClick={buscarCarregadores} className={styles.botaoBuscar}>
            Buscar
          </button>
        </div>

        {carregadores.length > 0 && (
          <div className={styles.carregadoresList}>
            {carregadores.map((carregador) => (
              <div key={carregador.id} className={styles.carregador}>
                <h2 className={styles.nomeCarregador}>{carregador.nome}</h2>
                <p className={styles.enderecoCarregador}>
                  Endereço: {carregador.endereco}
                </p>
                <p className={styles.statusCarregador}>
                  Status:{" "}
                  <span
                    className={
                      carregador.status === "disponível"
                        ? styles.statusDisponivel
                        : styles.statusIndisponivel
                    }
                  >
                    {carregador.status}
                  </span>
                </p>
                {carregador.status === "disponível" && (
                  <div>
                    <h3 className={styles.subtitulo}>Horários Disponíveis:</h3>
                    <ul className={styles.listaHorarios}>
                      {carregador.horarios.map((h: any, index: number) => (
                        <li
                          key={index}
                          className={
                            h.disponivel
                              ? styles.horarioDisponivel
                              : styles.horarioIndisponivel
                          }
                          onClick={() =>
                            h.disponivel &&
                            reservarHorario(carregador.id, h.hora)
                          }
                        >
                          {h.hora} - {h.disponivel ? "Disponível" : "Indisponível"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {carregador.status === "indisponível" && (
                  <p className={styles.tempoDisponibilidade}>
                    Estará disponível em: {carregador.tempoDisponibilidade}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {reservas.length > 0 && (
          <div className={styles.reservas}>
            <h2 className={styles.subtitulo}>Seus Horários Reservados:</h2>
            <ul className={styles.listaReservas}>
              {reservas.map((reserva, index) => (
                <li key={index} className={styles.itemReserva}>
                  <p>
                    <strong>Carregador:</strong> {reserva.carregadorId}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {reserva.endereco}
                  </p>
                  <p>
                    <strong>Horário:</strong> {reserva.horario}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Reservas;
