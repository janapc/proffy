import React, { useEffect, useState } from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import profileIcon from "../../assets/images/icons/profile.svg";

import "./styles.css";
import api from "../../services/api";

require("dotenv").config();

export interface Teacher {
  subject: string;
  cost: number;
  user_id: number;
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  schedule: TeacherSchedule[];
}

export interface TeacherSchedule {
  id: number;
  week_day: number;
  from: number;
  to: number;
  class_id: number;
}

interface TeacherItemProps {
  teacher: Teacher;
}

interface Schedule {
  week_day?: number;
  from?: number;
  to?: number;
  name?: string;
  class_id?: number;
}

const daysofweek = [
  { id: 0, name: "Domingo" },
  { id: 1, name: "Segunda" },
  { id: 2, name: "Terça" },
  { id: 3, name: "Quarta" },
  { id: 4, name: "Quinta" },
  { id: 5, name: "Sexta" },
  { id: 6, name: "Sábado" },
];

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    let days = daysofweek.map((days) => {
      let findSchedule = teacher.schedule.find(
        (schedule) => schedule.week_day === days.id
      );

      if (findSchedule) {
        return { ...findSchedule, name: days.name };
      } else {
        return { name: days.name };
      }
    });

    setSchedule(days);
  }, [teacher.schedule]);

  function convertTime(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return hours + ":" + (minutes === 0 ? "00" : minutes);
  }

  async function createNewConnection() {
    api.post("connections", {
      user_id: teacher.user_id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={
            teacher.avatar
              ? `${process.env.REACT_APP_BASE_URL}/uploads/${teacher.avatar}`
              : profileIcon
          }
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>

      <div className="schedule-container">
        {schedule.map((item, index) => (
          <div
            className={
              item.to || item.from
                ? "schedule-item"
                : "schedule-item schedule-item-hidden"
            }
            key={index}
          >
            <div className="schedule-description">
              <span>Dia</span>
              <strong>{item.name}</strong>
            </div>
            <div className="schedule-description">
              <span>Horário</span>
              <strong>
                {item.from ? convertTime(item.from) : ""} -
                {item.to ? convertTime(item.to) : ""}
              </strong>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          target="_blank"
          onClick={createNewConnection}
          href={`https://wa.me/55${teacher.whatsapp}`}
          type="button"
        >
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
