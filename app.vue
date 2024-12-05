<template>
  <div class="container">
    <h1>Your IP Address</h1>
    <p v-if="ip">{{ ip }}</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const ip = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("/api/ip");
    const data = await res.json();
    ip.value = data.ip;
  } catch (error) {
    console.error("Failed to fetch IP:", error);
  }
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
}
</style>
