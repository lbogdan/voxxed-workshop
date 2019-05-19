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
import { getMovie, updateMovie } from '@/api';

export default {
  name: 'movie',
  components: {
    MovieForm,
    Loader,
  },
  data() {
    return {
      loading: false,
      movie: {},
    };
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  async created() {
    this.loading = true;
    this.movie = await getMovie(this.id);
    this.loading = false;
  },
  methods: {
    async update(movie) {
      await updateMovie(movie);
      this.$router.push({ name: 'movie-list' });
    },
  },
};
</script>
