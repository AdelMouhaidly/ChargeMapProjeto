import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/carregadores.module.css";

function CarregadoresProximos() {
  const [cep, setCep] = useState("");
  const [informacoes, setInformacoes] = useState<any>(null);
  const [carregadores, setCarregadores] = useState<any[]>([]);
  const [filtroVelocidade, setFiltroVelocidade] = useState("Todos");
  const [filtroConector, setFiltroConector] = useState("Todos");
  const [carregadorSelecionado, setCarregadorSelecionado] = useState<any>(null);
  const [rotaMapa, setRotaMapa] = useState<string | null>(null);

  const buscarCarregadores = async () => {
    if (!cep) {
      alert("Por favor, insira um CEP válido.");
      return;
    }

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();
      if (dados.erro) {
        alert("CEP inválido. Tente novamente.");
        return;
      }

      setInformacoes(dados);

      const carregadoresMock = [
        {
          nome: "Carregador Padrão A",
          velocidade: "Padrão",
          conector: "CCS",
          status: "Livre",
          tempoEstimado: "40 minutos",
          custo: "R$10,00",
          pagamento: ["Dinheiro", "Cartão"],
          latitude: -23.555771,
          longitude: -46.639557,
        },
        {
          nome: "Carregador Rápido B",
          velocidade: "Rápido",
          conector: "CHAdeMO",
          status: "Ocupado",
          tempoEstimado: "20 minutos",
          custo: "R$15,00",
          pagamento: ["Cartão"],
          latitude: -23.553771,
          longitude: -46.637557,
        },
        {
          nome: "Carregador Ultrarrápido C",
          velocidade: "Ultrarrápido",
          conector: "Tesla",
          status: "Em Manutenção",
          tempoEstimado: "10 minutos",
          custo: "R$20,00",
          pagamento: ["Cartão", "Pix"],
          latitude: -23.556771,
          longitude: -46.638557,
        },
      ];

      let carregadoresFiltrados = carregadoresMock;
      if (filtroVelocidade !== "Todos") {
        carregadoresFiltrados = carregadoresFiltrados.filter(
          (c) => c.velocidade === filtroVelocidade
        );
      }
      if (filtroConector !== "Todos") {
        carregadoresFiltrados = carregadoresFiltrados.filter(
          (c) => c.conector === filtroConector
        );
      }

      setCarregadores(carregadoresFiltrados);
      setCarregadorSelecionado(null);
      setRotaMapa(null);
    } catch (erro) {
      alert("Erro ao buscar informações. Tente novamente mais tarde.");
    }
  };

  const selecionarCarregador = (carregador: any) => {
    setCarregadorSelecionado(carregador);
    setRotaMapa(null);
  };

  const criarRota = async () => {
    if (!informacoes || !carregadorSelecionado) return;

    const origem = `${informacoes.logradouro}, ${informacoes.localidade}`;
    const destino = `${carregadorSelecionado.latitude},${carregadorSelecionado.longitude}`;

    const url = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyCJ4L0rlXF8DuMX0719v4a2xl2wGaeNqZk&origin=${encodeURIComponent(
      origem
    )}&destination=${encodeURIComponent(destino)}&mode=driving`;

    setRotaMapa(url);
  };

  const trocarCep = () => {
    setCep("");
    setInformacoes(null);
    setCarregadores([]);
    setCarregadorSelecionado(null);
    setRotaMapa(null);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.principal}>
        <h1 className={styles.titulo}>Carregadores Próximos</h1>
        <p className={styles.subtitulo}>
          Insira o CEP para encontrar os carregadores mais próximos.
        </p>
        <div className={styles.caixaFormulario}>
          <input
            type="text"
            placeholder="Digite seu CEP"
            className={styles.inputCep}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button className={styles.botaoBuscar} onClick={buscarCarregadores}>
            Buscar
          </button>
          {informacoes && (
            <button className={styles.botaoTrocarCep} onClick={trocarCep}>
              Trocar CEP
            </button>
          )}
        </div>
        <div className={styles.caixaFiltros}>
          <label>
            Velocidade de Carregamento:
            <select
              value={filtroVelocidade}
              onChange={(e) => setFiltroVelocidade(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Padrão">Padrão</option>
              <option value="Rápido">Rápido</option>
              <option value="Ultrarrápido">Ultrarrápido</option>
            </select>
          </label>
          <label>
            Tipo de Conector:
            <select
              value={filtroConector}
              onChange={(e) => setFiltroConector(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="CCS">CCS</option>
              <option value="CHAdeMO">CHAdeMO</option>
              <option value="Tesla">Tesla</option>
            </select>
          </label>
        </div>
        {informacoes && (
          <>
            <div className={styles.caixaInformacoes}>
              <h2>Informações do CEP:</h2>
              <p><strong>Rua:</strong> {informacoes.logradouro}</p>
              <p><strong>Bairro:</strong> {informacoes.bairro}</p>
              <p><strong>Cidade:</strong> {informacoes.localidade}</p>
              <p><strong>Estado:</strong> {informacoes.uf}</p>
            </div>
            <div className={styles.caixaMapa}>
              <iframe
                className={styles.mapa}
                src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyCJ4L0rlXF8DuMX0719v4a2xl2wGaeNqZk&q=carregadores+eletricos+perto+de+${informacoes.logradouro},${informacoes.localidade}`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className={styles.listaCarregadores}>
              <h2>Carregadores Encontrados:</h2>
              {carregadores.length > 0 ? (
                carregadores.map((carregador, index) => (
                  <div
                    key={index}
                    className={`${styles.carregador} ${
                      carregadorSelecionado === carregador
                        ? styles.carregadorSelecionado
                        : ""
                    }`}
                    onClick={() => selecionarCarregador(carregador)}
                  >
                    <h3>{carregador.nome}</h3>
                    <p>
                      <strong>Velocidade:</strong> {carregador.velocidade}
                    </p>
                    <p>
                      <strong>Conector:</strong> {carregador.conector}
                    </p>
                    <p>
                      <strong>Status:</strong> {carregador.status}
                    </p>
                    <p>
                      <strong>Tempo Estimado:</strong>{" "}
                      {carregador.tempoEstimado}
                    </p>
                    <p>
                      <strong>Custo:</strong> {carregador.custo}
                    </p>
                    <p>
                      <strong>Formas de Pagamento:</strong>{" "}
                      {carregador.pagamento.join(", ")}
                    </p>
                  </div>
                ))
              ) : (
                <p>Nenhum carregador encontrado com os filtros selecionados.</p>
              )}
            </div>
            {carregadorSelecionado && (
              <button className={styles.botaoRoteirizar} onClick={criarRota}>
                Roteirizar até {carregadorSelecionado.nome}
              </button>
            )}
            {rotaMapa && (
              <div className={styles.caixaMapa}>
                <iframe
                  className={styles.mapa}
                  src={rotaMapa}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default CarregadoresProximos;
