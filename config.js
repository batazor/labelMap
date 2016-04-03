const app = {
  APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  APP_ENV: process.env.APP_ENV || 'develop'
}

export { app }
