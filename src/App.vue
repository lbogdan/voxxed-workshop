<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper indigo darken-1">
        <span class="brand-logo">Movies App</span>
      </div>
    </nav>
    <div class="section">
      <loader v-if="loading" text="Loading movies" />
      <movie-card
        v-else
        v-for="movie in movies"
        :movie="movie"
        :key="movie.id"
        @update="updateMovie"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue';
import Loader from './components/Loader.vue';
import { getMovies, updateMovie } from './api';

export default {
  name: 'app',
  components: {
    MovieCard,
    Loader,
  },
  data() {
    return {
      loading: false,
      movies: [],
    };
  },
  async created() {
    this.loading = true;
    this.movies = await getMovies();
    this.loading = false;
  },
  methods: {
    updateMovie,
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
