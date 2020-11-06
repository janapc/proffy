import React from "react";
import { View, Modal, Text, ImageBackground, Image } from "react-native";

import styles from "./styles";

import bgSuccess from "../../assets/images/background-success.png";
import checkIcon from "../../assets/images/icons/check.png";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";

interface ModalSuccessProps {
  status: boolean;
  title: string;
  subtitle: string;
  route: string;
  buttonTitle: string;
}

const ModalSuccess: React.FC<ModalSuccessProps> = ({
  title,
  subtitle,
  status,
  route,
  buttonTitle,
}) => {
  const { navigate } = useNavigation();
  return (
    <>
      <Modal animationType="slide" visible={status}>
        <ImageBackground
          source={bgSuccess}
          resizeMode="center"
          style={styles.bgContainer}
        >
          <View style={styles.modalContainer}>
            <Image source={checkIcon} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={{ width: "80%" }}>
            <Button
              title={buttonTitle}
              rules={true}
              onPress={() => navigate(route)}
            />
          </View>
        </ImageBackground>
      </Modal>
    </>
  );
};

export default ModalSuccess;
