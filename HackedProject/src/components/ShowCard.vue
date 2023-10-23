<script setup>
  import { computed, ref } from 'vue';

  const props = defineProps({
    show: Object
  });

  const isSeries = ref('poster_path' in props.show && typeof props.show.poster_path === 'object');
  const imageSrc = computed(() => {
    if (isSeries.value) {
      const posterPaths = Object.values(props.show.poster_path);
      return 'https://image.tmdb.org/t/p/w500/' + posterPaths[0];
    } else {
      return 'https://image.tmdb.org/t/p/w500/' + props.show.poster_path;
    }
  });

  const linkHref = computed(() => isSeries.value ? "#" : props.show.file_link);

  const handleClick = (event) => {
    if (isSeries.value) {
      event.preventDefault();
      window.location.hash = `/show?id=${props.show.id}`;
    }
  }
</script>

<template>
  <div class="show">
    <div class="img-wrapper">
      <img :src="imageSrc" alt="">
      <a :href="linkHref" target="_blank" rel="noopener noreferrer" @click="handleClick($event)">
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
  }
</style>
