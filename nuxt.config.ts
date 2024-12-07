// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'fs';
import { resolve } from 'path';

const buildVersion = JSON.parse(
  readFileSync(resolve(__dirname, 'build-version.json'), 'utf-8')
).version;

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      buildVersion,
    },
  },
});
