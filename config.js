const app = {
  APP_ENV: process.env.APP_ENV || 'develop',
  APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 4000,
  APP_DEV: process.env.APP_DEV ? parseInt(process.env.APP_DEV) : 4100,
}

export { app }
