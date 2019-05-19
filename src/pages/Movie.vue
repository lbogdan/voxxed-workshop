<template>
  <div>Movie #{{ id }} page.</div>
</template>

<script>
export default {
  name: 'movie',
  props: {
    id: {
      type: [Number, String],
    },
  },
};
</script>
