<template>
  <layout>
    <template v-slot:title>{{ `${isNew ? 'Add' : 'Edit'} Movie` }}</template>
    <div>
      <loader v-if="loading" text="Loading movie" />
      <movie-form
        v-else
        :movie="movie"
        @cancel="$router.push({ name: 'movie-list' })"
        @update="update"
      />
    </div>
  </layout>
</template>

<script>
import MovieForm from '@/components/MovieForm.vue';
import Loader from '@/components/Loader.vue';
import Layout from '@/pages/Layout.vue';
import { getMovie, updateMovie, createMovie } from '@/api';

export default {
  name: 'movie',
  components: {
    MovieForm,
    Loader,
    Layout,
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
  computed: {
    isNew() {
      return this.id === 'new';
    },
  },
  props: {
    id: {
      type: [Number, String],
    },
  },
  async created() {
    if (!this.isNew) {
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
