// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  serverMiddleware: [
    { path: '/raw', handler: '~/server/ip.js' },
    { path: '/json', handler: '~/server/ip.js' },
  ],
})
