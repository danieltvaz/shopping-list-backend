module.exports = {
  apps: [
    {
      name: "shopping-list-api",
      script: "build/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        API_PORT: process.env.API_PORT,
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: process.env.MYSQL_PORT,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        JWT_SECRET: process.env.JWT_SECRET,
      },
    },
  ],
};
