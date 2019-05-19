<template>
  <div>
    <loader v-if="loading" text="Loading movies" />
    <template v-else>
      <router-link :to="{ name: 'movie', params: { id: 'new' } }" class="btn"
        >Add movie</router-link
      >
      <div class="search input-field">
        <i class="material-icons prefix">search</i>
        <input v-model="filter" type="text" />
        <label class="">Search movies</label>
      </div>
      <movie-card
        v-for="movie in filteredMovies"
        :movie="movie"
        :key="movie.id"
        @update="updateMovie"
        @delete="deleteMovie"
      />
    </template>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import Loader from '@/components/Loader.vue';
import { getMovies, updateMovie, deleteMovie } from '@/api';

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
      filter: '',
    };
  },
  computed: {
    filteredMovies() {
      if (this.filter === '') {
        return this.movies;
      }
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
  },
  async created() {
    this.loading = true;
    this.movies = await getMovies();
    this.loading = false;
  },
  methods: {
    updateMovie,
    async deleteMovie(movie) {
      if (confirm(`Are you sure you want to delete "${movie.title}"?`)) {
        await deleteMovie(movie);
        this.movies.splice(this.movies.findIndex(m => m.id === movie.id));
      }
    },
  },
};
</script>
