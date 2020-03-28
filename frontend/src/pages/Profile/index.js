import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-toastify";

import "./styles.css";
import logo from "../../assets/logo.svg";

import api from "../../services/api";

export default function Profile() {
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  const history = useHistory();
  const [incidents, setIncident] = useState([]);

  useEffect(() => {
    if (!ongId && !ongName) {
      history.push("/");
    } else {
      (async function listIncidents() {
        const response = await api.get("/profile", {
          headers: {
            Authorization: ongId
          }
        });
        const responseIncidents = response.data.map(item => {
          item.value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(item.value);
          return item;
        });
        setIncident(responseIncidents);
      })();
    }
  }, [history, ongId, ongName]);

  async function handleDelete(value) {
    try {
      await api.delete(`/incidents/${value}`, {
        headers: { Authorization: ongId }
      });
      setIncident(incidents.filter(item => item.id !== value));
    } catch (error) {
      toast(`Erro ao deletar caso, Tente novamente!`, {
        type: toast.TYPE.ERROR
      });
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be the Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      {incidents.length > 0 ? (
        <ul>
          {incidents.map(item => (
            <li key={item.id}>
              <strong>CASO:</strong>
              <p>{item.title}</p>
              <strong>DESCRIÇÃO:</strong>
              <p>{item.description}</p>
              <strong>VALOR:</strong>
              <p>{item.value}</p>
              <button type="button" onClick={() => handleDelete(item.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <span className="no-content">
          <FiAlertTriangle size={32} color="#ff6a00" /> Sem caso cadastrado !!!
        </span>
      )}
    </div>
  );
}
