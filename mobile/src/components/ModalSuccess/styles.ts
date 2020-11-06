import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: "#8257E5",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    color: "#FFF",
    fontFamily: "Archivo_700Bold",
    marginTop: 24,
    width: 200,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 24,
    color: "#D4C2FF",
    fontFamily: "Poppins_400Regular",
    marginTop: 16,
    width: 200,
    textAlign: "center",
  },
});

export default styles;
