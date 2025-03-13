// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from 'fs';
import { resolve } from 'path';

let buildVersion = 'unknown';
try {
  const versionData = JSON.parse(
    readFileSync(resolve(__dirname, 'build-version.json'), 'utf-8')
  );
  buildVersion = versionData.version || 'unknown';
} catch (error) {
  console.warn('Could not read build version:', error);
}

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  app: {
    head: {
      meta: [
        { name: 'build-version', content: buildVersion }
      ]
    }
  },
  runtimeConfig: {
    public: {
      buildVersion: buildVersion as any,
    },
  },
});
