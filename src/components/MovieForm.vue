<template>
  <div class="card">
    <div class="card-content">
      <form @submit.prevent="$emit('update', localMovie)">
        <span class="card-title">{{ isNew ? 'Add' : 'Edit' }} movie</span>
        <div class="row">
          <div class="col s8">
            <div class="input-field">
              <input
                v-model="localMovie.title"
                type="text"
                class="validate"
                required
              />
              <label>Title *</label>
            </div>
            <div class="input-field">
              <input
                v-model="localMovie.genre"
                type="text"
                class="validate"
                required
              />
              <label>Genre *</label>
            </div>
            <div class="input-field">
              <input
                v-model="localMovie.year"
                type="text"
                class="validate"
                required
              />
              <label>Year *</label>
            </div>
            <div class="input-field">
              <textarea
                v-model="localMovie.plot"
                type="text"
                class="materialize-textarea validate"
                required
              />
              <label>Plot *</label>
            </div>
            <div class="input-field">
              <input v-model="localMovie.poster" type="text" class="validate" />
              <label>Poster URL</label>
            </div>
          </div>
          <div class="col s4">
            <img class="poster" :src="localMovie.poster" />
          </div>
        </div>
        <div class="card-action">
          <button class="btn">{{ isNew ? 'Add' : 'Update' }} movie</button
          >&#8203;
          <a class="btn deep-orange" @click.prevent="$emit('cancel')">Cancel</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'movie-form',
  data() {
    return {
      localMovie: { ...this.movie },
    };
  },
  props: {
    movie: {
      required: true,
      type: Object,
    },
  },
  computed: {
    isNew() {
      return !('id' in this.movie);
    },
  },
};
</script>

<style>
.poster {
  width: 100%;
}
</style>
