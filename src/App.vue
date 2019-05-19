<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper indigo darken-1">
        <span class="brand-logo">Movies App</span>
      </div>
    </nav>
    <div class="section">
      <movie-card :movie="movie" />
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
  data() {
    return {
      movie: {
        title: 'Star Wars: The Last Jedi',
        year: 2017,
        genre: 'Action, Adventure, Fantasy ',
        plot:
          'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.',
        poster:
          'https://images-na.ssl-images-amazon.com/images/I/51poKKV63GL.jpg',
      },
    };
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
