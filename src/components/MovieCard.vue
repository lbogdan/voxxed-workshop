<template>
  <div class="card horizontal row">
    <div class="card-image col s3">
      <img :src="movie.poster" />
    </div>
    <div class="card-stacked col s9">
      <div class="card-content">
        <div class="card-header">
          <div class="card-title">
            {{ movie.title }}
            <span class="year">({{ movie.year }})</span>
          </div>
          <span class="genre">{{ movie.genre }}</span>
        </div>
        <p>{{ movie.plot }}</p>
        <movie-comment
          :comment="movie.comment"
          @update="$emit('update', { ...movie, comment: $event })"
        />
        <div class="card-action">
          <router-link
            :to="{ name: 'movie', params: { id: movie.id } }"
            class="btn indigo accent-2"
            >Edit movie</router-link
          >&#8203;
          <button class="btn deep-orange" disabled>Delete movie</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieComment from '@/components/MovieComment.vue';

export default {
  name: 'movie-card',
  components: {
    MovieComment,
  },
  props: {
    movie: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style>
.card {
  padding: 0.75em 0.25em;
}
.card .card-content {
  padding: 0.5em;
}
.card .card-content p {
  margin: 1em 0;
}
.card .card-content .card-title {
  margin-bottom: 0;
}
.card .card-content .card-header {
  border-bottom: 1px solid lightgray;
  margin-bottom: 1em;
}
.year {
  font-size: 0.75em;
}
.genre {
  display: block;
  font-size: 1em;
}
</style>
