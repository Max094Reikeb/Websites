<script setup>
  import { ref, onMounted, computed, watchEffect } from 'vue';
  import ShowCard from "../components/ShowCard.vue";
  import ShowOption from "../components/ShowOption.vue";
  import YearDropdown from "../components/YearDropdown.vue";
  import SearchIcon from "../components/SearchIcon.vue";
  import store from "../store";

  const query = ref('');
  const selectedOption = ref('');
  const selectedYear = ref('');
  const shows = ref([]);
  const filteredShows = computed(() => {
    let result = shows.value;
    if (query.value) {
      result = result.filter((show) => show.title.toLowerCase().includes(query.value.toLowerCase()));
    }
    if (selectedYear.value) {
      result = result.filter((show) => show.year === selectedYear.value)
    }
    return result;
  });

  const fetchShows = async (endpoint) => {
    const address = "192.168.1.128:5001";
    const token = "d0bfe52c9f5f435ab909534d32dcb44c29258780";
    const url = `http://${address}/${endpoint}?access_token=${token}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${endpoint}: `, response.statusText);
      return [];
    }
    return response.json();
  };

  const searchShows = async () => {
    let movies = [];
    let series = [];

    if (selectedOption.value === 'Movies' || (!['Movies', 'TV Shows'].includes(selectedOption.value))) {
      movies = await fetchShows('api/movies');
    }

    if (selectedOption.value === 'TV Shows' || (!['Movies', 'TV Shows'].includes(selectedOption.value))) {
      series = await fetchShows('api/series');
    }

    shows.value = [...movies, ...series];
    store.allSeries.value = [...series];
  };

  onMounted(searchShows);

  watchEffect(() => {
    searchShows();
  }, { flush: 'post' });
</script>

<template>
  <div class="search">
    <p>Max's shows and movies library</p>
    <div class="search-area">
        <div class="search-bar">
          <input type="text" v-model="query" placeholder="Search">
          <SearchIcon />
        </div>
        <ShowOption v-model="selectedOption" :selectedOption="selectedOption" @update:selectedOption="val => selectedOption.value = val" />
        <YearDropdown v-model="selectedYear" :selectedYear="selectedYear" @update:selectedYear="val => selectedYear.value = val" />
    </div>
  </div>
  <div id="results">
    <ShowCard v-for="show in filteredShows" :key="show.id" :show="show" />
  </div>
</template>

<style scoped>
  .search {
    padding-top: 64px;
    padding-bottom: 40px;
  }

  .search p {
    font-size: 22px;
    font-weight: 900;
    text-align: center;
  }

  .search-area {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .search-bar {
    position: relative;
    width: 79%;
    padding-right: 50px;
  }

  .search-bar > svg {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    pointer-events: none;
  }

  .search input {
    width: 100%;
    padding: 12px 24px;
    background-color: transparent;
    font-size: 14px;
    line-height: 18px;
    color: #575756;
    border-radius: 50px;
    border: 1px solid #575756;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }

  .search input::placeholder {
    color: rgba(87, 87, 86, 0.8);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .search input:hover,
  .search input:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }

  #results {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
