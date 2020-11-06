import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    paddingHorizontal: 25,
  },
  title: {
    paddingTop: 20,
    fontSize: 32,
    lineHeight: 42,
    color: "#32264D",
    fontFamily: "Poppins_600SemiBold",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 24,
    color: "#6A6180",
    fontFamily: "Poppins_400Regular",
  },
  fieldsContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  proffyContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: "#e3e1e7",
    borderRadius: 75,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
