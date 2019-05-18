<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper indigo darken-1">
        <span class="brand-logo">Movies App</span>
      </div>
    </nav>
    <div class="section">
      <movie-card />
    </div>
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue';

export default {
  name: 'app',
  components: {
    MovieCard,
  },
};
</script>

<style>
.nav-wrapper {
  padding: 0 1em;
}
.section {
  max-width: 800px;
  padding: 1em;
}
</style>
