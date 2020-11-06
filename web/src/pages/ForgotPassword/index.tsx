import React, { useState, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import Input from "../../components/Input";
import api from "../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  function handleForgotPassword(e: FormEvent) {
    e.preventDefault();

    if (!email) {
      return setError("O campo email é obrigatório");
    }

    api
      .post("forgot_password", {
        email,
      })
      .then((response) => {
        alert(
          "Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar."
        );
        history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
        alert("Erro ao tentar recuperar sua senha!");
      });
  }

  return (
    <div id="page-forgot-password">
      <div className="logo-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img className="logo-container-img" src={logoImg} alt="proffy" />
        <h2>Sua plataforma de estudos online</h2>
      </div>

      <div className="form-forgot-password">
        <form onSubmit={handleForgotPassword}>
          <fieldset>
            <legend>Eita, esqueceu sua senha?</legend>
            <p>Não esquenta, vamos dar um jeito nisso.</p>

            <Input
              label="E-mail"
              name="email"
              placeholder="E-mail"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="error">{error}</p>}

            <div className="btn-container">
              <button
                className={email ? "btn-valid" : "btn-invalid"}
                type="submit"
              >
                Enviar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
