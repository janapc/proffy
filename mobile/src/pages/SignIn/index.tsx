import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import logoIcon from "../../assets/images/Proffy.png";
import bg from "../../assets/images/background-colors.png";

import styles from "./styles";
import { useAuth } from "../../contexts/auth";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);

  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn() {
    setError("");
    if (!email && !password) {
      setError("Os campos email e senha são obrigatórios");
    }
    let response = await signIn({ email, password, remember: toggleCheckBox });
    if (response) setError(response);
    else navigate("Study");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
      <View style={styles.signInContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Fazer login</Text>
          <Text style={styles.signup} onPress={() => navigate("SignUp")}>
            Criar uma conta
          </Text>
        </View>

        <View style={styles.fieldsContainer}>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
            position="first"
          />

          <Input
            placeholder="Senha"
            underlineColorAndroid="transparent"
            value={password}
            position="last"
            secureTextEntry={passwordHide}
            onChangeText={(text) => setPassword(text)}
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
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setToggleCheckBox(!toggleCheckBox)}
          >
            {toggleCheckBox ? (
              <Feather
                name="check"
                color="#04D361"
                size={24}
                style={{ marginRight: 5 }}
              />
            ) : (
              <Feather
                name="check"
                color="#9C98A6"
                size={24}
                style={{ marginRight: 5 }}
              />
            )}
            <Text style={styles.footerTitle}>Lembrar-me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("ForgotPassword")}>
            <Text style={styles.footerTitle}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Entrar"
          rules={password && email ? true : false}
          onPress={handleSignIn}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
