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
  signInContainer: {
    flex: 3,
    marginHorizontal: 32,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 64,
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    fontFamily: "Poppins_600SemiBold",
    color: "#32264D",
  },
  signup: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 24,
    color: "#8257E5",
  },
  fieldsContainer: {
    marginTop: 20,
  },
  footerTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 24,
    color: "#9C98A6",
    fontWeight: "normal",
  },
  footerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 4,
  },
});

export default styles;
