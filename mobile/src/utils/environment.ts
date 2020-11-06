import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://192.168.0.102:3333", //expo local url + port api
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
};

export default getEnvVars;
