import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/suporte.module.css";

function SuporteEmergencia() {
  const [formulario, setFormulario] = useState({
    nome: "",
    telefone: "",
    cep: "",
    numeroEndereco: "",
    descricaoProblema: "",
  });
  const [informacaoCep, setInformacaoCep] = useState<any | null>(null);
  const [solicitando, setSolicitando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const [estimativa, setEstimativa] = useState("");

  const manipularMudanca = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  const buscarInformacaoCep = async () => {
    if (formulario.cep.length !== 8) {
      alert("Por favor, insira um CEP válido.");
      return;
    }
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${formulario.cep}/json/`);
      const dados = await resposta.json();
      if (dados.erro) {
        alert("CEP inválido. Por favor, tente novamente.");
        setInformacaoCep(null);
        return;
      }
      setInformacaoCep(dados);
    } catch (erro) {
      alert("Erro ao buscar informações do CEP. Tente novamente.");
      setInformacaoCep(null);
    }
  };

  const enviarFormulario = () => {
    if (
      !formulario.nome ||
      !formulario.telefone ||
      !formulario.cep ||
      !formulario.numeroEndereco ||
      !formulario.descricaoProblema
    ) {
      alert("Por favor, preencha todas as informações.");
      return;
    }

    setSolicitando(true);

    const tempoConfirmacao = Math.floor(Math.random() * 6) + 10; // Tempo entre 10 e 15 segundos
    const tempoChegada = Math.floor(Math.random() * 30) + 10; // Tempo entre 10 e 40 minutos

    setTimeout(() => {
      setSolicitando(false);
      setConfirmado(true);
      setEstimativa(`${tempoChegada} minutos`);
    }, tempoConfirmacao * 1000);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Suporte para Emergência de Recarga</h1>
        <p className={styles.descricao}>
          O Suporte para Emergência de Recarga da ChargeMap foi criado para oferecer segurança e tranquilidade aos motoristas de veículos elétricos em situações imprevistas.
        </p>
        <p className={styles.detalhes}>
          Este serviço inclui a entrega de uma bateria portátil, caso o veículo não tenha energia suficiente para chegar ao carregador mais próximo. Com este suporte, a ChargeMap garante que você esteja sempre assistido, mesmo nos momentos mais desafiadores.
        </p>

        {!confirmado ? (
          <div className={styles.form}>
            <h2 className={styles.subtitulo}>Solicitar Suporte de Emergência</h2>
            <label className={styles.label}>
              Nome Completo
              <input
                type="text"
                name="nome"
                value={formulario.nome}
                onChange={manipularMudanca}
                className={styles.input}
                placeholder="Digite seu nome"
              />
            </label>
            <label className={styles.label}>
              Telefone
              <input
                type="text"
                name="telefone"
                value={formulario.telefone}
                onChange={manipularMudanca}
                className={styles.input}
                placeholder="Digite seu telefone"
              />
            </label>
            <label className={styles.label}>
              CEP
              <div className={styles.cepInput}>
                <input
                  type="text"
                  name="cep"
                  value={formulario.cep}
                  onChange={manipularMudanca}
                  className={styles.input}
                  placeholder="Digite seu CEP"
                />
                <button onClick={buscarInformacaoCep} className={styles.botaoCep}>
                  Buscar
                </button>
              </div>
            </label>
            {informacaoCep && (
              <div className={styles.cepInfo}>
                <p>
                  <strong>Endereço:</strong> {informacaoCep.logradouro}, {informacaoCep.bairro}, {informacaoCep.localidade} - {informacaoCep.uf}
                </p>
              </div>
            )}
            <label className={styles.label}>
              Número do Endereço
              <input
                type="text"
                name="numeroEndereco"
                value={formulario.numeroEndereco}
                onChange={manipularMudanca}
                className={styles.input}
                placeholder="Digite o número do endereço"
              />
            </label>
            <label className={styles.label}>
              Descrição do Problema
              <textarea
                name="descricaoProblema"
                value={formulario.descricaoProblema}
                onChange={manipularMudanca}
                className={styles.textarea}
                placeholder="Descreva o problema"
              ></textarea>
            </label>
            <button
              onClick={enviarFormulario}
              className={styles.botaoSolicitar}
              disabled={solicitando}
            >
              {solicitando ? "Solicitando..." : "Solicitar Suporte"}
            </button>
          </div>
        ) : (
          <div className={styles.confirmacao}>
            <h2 className={styles.tituloConfirmacao}>Solicitação Confirmada!</h2>
            <p className={styles.mensagem}>
              Sua solicitação foi registrada com sucesso. O suporte técnico chegará ao local informado em aproximadamente <strong>{estimativa}</strong>.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SuporteEmergencia;
