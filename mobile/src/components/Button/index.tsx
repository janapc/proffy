import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

import styles from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  rules?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  rules,
  onPress,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        {
          backgroundColor: rules ? "#04D361" : "#DCDCE5",
        },
        style,
      ]}
      disabled={rules ? false : true}
      onPress={onPress}
      {...rest}
    >
      <Text style={[styles.btnTitle, { color: rules ? "#FFF" : "#9C98A6" }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
