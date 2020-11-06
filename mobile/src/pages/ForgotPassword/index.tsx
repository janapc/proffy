import React, { useState } from "react";
import { View, Text, ImageBackground, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logoIcon from "../../assets/images/Proffy.png";
import bg from "../../assets/images/background-colors.png";

import styles from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ModalSuccess from "../../components/ModalSuccess";
import api from "../../services/api";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [toggleModalSuccess, setToggleModalSuccess] = useState(false);

  const { goBack } = useNavigation();

  function handleForgotPassword() {
    api
      .post("forgot_password", {
        email,
      })
      .then((response) => {
        setToggleModalSuccess(!toggleModalSuccess);
      })
      .catch((error) => {
        Alert.alert("Erro ao tentar recuperar sua senha!");
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.bgContainer}>
        <ImageBackground style={styles.bgImage} source={bg} resizeMode="center">
          <Image
            resizeMode="center"
            style={{ width: "100%" }}
            source={logoIcon}
          />
          <Text style={{ color: "#D4C2FF", width: 160 }}>
            Sua plaforma de estudos online.
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.forgotPasswordContainer}>
        <Ionicons
          name="ios-arrow-round-back"
          size={40}
          color="#9C98A6"
          onPress={() => goBack()}
        />
        <Text style={styles.title}>Esqueceu sua senha?</Text>
        <Text style={styles.subTitle}>
          Não esquenta,{"\n"}vamos dar um jeito nisso.
        </Text>
        <View style={{ marginTop: 20 }}>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
            position="only"
          />
          <Button
            title="Enviar"
            rules={email ? true : false}
            onPress={handleForgotPassword}
            style={{ marginTop: 40 }}
          />
        </View>
      </View>
      <ModalSuccess
        status={toggleModalSuccess}
        title="Redefinição enviada!"
        subtitle="Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos."
        route="SignIn"
        buttonTitle="Fazer login"
      />
    </View>
  );
};

export default ForgotPassword;
