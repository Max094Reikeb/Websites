<script setup>
  import { ref, computed } from 'vue';
  import Home from "./views/Home.vue";
  import Show from "./views/ShowPage.vue";

  const routes = {
    '/': Home,
    '/show': Show
  };

  const currentPath = ref(window.location.hash);
  const currentShowId = ref(0);

  window.addEventListener('hashchange', function () {
    currentPath.value = window.location.hash;
  });

  const currentView = computed(function () {
    let tmpPath = currentPath.value.replace(/\?id=\d/, "");
    return routes[tmpPath.slice(1) || '/'];
  });
</script>

<template>
  <component :is="currentView" :currentShowId="currentShowId" :key="currentShowId"/>
</template>
