import React, { useState, FormEvent } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

import { useParams, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";

import Input from "../../components/Input";
import api from "../../services/api";

import "./styles.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  const [newPasswordHide, setNewPasswordHide] = useState(true);
  const [newPasswordRepeatHide, setNewPasswordRepeatHide] = useState(true);

  const [error, setError] = useState("");

  let { token }: { token: string } = useParams();
  const history = useHistory();

  function handleUpdatePassword(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!newPassword || !newPasswordRepeat) {
      return setError("Os campos não podem ficar em branco");
    }

    if (newPassword !== newPasswordRepeat) {
      return setError("As senhas devem ser iguais");
    }

    api
      .put("reset_password", {
        token,
        newPassword,
      })
      .then((response) => {
        alert("Senha atualizada com sucesso!");

        history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
        alert("Error ao tentar atualizada sua senha");
      });
  }

  function togglePassword(field: boolean) {
    if (field) setNewPasswordHide(!newPasswordHide);
    else setNewPasswordRepeatHide(!newPasswordRepeatHide);
  }

  return (
    <div id="page-reset-password">
      <div className="logo-container">
        <img className="logo-container-img" src={logoImg} alt="proffy" />
        <h2>Sua plataforma de estudos online</h2>
      </div>
      <div className="form-reset-password">
        <form onSubmit={handleUpdatePassword}>
          <fieldset>
            <legend>Formulário</legend>
            <Input
              label="nova senha *"
              name="newPassword"
              placeholder="nova senha"
              value={newPassword}
              type={newPasswordHide ? "password" : "text"}
              onChange={(e) => setNewPassword(e.target.value)}
            >
              {newPasswordHide ? (
                <FiEyeOff
                  size={24}
                  color="#9C98A6"
                  onClick={(e) => togglePassword(true)}
                />
              ) : (
                <FiEye
                  size={24}
                  color="#9C98A6"
                  onClick={(e) => togglePassword(true)}
                />
              )}
            </Input>

            <Input
              label="repita sua nova senha *"
              name="newPasswordRepeat"
              placeholder="repita sua nova senha"
              value={newPasswordRepeat}
              type={newPasswordRepeatHide ? "password" : "text"}
              onChange={(e) => setNewPasswordRepeat(e.target.value)}
            >
              {newPasswordRepeatHide ? (
                <FiEyeOff size={24} onClick={(e) => togglePassword(false)} />
              ) : (
                <FiEye size={24} onClick={(e) => togglePassword(false)} />
              )}
            </Input>
            {error && <p className="error">{error}</p>}

            <div className="btn-container">
              <button
                className={
                  newPassword && newPasswordRepeat ? "btn-valid" : "btn-invalid"
                }
                type="submit"
              >
                Salvar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
