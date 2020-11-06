import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import {
  BorderlessButton,
  RectButton,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { List } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import api from "../../services/api";

import styles from "./styles";
const subjects = [
  { value: "Javascript", label: "Javascript" },
  { value: "PHP", label: "PHP" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "Ruby", label: "Ruby" },
  { value: "C#", label: "C#" },
  { value: "Rust", label: "Rust" },
  { value: "Kotlin", label: "Kotlin" },
];

const days = [
  { value: "0", label: "Domingo" },
  { value: "1", label: "Segunda-feira" },
  { value: "2", label: "Terça-feira" },
  { value: "3", label: "Quarta-feira" },
  { value: "4", label: "Quinta-feira" },
  { value: "5", label: "Sexta-feira" },
  { value: "6", label: "Sábado" },
];

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showSubject, setShowSubject] = useState(false);
  const [showWeekDay, setShowWeekDay] = useState(false);

  const [subject, setSubject] = useState("Javascript");
  const [week_day, setWeekDay] = useState("0");
  const [timeFormat, setTimeFormat] = useState("09:00");

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFilterSubmit() {
    loadFavorites();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time: timeFormat,
      },
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }
  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={28} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <List.Section
              title="Matéria"
              titleStyle={[
                styles.label,
                {
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                },
              ]}
            >
              <List.Accordion
                title={subject}
                expanded={showSubject}
                onPress={() => setShowSubject(!showSubject)}
                style={styles.input}
                titleStyle={{
                  color: "#8257E5",
                }}
              >
                {subjects.map((subject) => {
                  return (
                    <List.Item
                      key={subject.value}
                      title={subject.label}
                      onPress={() => {
                        setSubject(subject.value);
                        setShowSubject(!showSubject);
                      }}
                      style={{
                        backgroundColor: "#FAFAFC",
                        borderBottomWidth: 1,
                        borderBottomColor: "#E6E6F0",
                      }}
                    />
                  );
                })}
              </List.Accordion>
            </List.Section>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <List.Section
                  title="Dia da semana"
                  titleStyle={[
                    styles.label,
                    {
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                    },
                  ]}
                >
                  <List.Accordion
                    title={days[Number(week_day)].label}
                    expanded={showWeekDay}
                    onPress={() => setShowWeekDay(!showWeekDay)}
                    style={styles.input}
                    titleStyle={{
                      color: "#8257E5",
                    }}
                  >
                    {days.map((day) => {
                      return (
                        <List.Item
                          key={day.value}
                          title={day.label}
                          onPress={() => {
                            setWeekDay(day.value);
                            setShowWeekDay(!showWeekDay);
                          }}
                          style={{
                            backgroundColor: "#FAFAFC",
                            borderBottomWidth: 1,
                            borderBottomColor: "#E6E6F0",
                          }}
                        />
                      );
                    })}
                  </List.Accordion>
                </List.Section>
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>

                <TouchableOpacity
                  onPress={() => setShowTime(!showTime)}
                  style={styles.input}
                >
                  <Text>{timeFormat}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={showTime}
                  mode="time"
                  onCancel={() => setShowTime(false)}
                  onConfirm={(e) => {
                    setTimeFormat(
                      e.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
                    );
                    setShowTime(false);
                  }}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
