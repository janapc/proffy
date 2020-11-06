import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E6E6F0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEE",
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontFamily: "Archivo_700Bold",
    color: "#32264D",
    fontSize: 20,
  },
  subject: {
    fontFamily: "Poppins_400Regular",
    color: "#6A6180",
    fontSize: 12,
    marginTop: 4,
  },
  bio: {
    marginHorizontal: 24,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#6A6180",
  },
  calendarContainer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#E6E6F0",
  },
  calendarHeader: {
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    marginTop: 10,
  },
  calendarHeaderTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    lineHeight: 22,
    color: "#9C98A6",
  },
  weekContainer: {},
  dayContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    backgroundColor: "#FAFAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E6F0",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  dayOff: {
    opacity: 0.4,
  },
  dayTitle: {
    fontFamily: "Archivo_700Bold",
    color: "#6A6180",
    fontSize: 16,
    lineHeight: 21,
  },
  footer: {
    backgroundColor: "#FAFAFC",
    padding: 24,
    marginTop: 24,
    alignItems: "center",
  },
  price: {
    fontFamily: "Poppins_400Regular",
    color: "#6A6180",
    fontSize: 14,
  },
  priceValue: {
    fontFamily: "Archivo_700Bold",
    color: "#8257E5",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  favoriteButton: {
    backgroundColor: "#8257E5",
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  favorited: {
    backgroundColor: "#E33D3D",
  },
  contactButton: {
    backgroundColor: "#04D361",
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  contactButtonText: {
    color: "#FFF",
    fontFamily: "Archivo_700Bold",
    fontSize: 16,
    marginLeft: 16,
  },
  imageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default styles;
