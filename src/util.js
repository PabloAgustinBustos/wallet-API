module.exports = {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
  DB_HOST: process.env.DB_HOST || "localhost",
  PORT: process.env.PORT || 3001
}