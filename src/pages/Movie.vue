<template>
  <layout>
    <template v-slot:title>{{ `${isNew ? 'Add' : 'Edit'} Movie` }}</template>
    <div>
      <loader v-if="loading" text="Loading movie" />
      <movie-form
        v-else
        :movie="movie(id)"
        @cancel="$router.push({ name: 'movie-list' })"
        @update="update"
      />
    </div>
  </layout>
</template>

<script>
import { mapGetters } from 'vuex';
import MovieForm from '@/components/MovieForm.vue';
import Loader from '@/components/Loader.vue';
import Layout from '@/pages/Layout.vue';
import { updateMovie, createMovie } from '@/api';

export default {
  name: 'movie',
  components: {
    MovieForm,
    Loader,
    Layout,
  },
  computed: {
    ...mapGetters({
      loading: 'movieLoading',
      movie: 'movie',
    }),
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
    this.$store.dispatch('loadMovie', this.id);
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
