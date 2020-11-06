import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";

import logoIcon from "../../assets/images//icons/back.png";
import bg from "../../assets/images/background-colors.png";
import api from "../../services/api";
import Input from "../../components/Input";
import ModalSuccess from "../../components/ModalSuccess";
import getEnvVars from "../../utils/environment";

const { apiUrl } = getEnvVars();

interface Schedule {
  week_day: number;
  from: string;
  to: string;
  class_id?: number;
  id?: number;
}

interface User {
  data: {
    user: UserProps;
  };
}

interface UserProps {
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
}

interface ImageProps {
  uri: string;
  name: string;
  type: string;
}

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
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<ImageProps | "">();
  const [newAvatar, setNewAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [proffy, setProffy] = useState(false);
  const [toggleModalSucccess, setToggleModalSuccess] = useState(false);

  const [expandedSubject, setExpandedSubject] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<string | null>();

  const [scheduleItems, setScheduleItems] = useState<Schedule[]>([
    { week_day: 0, from: "", to: "" },
  ]);

  const { navigate } = useNavigation();

  useEffect(() => {
    api.get("user").then((response: User) => {
      if (response.data && response.data.user) {
        let avatar = response.data.user.avatar
          ? `${apiUrl}/uploads/${response.data.user.avatar}`
          : "";

        setName(response.data.user.name);
        setProffy(response.data.user.proffy);
        setNewAvatar(avatar);
        setEmail(response.data.user.email);
        setWhatsapp(response.data.user.whatsapp);
        setBio(response.data.user.bio);
        setSubject(response.data.user.subject);
        setCost(response.data.user.cost);

        if (response.data.user.schedule) {
          setScheduleItems([...response.data.user.schedule]);
        }
      }
    });
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

  async function getImageUser() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let filename: string = result.uri.split("/").pop() || "";
      let ext = filename.split(".").pop();
      setAvatar({
        uri: result.uri,
        name: filename,
        type: `image/${ext}`,
      });
      setNewAvatar(result.uri);
    }
  }

  function handleUpdateUser() {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("bio", bio);
    data.append("whatsapp", whatsapp);
    if (avatar) data.append("avatar", avatar);

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
        setToggleModalSuccess(true);
      })
      .catch((error) => {
        Alert.alert("Tivemos algum erro no seu cadastro =(");
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BorderlessButton onPress={() => navigate("Study")}>
          <Image source={logoIcon} style={styles.goBack} />
        </BorderlessButton>

        <ImageBackground
          style={styles.bgImage}
          source={bg}
          resizeMode="contain"
        >
          <TouchableOpacity onPress={getImageUser}>
            {newAvatar ? (
              <Image
                source={{
                  uri: newAvatar,
                }}
                style={styles.image}
              />
            ) : (
              <Ionicons
                name="ios-person"
                style={[
                  {
                    alignSelf: "center",
                    justifyContent: "center",
                  },
                ]}
                size={140}
                color="#D4C2FF"
              />
            )}

            <View style={styles.headerIconCamera}>
              <Feather name="camera" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <View style={styles.userDescription}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subject}>{subject}</Text>
          </View>
        </ImageBackground>
      </View>
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 23,
        }}
      >
        <View style={styles.cardContainer}>
          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.cardSubTitleContainer}>
              <Text style={styles.cardSubTitle}>Seus dados</Text>
            </View>

            <View>
              <Text style={styles.inputText}>Nome</Text>
              <Input
                placeholder="Nome"
                position="only"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>

            <View>
              <Text style={styles.inputText}>E-mail</Text>
              <Input
                placeholder="E-mail"
                position="only"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View>
              <Text style={styles.inputText}>Whatsapp</Text>
              <Input
                placeholder="Whatsapp"
                position="only"
                value={whatsapp}
                onChangeText={(text) => setWhatsapp(text)}
              />
            </View>

            <View>
              <Text style={styles.inputText}>biografia</Text>
              <Input
                placeholder="biografia"
                position="only"
                value={bio}
                multiline
                textAlignVertical="top"
                onChangeText={(text) => setBio(text)}
              />
            </View>
            {proffy && (
              <>
                <View style={styles.cardSubTitleContainer}>
                  <Text style={styles.cardSubTitle}>Sobre a aula</Text>
                </View>

                <View>
                  <List.Section
                    title="Matéria"
                    style={styles.listContainer}
                    titleStyle={[
                      styles.inputText,
                      {
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                      },
                    ]}
                  >
                    <List.Accordion
                      title={subject}
                      expanded={expandedSubject}
                      onPress={() => setExpandedSubject(!expandedSubject)}
                      style={styles.listItems}
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
                              setExpandedSubject(!expandedSubject);
                            }}
                            style={{
                              backgroundColor: "#FAFAFC",
                            }}
                          />
                        );
                      })}
                    </List.Accordion>
                  </List.Section>
                </View>

                <View>
                  <Text style={styles.inputText}>Custo da hora por aula</Text>
                  <Input
                    placeholder="Custo da hora por aula"
                    position="only"
                    value={cost}
                    onChangeText={(text) => setCost(text)}
                  />
                </View>

                <View>
                  <View style={styles.cardSubTitleContainer}>
                    <Text style={styles.cardSubTitle}>
                      Horários disponíveis
                    </Text>
                    <TouchableOpacity
                      onPress={addNewScheduleItem}
                      style={styles.addContainer}
                    >
                      <Feather name="plus" color="#8257E5" />
                      <Text style={styles.addTitle}>Novo</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    {scheduleItems.map((scheduleItem, index) => (
                      <View key={index}>
                        <View>
                          <List.Section
                            title="Dia da semana"
                            style={styles.listContainer}
                            titleStyle={[
                              styles.inputText,
                              {
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                              },
                            ]}
                          >
                            <List.Accordion
                              id={index}
                              title={days[scheduleItem.week_day].label}
                              expanded={
                                expandedIndex === `${index}-days` ? true : false
                              }
                              onPress={() => setExpandedIndex(`${index}-days`)}
                              style={styles.listItems}
                              titleStyle={{
                                color: "#8257E5",
                              }}
                            >
                              {days.map((day, i) => {
                                return (
                                  <View key={i}>
                                    <List.Item
                                      title={day.label}
                                      onPress={() => {
                                        setScheduleItemValue(
                                          index,
                                          "week_day",
                                          String(day.value)
                                        );

                                        setExpandedIndex(null);
                                      }}
                                      style={{
                                        backgroundColor: "#FAFAFC",
                                      }}
                                    />
                                  </View>
                                );
                              })}
                            </List.Accordion>
                          </List.Section>
                        </View>

                        <View style={styles.timeContainer}>
                          <View style={{ marginRight: 15, flex: 1 }}>
                            <Text style={styles.inputText}>Das</Text>

                            <TouchableOpacity
                              onPress={() => setExpandedIndex(`${index}-from`)}
                              style={styles.listItems}
                            >
                              <Text>{scheduleItem.from}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                              isVisible={
                                expandedIndex === `${index}-from` ? true : false
                              }
                              mode="time"
                              onCancel={() => setExpandedIndex(null)}
                              onConfirm={(e) => {
                                setScheduleItemValue(
                                  index,
                                  "from",
                                  e.toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                );
                                setExpandedIndex(null);
                              }}
                            />
                          </View>

                          <View style={{ flex: 1 }}>
                            <Text style={styles.inputText}>até</Text>

                            <TouchableOpacity
                              onPress={() => setExpandedIndex(`${index}-to`)}
                              style={styles.listItems}
                            >
                              <Text>{scheduleItem.to}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                              isVisible={
                                expandedIndex === `${index}-to` ? true : false
                              }
                              mode="time"
                              onCancel={() => setExpandedIndex(null)}
                              onConfirm={(e) => {
                                setScheduleItemValue(
                                  index,
                                  "to",
                                  e.toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                );
                                setExpandedIndex(null);
                              }}
                            />
                          </View>
                        </View>

                        <TouchableOpacity
                          onPress={() => deleteScheduleItem(index)}
                          style={styles.deleteContainer}
                        >
                          <View style={styles.lineText} />
                          <Text style={styles.deleteText}>Excluir horário</Text>
                          <View style={styles.lineText} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={handleUpdateUser}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmTitle}>Salvar alterações</Text>
            </TouchableOpacity>
            <View style={styles.alertContainer}>
              <Feather name="alert-octagon" size={32} color="#8257E5" />
              <View style={{ marginLeft: 15 }}>
                <Text style={[styles.alertText, { color: "#8257E5" }]}>
                  Importante!
                </Text>
                <Text style={[styles.alertText, { color: "#A0A0B2" }]}>
                  Preencha todos os dados
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <ModalSuccess
        title="Atualização Concluída!"
        subtitle="Tudo certo, seu cadastro foi atualizado. Agora é
        só navegar pela aplicação."
        status={toggleModalSucccess}
        route="Study"
        buttonTitle="página inicial"
      />
    </View>
  );
};

export default Profile;
