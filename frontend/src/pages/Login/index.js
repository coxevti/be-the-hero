import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";

import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

import api from "../../services/api";

export default function Login() {
  const [id, setId] = useState("");

  const history = useHistory();

  useEffect(() => {
    const ongId = localStorage.getItem("ongId");
    if (ongId) {
      history.push("/profile");
    }
  }, [history]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      toast(`Ola, ${response.data.name}`, {
        type: toast.TYPE.SUCCESS
      });
      history.push("/profile");
    } catch (error) {
      toast(`Falha no login, Tente novamente!`, { type: toast.TYPE.ERROR });
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="heroes" />
    </div>
  );
}
