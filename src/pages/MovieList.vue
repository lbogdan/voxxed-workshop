<template>
  <layout>
    <template v-slot:title>
      Movie List
    </template>
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
  </layout>
</template>

<script>
import { mapGetters } from 'vuex';
import MovieCard from '@/components/MovieCard.vue';
import Loader from '@/components/Loader.vue';
import Layout from '@/pages/Layout.vue';

export default {
  name: 'movie-list',
  components: {
    MovieCard,
    Loader,
    Layout,
  },
  data() {
    return {
      filter: '',
    };
  },
  computed: {
    ...mapGetters({
      loading: 'moviesLoading',
      movies: 'movies',
    }),
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
    this.$store.dispatch('loadMovies');
  },
  methods: {
    updateMovie(movie) {
      this.$store.dispatch('updateMovie', movie);
    },
    async deleteMovie(movie) {
      if (confirm(`Are you sure you want to delete "${movie.title}"?`)) {
        this.$store.dispatch('deleteMovie', movie);
      }
    },
  },
};
</script>
