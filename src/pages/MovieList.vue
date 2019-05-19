<template>
  <div>
    <loader v-if="loading" text="Loading movies" />
    <movie-card
      v-else
      v-for="movie in movies"
      :movie="movie"
      :key="movie.id"
      @update="updateMovie"
    />
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue';
import Loader from '../components/Loader.vue';
import { getMovies, updateMovie } from '../api';

export default {
  name: 'movie-list',
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
