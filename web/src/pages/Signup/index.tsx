import React, { useState, FormEvent, ChangeEvent } from "react";

import { FiFrown, FiSmile, FiEyeOff, FiEye, FiPlus } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import backIcon from "../../assets/images/icons/back.svg";
import logoImg from "../../assets/images/logo.svg";
import Input from "../../components/Input";
import api from "../../services/api";

import "./styles.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [proffy, setProffy] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const [avatarURL, setAvatarURL] = useState("");
  const [passwordHide, setPasswordHide] = useState(true);
  const [error, setError] = useState("");

  const history = useHistory();

  function handleSignup(e: FormEvent) {
    e.preventDefault();

    setError("");

    if (!email || !name || !password) {
      return setError("Todos os campos são obrigatórios");
    }

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("proffy", String(proffy));
    data.append("avatar", avatar || "");

    api
      .post("user", data)
      .then((response) => {
        alert("Cadastro realizado com sucesso");
        history.push("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  function handleAvatar(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files as FileList;
    setAvatar(file[0]);
    const url = URL.createObjectURL(file[0]);
    setAvatarURL(url);
  }

  return (
    <div id="page-signup">
      <div className="logo-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img className="logo-container-img" src={logoImg} alt="proffy" />
        <h2>Sua plataforma de estudos online</h2>
      </div>

      <div className="form-signup">
        <form onSubmit={handleSignup}>
          <fieldset>
            <legend>Cadastro</legend>
            <p>Preencha os dados abaixo para começar.</p>

            <label className="avatar">
              <FiPlus size={38} color="#8257e5" />
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleAvatar}
              />
              {avatarURL && <img src={avatarURL} alt="" id="avatarImg" />}
            </label>

            <Input
              label="Nome"
              name="name"
              placeholder="Nome"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="E-mail"
              name="email"
              placeholder="E-mail"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              name="password"
              placeholder="Senha"
              value={password}
              type={passwordHide ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
            >
              {passwordHide ? (
                <FiEyeOff
                  size={24}
                  color="#9C98A6"
                  onClick={(e) => setPasswordHide(!passwordHide)}
                />
              ) : (
                <FiEye
                  size={24}
                  color="#9C98A6"
                  onClick={(e) => setPasswordHide(!passwordHide)}
                />
              )}
            </Input>

            {error && <p className="error">{error}</p>}

            <div className="proffy">
              <span>Professor?</span>
              {proffy ? (
                <FiSmile
                  className="icon"
                  size={28}
                  color="#8257E5"
                  onClick={(e) => setProffy(!proffy)}
                />
              ) : (
                <FiFrown
                  className="icon"
                  size={28}
                  color="#9C98A6"
                  onClick={(e) => setProffy(!proffy)}
                />
              )}
            </div>

            <div className="btn-container">
              <button
                className={
                  email && name && password ? "btn-valid" : "btn-invalid"
                }
                type="submit"
              >
                Concluir cadastro
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Signup;
