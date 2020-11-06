import axios from "axios";
import getEnvVars from "../utils/environment";
const { apiUrl } = getEnvVars();

const api = axios.create({
  baseURL: apiUrl || "",
});

export default api;
