import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";

import { FiCamera } from "react-icons/fi";

import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";
import profileIcon from "../../assets/images/icons/profile.svg";
import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

interface Schedule {
  week_day: number;
  from: string;
  to: string;
}

interface User {
  data: {
    user: {
      name: string;
      email: string;
      avatar: string;
      newAvatar: string;
      whatsapp: string;
      bio: string;
      proffy: boolean;
      cost: string;
      subject: string;
      schedule: Schedule[];
    };
  };
}

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File>();
  const [newAvatar, setNewAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [proffy, setProffy] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api
      .get("user")
      .then((response: User) => {
        if (response.data && response.data.user) {
          let avatar = response.data.user.avatar
            ? `http://localhost:3333/uploads/${response.data.user.avatar}`
            : profileIcon;
          setName(response.data.user.name);
          setProffy(response.data.user.proffy);
          setNewAvatar(avatar);
          setEmail(response.data.user.email);
          setWhatsapp(response.data.user.whatsapp);
          setBio(response.data.user.bio);
          setSubject(response.data.user.subject);
          setCost(response.data.user.cost);
          if (response.data.user.schedule)
            setScheduleItems([...response.data.user.schedule]);
        }
      })
      .catch((err) => setError(true));
  }, []);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function deleteScheduleItem(position: number) {
    if (position > -1) {
      scheduleItems.splice(position, 1);
    }
    setScheduleItems([...scheduleItems]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function convertTime(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return String(hours + ":" + (minutes === 0 ? "00" : minutes));
  }

  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("bio", bio);
    data.append("whatsapp", whatsapp);
    data.append("avatar", avatar || "");

    if (proffy) {
      data.append("subject", subject.toLowerCase());
      data.append("cost", cost);
      const newScheduleItems = scheduleItems.map((item) => {
        return {
          ...item,
          week_day: Number(item.week_day),
        };
      });
      data.append("schedule", JSON.stringify({ schedule: newScheduleItems }));
    }

    api
      .put("user", data)
      .then((response) => {
        alert("Atualização realizada com sucesso");
        history.push("/study");
      })
      .catch((error) => {
        alert("Tivemos algum erro no seu cadastro =(");
      });
  }

  function handleAvatar(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files as FileList;
    setAvatar(file[0]);

    const url = URL.createObjectURL(file[0]);

    setNewAvatar(url);
  }

  return (
    <>
      {error ? (
        <h1>user not found</h1>
      ) : (
        <div id="page-profile">
          <header>
            <div className="top-bar-container">
              <Link to={"/study"}>
                <img src={backIcon} alt="back" />
              </Link>
              <p>Estudar</p>
              <img src={logoImg} alt="proffy" />
            </div>
            <div className="header-container">
              <label className="avatar">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleAvatar}
                />
                <img src={newAvatar} alt="avatar" />
                <div className="icon-container">
                  <FiCamera size={20} color="#FFF" />
                </div>
              </label>
              <h2>{name}</h2>
              <p className="subject">{subject}</p>
            </div>
          </header>
          <main>
            <form onSubmit={handleUpdateUser}>
              <fieldset>
                <legend>Seus dados</legend>

                <Input
                  label="Nome completo"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="E-mail"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Whatsapp"
                  name="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
                <Textarea
                  label="biografia"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </fieldset>

              {proffy && (
                <>
                  <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select
                      name="subject"
                      label="Matéria"
                      options={[
                        { value: "Javascript", label: "Javascript" },
                        { value: "PHP", label: "PHP" },
                        { value: "Python", label: "Python" },
                        { value: "Java", label: "Java" },
                        { value: "Ruby", label: "Ruby" },
                        { value: "C#", label: "C#" },
                        { value: "Rust", label: "Rust" },
                        { value: "Kotlin", label: "Kotlin" },
                      ]}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    <Input
                      name="cost"
                      label="Custo da hora por aula"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                  </fieldset>

                  <fieldset>
                    <legend>
                      Horários disponíveis
                      <button type="button" onClick={addNewScheduleItem}>
                        + Novo horário
                      </button>
                    </legend>

                    {scheduleItems.map((scheduleItem, index) => {
                      return (
                        <div key={index} className="schedule-item">
                          <div className="schedule-item-fields">
                            <Select
                              name="week_day"
                              label="Dia da semana"
                              value={scheduleItem.week_day || 0}
                              onChange={(e) =>
                                setScheduleItemValue(
                                  index,
                                  "week_day",
                                  e.target.value
                                )
                              }
                              options={[
                                { value: "0", label: "Domingo" },
                                { value: "1", label: "Segunda-feira" },
                                { value: "2", label: "Terça-feira" },
                                { value: "3", label: "Quarta-feira" },
                                { value: "4", label: "Quinta-feira" },
                                { value: "5", label: "Sexta-feira" },
                                { value: "6", label: "Sábado" },
                              ]}
                            />
                            <Input
                              name="from"
                              label="Das"
                              type="time"
                              value={
                                typeof scheduleItem.from === "number"
                                  ? convertTime(Number(scheduleItem.from))
                                  : scheduleItem.from
                              }
                              onChange={(e) =>
                                setScheduleItemValue(
                                  index,
                                  "from",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              name="to"
                              label="até"
                              type="time"
                              value={
                                typeof scheduleItem.to === "number"
                                  ? convertTime(Number(scheduleItem.to))
                                  : scheduleItem.to
                              }
                              onChange={(e) =>
                                setScheduleItemValue(
                                  index,
                                  "to",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="delete-item">
                            <a onClick={(e) => deleteScheduleItem(index)}>
                              Excluir horário
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </fieldset>
                </>
              )}

              <footer>
                <p>
                  <img src={warningIcon} alt="Aviso importante" />
                  Importante! <br />
                  preencha todos os dados
                </p>
                <button type="submit">Salvar cadastro</button>
              </footer>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default Profile;
