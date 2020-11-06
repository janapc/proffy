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
  contentContainer: {
    flex: 3,
    paddingLeft: 40,
    paddingTop: 100,
  },
  titleNumber: {
    fontFamily: "Archivo_700Bold",
    fontSize: 40,
    opacity: 0.16,
    color: "#6A6180",
  },
  title: {
    color: "#6A6180",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    lineHeight: 34,
    width: "70%",
    marginTop: 40,
  },
  controlContainer: {
    flexDirection: "row",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "space-around",
  },
  bubble: {
    width: 8,
    height: 8,
    borderRadius: 2,
    marginRight: 8,
    backgroundColor: "#C1BCCC",
  },
  bubbleActive: {
    backgroundColor: "#8257E5",
  },
});

export default styles;
