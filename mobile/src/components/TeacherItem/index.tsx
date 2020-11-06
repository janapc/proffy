import React, { useState, useEffect } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unFavorite from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import AsyncStorage from "@react-native-community/async-storage";
import goIcon from "../../assets/images/icons/go.png";

import getEnvVars from "../../utils/environment";

const { apiUrl } = getEnvVars();

export interface Teacher {
  subject: string;
  cost: number;
  id: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  schedule: Schedule[];
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
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

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
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

  function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  function convertTime(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return hours + ":" + (minutes === 0 ? "00" : minutes);
  }

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoritesArray = [];

    if (favorites) favoritesArray = JSON.parse(favorites);

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((TeacherItem: Teacher) => {
        return TeacherItem.id === teacher.id;
      });

      setIsFavorited(false);

      favoritesArray.splice(favoriteIndex, 1);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.imageContainer}>
          {teacher?.avatar ? (
            <Image
              source={{
                uri: `${apiUrl}/uploads/${teacher?.avatar}`,
              }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <Ionicons name="ios-person" size={40} color="#D4C2FF" />
          )}
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <Text style={styles.calendarHeaderTitle}>Dia</Text>
          <Text style={styles.calendarHeaderTitle}>Horário</Text>
        </View>
        <View style={styles.weekContainer}>
          {schedule.map((item, index) => (
            <View
              key={index}
              style={
                item.to || item.from
                  ? [styles.dayContainer]
                  : [styles.dayContainer, styles.dayOff]
              }
            >
              <Text style={styles.dayTitle}>{item.name}</Text>
              <Image source={goIcon} style={{ opacity: 0.6 }} />
              <Text style={styles.dayTitle}>
                {item.from ? convertTime(item.from) : ""} -{" "}
                {item.to ? convertTime(item.to) : ""}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={unFavorite} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
