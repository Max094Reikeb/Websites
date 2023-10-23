<script setup>
  const props = defineProps({
    season: Object,
    seasonIndex: Number
  });

  const getEpisodeName = (episode) => {
    let episodeFullName = episode.slice(2);
    let episodeNames = episodeFullName.split('-', 2);
    return episodeNames[0] + ". " + episodeNames[1];
  }
</script>

<template>
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
          {{ getEpisodeName(episode) }}
        </a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
  .episode-selector a {
    color: white;
    text-decoration: none;
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

  .episode-table tr:hover {
    background-color: #464A52;
    -webkit-box-shadow: 0 6px 6px -6px #0E1119;
    -moz-box-shadow: 0 6px 6px -6px #0E1119;
    box-shadow: 0 6px 6px -6px #0E1119;
  }

  .episode-table td:hover {
    background-color: #464A52;
    font-weight: bold;
    box-shadow: #2C3446 -1px 1px, #2C3446 -2px 2px, #2C3446 -3px 3px, #2C3446 -4px 4px, #2C3446 -5px 5px, #2C3446 -6px 6px;
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
