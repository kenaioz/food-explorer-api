module.exports = {
  apps: [
    {
      name: "food-explorer-api",
      script: "./src/server.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
