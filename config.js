const config = {
  port: Number(process.env.PORT) || 8080,
  serviceName: process.env.SERVICE_NAME || "wrenfield-api",
  featureFlags() {
    return JSON.parse(process.env.FEATURE_FLAGS);
  },
};

module.exports = config;
