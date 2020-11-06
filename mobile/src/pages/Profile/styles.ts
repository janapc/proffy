import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 32,
    backgroundColor: "#8257E5",
    paddingBottom: 50,
  },
  bgImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  goBack: {
    width: 25,
    height: 25,
  },
  formContainer: {
    marginTop: -15,
  },
  headerIconCamera: {
    marginTop: -30,
    marginLeft: 100,
    backgroundColor: "#04D361",
    borderRadius: 20,
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontFamily: "Archivo_700Bold",
    fontSize: 24,
    lineHeight: 25,
    color: "#fff",
  },
  subject: {
    color: "#D4C2FF",
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 26,
  },
  inputGroup: {},
  inputText: {
    fontSize: 12,
    lineHeight: 22,
    color: "#9C98A6",
    fontFamily: "Poppins_400Regular",
    marginBottom: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  userDescription: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E6E6F0",
    borderRadius: 8,
    overflow: "hidden",
  },
  cardSubTitleContainer: {
    marginTop: 20,
    borderBottomColor: "#E6E6F0",
    paddingBottom: 8,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardSubTitle: {
    color: "#32264D",
    fontFamily: "Archivo_700Bold",
    lineHeight: 30,
    fontSize: 20,
  },
  listContainer: {
    backgroundColor: "transparent",
    width: "100%",
    marginBottom: 20,
  },
  listItems: {
    justifyContent: "center",
    backgroundColor: "#FAFAFC",
    height: 64,
    borderRadius: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#E6E6F0",
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addTitle: {
    marginLeft: 5,
    color: "#8257E5",
    fontFamily: "Archivo_400Regular",
    fontSize: 14,
    lineHeight: 26,
  },
  deleteContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  lineText: {
    backgroundColor: "#E6E6F0",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  deleteText: {
    color: "#E33D3D",
    fontFamily: "Archivo_700Bold",
    lineHeight: 20,
    fontSize: 12,
    marginBottom: 10,
  },
  footerContainer: {
    borderTopColor: "#E6E6F0",
    paddingTop: 8,
    borderTopWidth: 1,
    backgroundColor: "#FAFAFC",
    paddingBottom: 26,
    marginTop: 10,
  },
  confirmButton: {
    height: 56,
    backgroundColor: "#04D361",
    marginVertical: 25,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  confirmTitle: {
    fontSize: 16,
    lineHeight: 26,
    color: "#FFF",
    fontFamily: "Archivo_700Bold",
  },
  alertContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",

    marginHorizontal: 20,
  },
  alertText: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
