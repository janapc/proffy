import React from "react";
import { View, TextInput, TextInputProps } from "react-native";

import styles from "./styles";

interface InputProps extends TextInputProps {
  placeholder: string;
  position: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  position,
  children,
  ...rest
}) => {
  let queue;
  if (position === "first") queue = styles.inputFirst;
  if (position === "last") queue = styles.inputLast;
  if (position === "only") queue = styles.inputOnly;

  return (
    <View style={[styles.input, queue]}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor="#9C98A6"
        {...rest}
      />
      {children}
    </View>
  );
};

export default Input;
