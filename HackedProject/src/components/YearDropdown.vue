<script setup>
  import { ref, computed } from 'vue';

  const emit = defineEmits(['update:modelValue']);
  const dropdownVisible = ref(false);
  const selectedYear = ref('');
  const yearOptions = computed(() => Array.from({ length: (new Date().getFullYear()) - 2020 }, (_, index) => 2021 + index).reverse());

  const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
  };

  const selectYear = (year) => {
    emit('update:modelValue', year);
    selectedYear.value = year;
    toggleDropdown();
  };
</script>

<template>
  <div class="year-dropdown" @click="toggleDropdown" :class="{ 'border-merged': dropdownVisible }">
    <div class="selected-year">
      {{ selectedYear || 'All years' }}
    </div>
    <div v-if="dropdownVisible" class="year-options">
      <div class="year-option" @click="selectYear('')">All years</div>
      <div v-for="year in yearOptions" :key="year" class="year-option" @click="selectYear(year)">
        {{ year }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .year-dropdown {
    padding: 12px 24px;
    background-color: transparent;
    font-size: 14px;
    line-height: 18px;
    color: #575756;
    border-radius: 50px;
    border: 1px solid #575756;
    transition: all 250ms ease-in-out;
    cursor: pointer;
    position: relative;
    min-width: 50px;
    text-align: center;
  }

  .year-dropdown.border-merged {
    border-radius: 50px 50px 0 0;
    border-bottom: none;
  }

  .year-options {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: black;
    border: 1px solid #575756;
    border-top: none;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 10;
    border-radius: 0 0 4px 4px;
  }

  .year-option {
    padding: 12px 24px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: #575756;
    border-bottom: 1px solid #575756;
  }

  .year-option:last-child {
    border-bottom: none;
  }

  .year-option:hover {
    background-color: #575756;
    color: black;
  }
</style>
