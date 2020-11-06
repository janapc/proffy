import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#FAFAFC",
    height: 64,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#E6E6F0",
    justifyContent: "space-between",
  },
  inputFirst: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  inputLast: {
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  inputOnly: {
    borderRadius: 8,
  },
  textInput: {
    width: "100%",
    height: "100%",
    color: "#6a6180",
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  },
});

export default styles;
