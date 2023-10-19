<script setup>
  import { computed, defineProps, ref } from 'vue';
  import store from "../store.js";

  const props = defineProps({
    currentShowId: Number
  })
  const {allSeries} = store;
  const selectedSeason = ref(null);

  const selectSeason = (season) => {
    selectedSeason.value = season;
  };

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
    </div>
    <div v-else class="episodes">
      <button @click="selectSeason(null)">Back to Seasons</button>
      <div v-for="(season, seasonIndex) in series.links" :key="seasonIndex" class="season-episodes">
        <table class="episode-table">
          <thead>
          <tr>
            <th>Season {{ seasonIndex + 1 }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(link, episode) in season" :key="episode">
            <td>
              <a :href="link" target="_blank" rel="noopener noreferrer">
                Episode {{ episode.slice(2) }}
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .episode-selector {
    padding: 2rem;
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
  }

  .season-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 100vh;
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

  .season-episodes {
    padding-top: 20px;
  }

  .episode-table th h1 {
    font-weight: bold;
    font-size: 1em;
    text-align: left;
    color: #185875;
  }

  .episode-table td {
    font-weight: normal;
    font-size: 1em;
    -webkit-box-shadow: 0 2px 2px -2px #0E1119;
    -moz-box-shadow: 0 2px 2px -2px #0E1119;
    box-shadow: 0 2px 2px -2px #0E1119;
  }

  .episode-table {
    text-align: center;
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    display: table;
    padding: 0 0 8em 0;
    color: white;
  }

  .episode-table td, .episode-table th {
    padding-bottom: 2%;
    padding-top: 2%;
    padding-left: 2%;
  }

  .episode-table tr:nth-child(odd) {
    background-color: #323C50;
  }

  .episode-table tr:nth-child(even) {
    background-color: #2C3446;
  }

  .episode-table th {
    background-color: #1F2739;
  }

  .episode-table td:first-child {
    color: #2C3446;
  }

  .episode-selector a {
    color: white;
    text-decoration: none;
  }

  .episode-table tr:hover {
    background-color: #464A52;
    -webkit-box-shadow: 0 6px 6px -6px #0E1119;
    -moz-box-shadow: 0 6px 6px -6px #0E1119;
    box-shadow: 0 6px 6px -6px #0E1119;
  }

  .episode-table td:hover {
    background-color: #464A52;
    font-weight: bold;
    box-shadow: #7F7C21 -1px 1px, #2C3446 -2px 2px, #2C3446 -3px 3px, #2C3446 -4px 4px, #2C3446 -5px 5px, #2C3446 -6px 6px;
    transform: translate3d(6px, -6px, 0);
    transition-delay: 0s;
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: line;
    cursor: pointer;
  }

  @media (max-width: 800px) {
    .episode-table td:nth-child(4),
    .episode-table th:nth-child(4) {
      display: none;
    }
  }
</style>
