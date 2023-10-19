<script setup>
  defineProps({
    show: {
      type: Object,
      required: true
    }
  });
</script>

<template>
  <div class="show">
    <div class="img-wrapper">
      <img :src="'https://image.tmdb.org/t/p/w500/' + show.poster_path" alt="">
      <a :href="show.file_link" target="_blank" rel="noopener noreferrer">
        <div class="overlay"></div>
      </a>
    </div>
    <p>{{ show.title }}</p>
  </div>
</template>

<style scoped>
  .show {
    position: relative;
    width: 15%;
  }

  .img-wrapper {
    position: relative;
    height: 85%;
    overflow: hidden;
    cursor: pointer;
  }

  .img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .img-wrapper iframe {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }

  .img-wrapper .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .img-wrapper:hover iframe {
    opacity: 1;
  }

  .img-wrapper:hover .overlay {
    opacity: 1;
  }

  .show p {
    margin: 0;
    padding: 5px;
    text-align: center;
    font-size: 14px;
    color: white;
  }
</style>
