<script setup>
  import { ref, computed } from 'vue';

  const emit = defineEmits(['update:modelValue']);
  const dropdownVisible = ref(false);
  const selectedOption = ref('');
  const showsOptions = computed(() => ["Movies", "TV Shows"]);

  const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
  };

  const selectShowType = (type) => {
    emit('update:modelValue', type);
    selectedOption.value = type;
    toggleDropdown();
  };
</script>

<template>
  <div class="show-dropdown" @click="toggleDropdown" :class="{ 'border-merged': dropdownVisible }">
    <div class="selected-show">
      {{ selectedOption || 'All shows' }}
    </div>
    <div v-if="dropdownVisible" class="show-options">
      <div class="show-option" @click="selectShowType('')">All shows</div>
      <div v-for="show in showsOptions" :key="show" class="show-option" @click="selectShowType(show)">
        {{ show }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .show-dropdown {
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

  .show-dropdown.border-merged {
    border-radius: 50px 50px 0 0;
    border-bottom: none;
  }

  .show-options {
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

  .show-option {
    padding: 12px 24px;
    cursor: pointer;
    transition: background-color 0.2s;
    color: #575756;
    border-bottom: 1px solid #575756;
  }

  .show-option:last-child {
    border-bottom: none;
  }

  .show-option:hover {
    background-color: #575756;
    color: black;
  }
</style>
