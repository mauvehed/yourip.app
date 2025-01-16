<template>
  <div class="container">
    <p v-if="ip">{{ ip }}</p>
    <p v-else>Loading...</p>
  </div>
  <div id="app">
    <NuxtPage />
    <div class="build-version">
      Build Version: {{ buildVersion }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const ip = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("/json");
    const data = await res.json();
    ip.value = data.ip;
  } catch (error) {
    console.error("Failed to fetch IP:", error);
  }
});

const buildVersion = useRuntimeConfig().public.buildVersion;
</script>

<style>
:root {
  --background-color: #373535;
  --text-color: #e4e4e4;
  /* Add other variables as needed */
}
body {
  background-color: var(--background-color);
  color: var(--text-color);
  /* Apply other variables as needed */
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.build-version {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #aaa;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 2.5rem;
}
</style>
