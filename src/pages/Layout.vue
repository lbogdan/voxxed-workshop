<template>
  <div>
    <nav>
      <div class="nav-wrapper indigo darken-1">
        <span class="brand-logo">Movies App :: <slot name="title"></slot></span>
      </div>
    </nav>
    <div class="section">
      <slot />
    </div>
  </div>
</template>
