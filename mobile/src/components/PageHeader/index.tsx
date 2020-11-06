import React, { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";
import { useAuth } from "../../contexts/auth";
import getEnvVars from "../../utils/environment";

const { apiUrl } = getEnvVars();

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const { navigate } = useNavigation();
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    navigate("SignIn");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton
          onPress={() => navigate("Profile")}
          style={styles.imageContainer}
        >
          {user?.avatar ? (
            <Image
              source={{
                uri: `${apiUrl}/uploads/${user?.avatar}`,
              }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
              }}
            />
          ) : (
            <Ionicons name="ios-person" size={40} color="#D4C2FF" />
          )}
        </BorderlessButton>

        <BorderlessButton
          onPress={handleSignOut}
          style={styles.signOutContainer}
        >
          <Ionicons name="ios-power" size={20} color="#D4C2FF" />
        </BorderlessButton>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  );
};

export default PageHeader;
