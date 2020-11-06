import React, { useState, FormEvent } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import Input from "../../components/Input";

import "./styles.css";
import { useAuth } from "../../contexts/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [passwordHide, setPasswordHide] = useState(true);
  const [error, setError] = useState("");

  const { signIn } = useAuth();
  const history = useHistory();

  function togglePassword() {
    setPasswordHide(!passwordHide);
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email && !password) {
      return setError("Os campos email e senha são obrigatórios");
    }

    let response = await signIn({ email, password, remember });

    if (response) setError(response);
    else history.push("/study");
  }

  return (
    <div id="page-login">
      <div className="logo-container">
        <img className="logo-container-img" src={logoImg} alt="proffy" />
        <h2>Sua plataforma de estudos online</h2>
      </div>
      <div className="form-login">
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>Fazer login</legend>
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
                <FiEyeOff color="#9C98A6" size={24} onClick={togglePassword} />
              ) : (
                <FiEye color="#9C98A6" size={24} onClick={togglePassword} />
              )}
            </Input>
            {error && <p className="error">{error}</p>}

            <div className="fields">
              <div className="check">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <Link to="forgot-password">Esqueci minha senha</Link>
            </div>

            <div className="btn-container">
              <button
                className={password && email ? "btn-valid" : "btn-invalid"}
                type="submit"
              >
                Entrar
              </button>
            </div>
          </fieldset>
        </form>

        <footer>
          <div className="signup">
            <p>Não tem conta?</p>
            <Link to="signup">Cadastre-se</Link>
          </div>
          <span>
            É de graça <img src={purpleHeartIcon} alt="Coraçāo roxo" />
          </span>
        </footer>
      </div>
    </div>
  );
}

export default Login;
