<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>

<template>

  <Nav />
  <div class="container">
    <RouterView />
  </div>

</template>


