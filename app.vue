<template>
  <div :class="['app-container', theme]">
    <div class="theme-toggle" @click="toggleTheme">
      <span v-if="theme === 'light'" class="theme-icon">🌙</span>
      <span v-else class="theme-icon">☀️</span>
    </div>

    <div class="content-container">
      <p><img src="/docs/images/yourIP_logo.png" alt="yourIP Logo" width="100" height="100"></p>
      <br>
      <h1>YourIP Address</h1>

      <div class="ip-display" :class="{ error: error }">
        <template v-if="error">
          <p class="error-message">{{ error }}</p>
          <button @click="fetchIP" class="retry-button">Retry</button>
        </template>
        <template v-else>
          <div v-if="loading" class="loading-spinner"></div>
          <p v-else class="ip-text">{{ ip }}</p>
        </template>
      </div>

      <div class="endpoints-info">
        <h2>API Endpoints</h2>
        <div class="endpoint">
          <code>curl -L yourip.app/json</code>
          <button @click="copyToClipboard('curl -L yourip.app/json')" class="copy-button">Copy</button>
        </div>
        <div class="endpoint">
          <code>curl -L yourip.app/raw</code>
          <button @click="copyToClipboard('curl -L yourip.app/raw')" class="copy-button">Copy</button>
        </div>
        <a href="https://github.com/mauvehed/yourip.app"
           target="_blank"
           rel="noopener noreferrer"
           class="github-link">
          <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" class="github-icon">
            <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
          <span>View on GitHub</span>
        </a>
      </div>
    </div>

    <div class="build-version">
      Build: {{ buildVersion.version }}
    </div>

    <div class="toast" v-if="showToast" :class="{ 'show': showToast }">
      Copied to clipboard!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const ip = ref(null);
const loading = ref(true);
const error = ref(null);
const theme = ref('dark');
const showToast = ref(false);

const fetchIP = async () => {
  loading.value = true;
  error.value = null;

  try {
    const res = await fetch("/json");
    if (!res.ok) throw new Error('Failed to fetch IP');
    const data = await res.json();
    ip.value = data.ip;
  } catch (err) {
    error.value = "Failed to fetch IP. Please try again.";
    console.error("Failed to fetch IP:", err);
  } finally {
    loading.value = false;
  }
};

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', theme.value);
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

onMounted(() => {
  theme.value = localStorage.getItem('theme') || 'dark';
  fetchIP();
});

const buildVersion = useRuntimeConfig().public.buildVersion;
</script>

<style>
:root {
  --bg-light: #ffffff;
  --text-light: #1a1a1a;
  --card-light: #f5f5f5;
  --border-light: #e0e0e0;
  --accent-light: #733bf6;

  --bg-dark: #1a1a1a;
  --text-dark: #ffffff;
  --card-dark: #2d2d2d;
  --border-dark: #404040;
  --accent-dark: #733bf6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;
}

/* Layout */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.content-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
}

/* Theme Styles */
.app-container.light {
  background-color: var(--bg-light);
  color: var(--text-light);
}

.app-container.dark {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

/* Theme Toggle */
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .theme-toggle {
  background: var(--card-dark);
}

/* Typography */
h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

code {
  font-family: monospace;
  font-size: 0.9rem;
}

/* IP Display */
.ip-display {
  background: var(--card-light);
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark .ip-display {
  background: var(--card-dark);
}

.ip-text {
  font-size: 2rem;
  font-weight: 600;
  font-family: monospace;
}

/* Loading Spinner */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-light);
  border-top-color: var(--accent-light);
  border-radius: 50%;
  margin: 1rem auto;
  animation: spin 1s linear infinite;
}

.dark .loading-spinner {
  border-color: var(--border-dark);
  border-top-color: var(--accent-dark);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* API Endpoints */
.endpoints-info {
  margin-top: 2rem;
  text-align: left;
}

.endpoint {
  background: var(--card-light);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark .endpoint {
  background: var(--card-dark);
}

/* Buttons */
.copy-button,
.retry-button {
  background: var(--accent-light);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.dark .copy-button,
.dark .retry-button {
  background: var(--accent-dark);
}

.copy-button:hover {
  opacity: 0.9;
}

/* Error States */
.error-message {
  color: #ef4444;
  margin-bottom: 1rem;
}

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  background: var(--accent-light);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.dark .toast {
  background: var(--accent-dark);
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* GitHub Link */
.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  text-decoration: none;
  color: var(--text-light);
  opacity: 0.8;
  transition: opacity 0.2s;
}

.dark .github-link {
  color: var(--text-dark);
}

.github-link:hover {
  opacity: 1;
}

.github-icon {
  transition: transform 0.2s;
}

.github-link:hover .github-icon {
  transform: scale(1.1);
}

/* Build Version */
.build-version {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
}

/* Responsive Styles */
@media (max-width: 640px) {
  .content-container {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .ip-text {
    font-size: 1.5rem;
  }

  .endpoint {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
