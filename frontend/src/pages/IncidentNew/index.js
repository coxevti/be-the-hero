import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles.css";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../../assets/logo.svg";

import api from "../../services/api";

export default function IncidentNew() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  async function handleSudmit(e) {
    e.preventDefault();
    try {
      const ongId = localStorage.getItem("ongId");
      const data = { title, description, value };
      await api.post("/incidents", data, { headers: { Authorization: ongId } });
      toast(`Caso cadatrado com sucesso!`, {
        type: toast.TYPE.SUCCESS
      });
      history.push("/profile");
    } catch (error) {
      toast(`Falha ao cadastrar caso, Tente novamente!`, {
        type: toast.TYPE.ERROR
      });
    }
  }

  return (
    <div className="incident-new-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" /> Voltar para home
          </Link>
        </section>
        <form onSubmit={handleSudmit}>
          <input
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
