import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import { useAuth } from "../../contexts/auth";

import profileIcon from "../../assets/images/icons/profile.svg";
import proffyIcon from "../../assets/images/icons/proffy.svg";

import api from "../../services/api";

import "./styles.css";

require("dotenv").config();

interface PageHeaderProps {
  title: string;
}

interface Total {
  totalConnections?: string;
  totalProffys?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const [total, setTotal] = useState<Total>({});

  const { signOut, user } = useAuth();

  useEffect(() => {
    api.get("connections").then((response) => {
      setTotal(response.data);
    });
  }, []);

  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/profile">
          <img
            src={
              user?.avatar
                ? `${process.env.REACT_APP_BASE_URL}/uploads/${user?.avatar}`
                : profileIcon
            }
            alt="profile"
            className="imageProfile"
          />
        </Link>
        <p>Estudar</p>
        <Link to="/" className="btn-logout" onClick={signOut}>
          <FiPower color="#D4C2FF" size={20} />
        </Link>
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        <div className="count-proffy">
          <p>
            Nós temos {total.totalProffys || 0} professores e um total de{" "}
            {total.totalConnections || 0} conexōes já realizadas.
          </p>
          <img src={proffyIcon} alt="emoji" />
        </div>
        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
