import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

import styles from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";
import ModalSuccess from "../../components/ModalSuccess";

interface ImageProps {
  uri: string;
  name: string;
  type: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHide, setPasswordHide] = useState(true);
  const [proffy, setProffy] = useState(false);
  const [toggleModalSucccess, setToggleModalSuccess] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<ImageProps>();

  const { goBack } = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let filename: string = result.uri.split("/").pop() || "";
      let ext = filename.split(".").pop();
      setImage({
        uri: result.uri,
        name: filename,
        type: `image/${ext}`,
      });
    }
  }

  function handleSignUp() {
    setError("");

    if (!email || !name || !password) {
      return setError("Todos os campos são obrigatórios");
    }
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("proffy", String(proffy));
    if (image) data.append("avatar", image);

    api
      .post("user", data)
      .then((response) => {
        setToggleModalSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="ios-arrow-round-back"
            size={40}
            color="#9C98A6"
            onPress={() => goBack()}
          />
          <Text style={styles.title}>Crie sua conta gratuíta</Text>
          <Text style={styles.subtitle}>
            Basta preencher esses dados e você estará conosco.
          </Text>
        </View>

        <View style={styles.fieldsContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {image && image.uri ? (
              <Image
                source={{ uri: image.uri }}
                resizeMode="cover"
                style={{ width: 150, height: 150, borderRadius: 75 }}
              />
            ) : (
              <Feather name="upload" size={30} color="#8257E5" />
            )}
          </TouchableOpacity>
          <Input
            placeholder="Nome"
            position="first"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="E-mail"
            position="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Senha"
            position="last"
            value={password}
            onChangeText={(text) => setPassword(text)}
            underlineColorAndroid="transparent"
            secureTextEntry={passwordHide}
            style={{
              width: "80%",
            }}
          >
            {passwordHide ? (
              <Feather
                name="eye-off"
                size={24}
                color="#8257E5"
                style={{
                  marginRight: 20,
                }}
                onPress={() => setPasswordHide(!passwordHide)}
              />
            ) : (
              <Feather
                name="eye"
                size={24}
                color="#9C98A6"
                style={{
                  marginRight: 20,
                }}
                onPress={() => setPasswordHide(!passwordHide)}
              />
            )}
          </Input>
          {error ? (
            <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
          ) : null}

          <TouchableOpacity
            onPress={() => setProffy(!proffy)}
            style={styles.proffyContainer}
          >
            <Text>Professor?</Text>
            {proffy ? (
              <Feather name="smile" size={30} color="#8257E5" />
            ) : (
              <Feather name="frown" size={30} color="#9C98A6" />
            )}
          </TouchableOpacity>

          <Button
            title="Concluir cadastro"
            style={{ marginTop: 30 }}
            onPress={handleSignUp}
            rules={name && password && email ? true : false}
          />
        </View>
        <ModalSuccess
          title="Cadastro concluído!"
          subtitle="Agora você faz parte da plataforma da Proffy"
          status={toggleModalSucccess}
          route="SignIn"
          buttonTitle="Fazer login"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
