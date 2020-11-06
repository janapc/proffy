import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F7",
  },
  teacherList: {
    marginTop: -15,
  },
  searchForm: {
    marginBottom: 24,
  },
  label: {
    color: "#D4C2FF",
    fontFamily: "Poppins_400Regular",
  },
  inputGroup: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBlock: {
    width: "100%",
  },
  input: {
    height: 54,
    backgroundColor: "#FFF",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#04D361",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
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
});

export default styles;
