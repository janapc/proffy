import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
  },
  bgContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8257E5",
  },
  bgImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  forgotPasswordContainer: {
    flex: 3,
    marginHorizontal: 32,
    marginTop: 40,
  },
  title: {
    color: "#32264D",
    fontSize: 24,
    lineHeight: 34,
    fontFamily: "Poppins_600SemiBold",
  },
  subTitle: {
    color: "#6A6180",
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Poppins_400Regular",
  },
});

export default styles;
