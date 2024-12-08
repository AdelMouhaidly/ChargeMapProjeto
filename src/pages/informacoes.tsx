import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/informacoes.module.css";

interface Informacao {
  id: number;
  nome_completo: string;
  data_nascimento: string;
  email: string;
  cep: string;
}

export default function Informacoes() {
  const [informacoes, setInformacoes] = useState<Informacao[]>([]);
  const [formulario, setFormulario] = useState({
    id: 0,
    nome_completo: "",
    data_nascimento: "",
    email: "",
    cep: "",
  });
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    carregarInformacoes();
  }, []);

  const carregarInformacoes = () => {
    fetch("http://localhost:5000/informacoes")
      .then((res) => res.json())
      .then((dados) => setInformacoes(dados))
      .catch((erro) => console.error(erro));
  };

  const manipularMudanca = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manipularEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (modoEdicao) {
      fetch(`http://localhost:5000/informacoes/${formulario.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      })
        .then(() => {
          carregarInformacoes();
          setModoEdicao(false);
          setFormulario({ id: 0, nome_completo: "", data_nascimento: "", email: "", cep: "" });
        })
        .catch((erro) => console.error(erro));
    } else {
      fetch("http://localhost:5000/informacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      })
        .then(() => {
          carregarInformacoes();
          setFormulario({ id: 0, nome_completo: "", data_nascimento: "", email: "", cep: "" });
        })
        .catch((erro) => console.error(erro));
    }
  };

  const manipularEdicao = (info: Informacao) => {
    setModoEdicao(true);
    setFormulario({
      id: info.id,
      nome_completo: info.nome_completo,
      data_nascimento: info.data_nascimento,
      email: info.email,
      cep: info.cep,
    });
  };

  const manipularExclusao = (id: number) => {
    fetch(`http://localhost:5000/informacoes/${id}`, { method: "DELETE" })
      .then(() => carregarInformacoes())
      .catch((erro) => console.error(erro));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.titulo}>Gerenciamento de Informações</h1>
        <form onSubmit={manipularEnvio} className={styles.formulario}>
          <input
            type="text"
            name="nome_completo"
            value={formulario.nome_completo}
            onChange={manipularMudanca}
            placeholder="Nome Completo"
            required
          />
          <input
            type="date"
            name="data_nascimento"
            value={formulario.data_nascimento}
            onChange={manipularMudanca}
            required
          />
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={manipularMudanca}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="cep"
            value={formulario.cep}
            onChange={manipularMudanca}
            placeholder="CEP"
            required
          />
          <button type="submit">{modoEdicao ? "Atualizar" : "Adicionar"}</button>
        </form>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Completo</th>
              <th>Data de Nascimento</th>
              <th>Email</th>
              <th>CEP</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {informacoes.map((info) => (
              <tr key={info.id}>
                <td>{info.id}</td>
                <td>{info.nome_completo}</td>
                <td>{info.data_nascimento}</td>
                <td>{info.email}</td>
                <td>{info.cep}</td>
                <td className={styles.acoes}>
                  <button
                    className={styles.botaoEditar}
                    onClick={() => manipularEdicao(info)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.botaoExcluir}
                    onClick={() => manipularExclusao(info.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
