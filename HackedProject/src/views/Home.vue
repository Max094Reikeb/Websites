<script setup>
  import { ref, onMounted, computed } from 'vue';
  import ShowCard from "../components/ShowCard.vue";
  import store from "../store";

  const query = ref('');
  const shows = ref([]);
  const filteredShows = computed(() => {
    if (!query.value) return shows.value;
    return shows.value.filter((show) => show.title.toLowerCase().includes(query.value.toLowerCase()));
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

  const searchMovies = async () => {
    const [movies, series] = await Promise.all([
      fetchShows('api/movies'),
      fetchShows('api/series')
    ]);
    shows.value = [...movies, ...series];
    store.allSeries.value = [...series];
  };

  onMounted(searchMovies);
</script>

<template>
  <div class="search">
    <p>Max's shows and movies library</p>
    <label>
      <input type="text" v-model="query" placeholder="Search">
    </label>
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

  .search input {
    width: 100%;
    padding: 12px 24px;
    background-color: transparent;
    font-size: 14px;
    line-height: 18px;
    color: #575756;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
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
