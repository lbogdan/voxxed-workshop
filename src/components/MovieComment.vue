<template>
  <div v-if="editing" class="comment">
    <div class="input-field">
      <textarea v-model="comment" class="materialize-textarea"></textarea>
      <label>Comment</label>
      <div :class="[`wordcount${wordCount > 0 ? '--valid' : ''}`]">
        {{ wordCount }} word(s)
      </div>
    </div>
    <button
      class="btn-flat"
      :disabled="wordCount === 0"
      @click="editing = false"
    >
      Save comment
    </button>
  </div>
  <div v-else class="comment comment--saved">
    <span>
      {{ wordCount ? 'Comment:' : 'No comment yet.' }}
    </span>
    <p>
      {{ comment }}
    </p>
    <button class="btn-flat" @click="editing = true">Edit comment</button>
  </div>
</template>

<script>
export default {
  name: 'movie-comment',
  data() {
    return {
      comment: '',
      editing: false,
    };
  },
  computed: {
    wordCount() {
      return this.comment.split(/\s+/).filter(word => word !== '').length;
    },
  },
};
</script>

<style>
.comment {
  margin: 0.75em 0;
}
.comment span {
  font-weight: bold;
}
.wordcount {
  color: firebrick;
}
.wordcount--valid {
  color: lightseagreen;
}
</style>
