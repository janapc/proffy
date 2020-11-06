import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import studyIcon from "../../assets/images/icons/study.png";
import bgPurple from "../../assets/images/background-purple.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import bgGreen from "../../assets/images/background-green.png";
import goIcon from "../../assets/images/icons/go.png";

import styles from "./styles";

const pages = [
  {
    icon: studyIcon,
    background: "#8257E5",
    bgImage: bgPurple,
    titleNumber: "01.",
    title: "Encontre vários professores para ensinar você",
  },
  {
    icon: giveClassesIcon,
    background: "#04D361",
    bgImage: bgGreen,
    titleNumber: "02.",
    title: "Ou dê aulas sobre o que você mais conhece",
  },
];

const Onboarding: React.FC = () => {
  const [pageId, setPageId] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState([0, 1]);

  const { navigate } = useNavigation();

  function nextPage() {
    if (pageId === 1) navigate("SignIn");
    setPageId(1);
  }

  return (
    <>
      {pages[pageId] && (
        <View style={styles.container}>
          <View
            style={[
              styles.bgContainer,
              { backgroundColor: pages[pageId].background },
            ]}
          >
            <ImageBackground
              source={pages[pageId].bgImage}
              resizeMode="center"
              style={styles.bgImage}
            >
              <Image
                source={pages[pageId].icon}
                resizeMode="center"
                style={{ width: "100%" }}
              />
            </ImageBackground>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleNumber}>{pages[pageId].titleNumber}</Text>
            <Text style={styles.title}>{pages[pageId].title}</Text>
            <View style={styles.controlContainer}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                {numberOfPages.map((page) => (
                  <View
                    key={page}
                    style={[
                      styles.bubble,
                      page === pageId && styles.bubbleActive,
                    ]}
                  ></View>
                ))}
              </View>
              <TouchableOpacity onPress={nextPage}>
                <Image source={goIcon} style={{ marginRight: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Onboarding;
