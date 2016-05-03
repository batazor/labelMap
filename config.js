const app = {
  APP_ENV: process.env.APP_ENV || 'develop',
  APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 4000,
  APP_DEBUG: process.env.APP_DEBUG == 'true',
}

export { app }
