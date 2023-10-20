<script setup>
  import { computed, defineProps, ref } from 'vue';
  import store from "../store.js";
  import EpisodeTable from "../components/EpisodeTable.vue";

  const props = defineProps({
    currentShowId: Number
  })
  const { allSeries } = store;
  const selectedSeason = ref(null);

  const selectSeason = (season) => {
    selectedSeason.value = season;
  };

  const goHome = () => {
    window.location.hash = '#/';
  }

  const series = computed(() => {
    return allSeries.value.find(series => series.id === props.currentShowId) || null;
  });
</script>

<template>
  <div v-if="series" class="episode-selector">
    <h1>{{ series.title }}</h1>
    <div v-if="selectedSeason === null" class="seasons">
      <div v-for="(poster, season) in series.poster_path" :key="season" class="season-card"
           @click="selectSeason(season)">
        <div class="image-wrapper">
          <img :src="'https://image.tmdb.org/t/p/w500/' + poster" alt="">
        </div>
        <p>Season {{ season }}</p>
      </div>
      <button @click="goHome">Home</button>
    </div>
    <div v-else class="episodes">
      <div class="season-poster" v-if="series.poster_path[selectedSeason]">
        <img :src="'https://image.tmdb.org/t/p/w500/' + series.poster_path[selectedSeason]" alt="">
      </div>
      <div v-for="(season, seasonIndex) in series.links" :key="seasonIndex" class="season-episodes">
        <EpisodeTable :season="season" :season-index="seasonIndex" />
      </div>
      <button @click="selectSeason(null)">Back</button>
    </div>
  </div>
</template>

<style scoped>
  .episode-selector {
    padding: 2rem;
    max-height: 300vh;
  }

  .episode-selector h1 {
    text-align: center;
  }

  .seasons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .season-card {
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 100vh;
    transform: scale(0.7);
    margin-top: -10vh;
  }

  .season-card .image-wrapper {
    max-height: 75vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .season-card img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .episodes {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    min-height: 0;
    align-content: center;
  }

  .episodes,
  .episodes > * {
    margin: 0;
    padding: 0;
  }

  .season-poster {
    transform: scale(0.5);
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: -15vh;
    margin-top: -19vh;
  }

  .season-episodes {
    width: 100%;
    margin-bottom: -10vh;
  }

  .episode-selector button {
    padding: 10px 20px;
    border: none;
    border-radius: 0.5rem;
    background-color: #1F2739;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    color: white;
    width: 70%;
  }

  .episode-selector button:hover {
    background-color: #185875;
  }
</style>
