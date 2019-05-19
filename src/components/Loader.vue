<template>
  <div class="loader">
    <div class="loader--text">{{ text }}...</div>
    <div class="preloader-wrapper small active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    text: {
      default: 'Loading',
      required: false,
    },
  },
};
</script>

<style>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader--text {
  margin-right: 1em;
}
</style>
