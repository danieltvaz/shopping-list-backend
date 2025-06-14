module.exports = {
  apps: [
    {
      name: "shopping-list-api",
      script: "build/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: "fork",
      env_file: ".env",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
