import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "", //expo local url + port api
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
};

export default getEnvVars;
