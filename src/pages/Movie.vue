<template>
  <div>
    <loader v-if="loading" text="Loading movie" />
    <movie-form
      v-else
      :movie="movie"
      @cancel="$router.push({ name: 'movie-list' })"
      @update="update"
    />
  </div>
</template>

<script>
import MovieForm from '@/components/MovieForm.vue';
import Loader from '@/components/Loader.vue';
import { getMovie, updateMovie, createMovie } from '@/api';

export default {
  name: 'movie',
  components: {
    MovieForm,
    Loader,
  },
  data() {
    return {
      loading: false,
      movie: {
        title: '',
        year: '',
        genre: '',
        plot: '',
        poster: '',
        comment: '',
      },
    };
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  async created() {
    if (this.id !== 'new') {
      this.loading = true;
      this.movie = await getMovie(this.id);
      this.loading = false;
    }
  },
  methods: {
    async update(movie) {
      if ('id' in movie) {
        await updateMovie(movie);
      } else {
        await createMovie(movie);
      }
      this.$router.push({ name: 'movie-list' });
    },
  },
};
</script>
