<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper indigo darken-1">
        <span class="brand-logo">Movies App</span>
      </div>
    </nav>
    <div class="section">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
.nav-wrapper {
  padding: 0 1em;
}
.section {
  max-width: 800px;
  padding: 1em;
}
</style>
