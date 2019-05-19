<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper indigo darken-1">
        <span class="brand-logo">Movies App</span>
      </div>
    </nav>
    <div class="section">
      <movie-card v-for="movie in movies" :movie="movie" :key="movie.id" />
    </div>
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue';
import { getMovies } from './api';

export default {
  name: 'app',
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    this.movies = await getMovies();
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
