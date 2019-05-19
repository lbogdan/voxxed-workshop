<template>
  <div v-if="editing" class="comment">
    <div class="input-field">
      <textarea v-model="localComment" class="materialize-textarea"></textarea>
      <label>Comment</label>
      <div :class="[`wordcount${wordCount > 0 ? '--valid' : ''}`]">
        {{ wordCount }} word(s)
      </div>
    </div>
    <button class="btn-flat" :disabled="wordCount === 0" @click="save">
      Save comment
    </button>
  </div>
  <div v-else class="comment comment--saved">
    <span>
      {{ wordCount ? 'Comment:' : 'No comment yet.' }}
    </span>
    <p>
      {{ localComment }}
    </p>
    <button class="btn-flat" @click="editing = true">Edit comment</button>
  </div>
</template>

<script>
export default {
  name: 'movie-comment',
  data() {
    return {
      localComment: this.comment,
      editing: false,
    };
  },
  props: {
    comment: {
      required: true,
      type: String,
    },
  },
  computed: {
    wordCount() {
      return this.localComment.split(/\s+/).filter(word => word !== '').length;
    },
  },
  methods: {
    save() {
      this.$emit('update', this.localComment);
      this.editing = false;
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
