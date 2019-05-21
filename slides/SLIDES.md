## Agenda

- go over 20-something step-by-step commits
- topics:
  - components, state, reactivity, ...
  - routing: `vue-router`
  - state management: `vuex`

```js
let topic = 'Single File Components';

while (stillHaveTimeLeft()) {
  showSlides(topic);
  explainCommits(topic);
  topic = nextTopic(topic);
}
```

- 15m coffee break when you get bored

## Why Vue.js?

- makes simple things look simple, and complex ones look... well, complex
  - & complexity should come from the problem we're solving
  - & usually induced by UI/UX (e.g. confirm() vs. modals)
- & best suited to get into modern frontend development: if you already know HTML, JavaScript & CSS, you know 90% of Vue.js
- & progressive: start with `vue`, add `vue-router`, `vuex`, TypeScript etc. as needed
- & top-notch documentation
- & **awesome community!**
- & core tools (and libraries ^^) maintained by core team: Vue CLI, Vue.js devtools
- & slowly, but surely gaining traction

## [Vue CLI](https://cli.vuejs.org/)

- install:

```plaintext
npm -g install @vue/cli
```

- create a project:

```plaintext
vue create movie-app
```

- modular, plugin-based architecture
- uses webpack under the hood
- even has an UI!

## Application Structure

```plaintext
root
┣━ public
┃  ┗━ index.html
┗━ src
   ┣━ components
   ┃  ┗━ MovieCard.vue
   ┣━ App.vue
   ┗━ main.js
```

## Components

- tree hierarchy
- there's a root, "invisible" Vue component instance created in `main.js`, that usually renders an `App` component
- child to parent communication: props down, events up

![](https://cdn-images-1.medium.com/max/1200/0*Xzkw0-T4Uea3d5Yh.png)

## SFCs - Single File Components

```html
<template>
  <!-- "just" HTML -->
</template>

<script>
  // just JavaScript
</script>

<style>
  /* just CSS */
</style>
```

## `<template>`

- "just" HTML
- interpolations `{{ }}`
- `v-` directives: `v-bind`, `v-on`, `v-if`, `v-else`, `v-model`, `v-for`, `v-slot`, ...
- registered components are used as custom DOM elements
- expressions are evaluated in the component's instance context, no access to globals (e.g. `window`)
- currently only supports a single root element 🤨

## `<script>`

- exports the component object definition

```html
<script>
  export default {
    name: 'component-name', // optional
    components: { /* register local components */ },
    data() { // internal state, ES6 shorthand for "data: function() {"
      return {
        counter: 0,
      },
    },
    props: { /* external state */ },
    computed: { /* derived state */ },
    created() { /* lifecycle hook */ },
    methods: { /* ... */ },
    render() { /* optional render method */ },
  }
</script>
```

## Component Object Definition (cont.)

- it has a completely different "schema" than component instances
- if the component has a `<template>`, it's compiled to a `render()` method

## Local Component Registration

- register `MovieCard` in `App.vue`:

```html
<script>
  import MovieCard from './components/MovieCard.vue';

  export default {
    name: 'app',
    components: {
      MovieCard, // ES6 shorthand for "MovieComponent: MovieComponent"
    },
  };
</script>
```

## Component Registration (cont.)

- use in `App.vue`:

```html
<template>
  <div>
    <movie-card />
    <!-- CamelCase also works, but keep it consistent! -->
    <MovieCard />
  </div>
</template>
```

## Demo :: Step 1

## State

- 3 types, all share the same "namespace"
  - internal - `data()`
  - external - `props`
  - derived - `computed`
- proxied and accessible on `this`

## State / internal :: `data()`

- define in `MovieCard.vue`:

```js
export default {
  name: 'movie-card',
  data() {
    return {
      title: 'Star Wars: The Last Jedi',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BM...',
    };
  },
};
```

- `data` is a function returning an object so that each component instance has its own state
- **always** use a function for `data`!
- **better yet**, use `eslint` and [Vue's eslint plugin](https://eslint.vuejs.org/)!

## State / internal :: `data()` (cont.)

- accessible on `this` in `MovieCard.vue` script:

```js
export default {
  /* ... */
  methods: {
    setTitle(newTitle) {
      this.title = newTitle;
    },
  },
};
```

## State :: interpolation `{{ }}` & bindings `v-bind`

- use in `MovieCard.vue` template:

```html
<template>
  <div>
    <div>Title: {{ title }}</div>
    <img v-bind:src="posterUrl" />
    <!-- v-bind shorthand -->
    <img :src="posterUrl" />
  </div>
</template>
```

- can use any JavaScript expression, it's evaluated inside the component's instance context (no need for `this.title`)
- e.g. `{{ title.toUpperCase() }}`

## Reactivity

- **implicit**, just **mutate** the state and the templates will **re-render** to reflect the changes
- implemented using getters and setters (`Proxy` in future 3.0 release)
- generates state dependency graph, tries to keep re-renders at a minimum
- **[caveat](https://vuejs.org/v2/guide/reactivity.html): adding (deleting) a property to (from) an object**

```js
// this.movie = { id: 1, title: 'Black Swan' }
this.movie.year = 2010; // not reactive!
// instead, use one of the following:
this.$set(this.movie, 'year', 2010); // Vue's API
this.movie = Object.assign(this.movie, { year: 2010 }); // ES6
this.movie = { ...this.movie, year: 2010 }; // still ES6
```

- **[caveat](https://vuejs.org/v2/guide/list.html): directly setting an array item**

```js
// this.movies = [{ ... }, { ... }, { ... }]
this.movies[updateIndex] = updatedMovie; // not reactive!
// instead, use one of the following
this.$set(this.movies, updateIndex, updatedMovie); // Vue's API
this.movies.splice(updateIndex, 1, updatedMovie); // ES5
```

## Demo :: Step 2

## State / external :: `props`

- define in `MovieComponent.vue`:

```html
<script>
  export default {
    /* ... */
    props: {
      movie: {
        required: true,
        type: Object,
      },
    },
  };
</script>
```

## State / external :: `props` (cont.)

- send (from `App.vue`):

```html
<template>
  <div>
    <movie-card :movie="movie" />
  </div>
</template>

<script>
import MovieCard from './components/MovieCard.vue';

export default {
  components: { MovieCard },
  data() {
    return {
      movie: { title: '...', posterUrl: '...' }
    };
  },
};
```

## Demo :: Step 3

## Conditional Rendering :: `v-if` & `v-else`

```html
<template>
  <div>
    <div v-if="loading">Loading movie...</div>
    <movie-card v-else :movie="movie" />
  </div>
</template>

<script>
  export default {
    data() {
      return { loading: false, movie: null };
    },
    created() {
      // lifecycle hook
      this.loading = true;
      axios.get('...movie API endpoint...').then(res => {
        this.movie = res.data;
        this.loading = false;
      });
    },
  };
</script>
```

- like with binds, the `v-if` condition can be any JavaScript expression

# DOM event handling :: `v-on` & `methods`

```html
<template>
  <div>
    <!-- use method name -->
    <button v-on:click="open">Open</button>
    <!-- use shorthand & inline handler -->
    <button @click="editing = true">Edit</button>
  </div>
</template>

<script>
  export default {
    /* ... */
    methods: {
      open(e) {
        // e is the DOM event object
      },
    },
  };
</script>
```

## Two-Way Binding :: `v-model`

- used to keep DOM form elements in sync with state

```html
<template>
  <div>
    <input v-model="comment" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        comment: '',
      };
    },
  };
</script>
```

## Demo :: Step 4

## State / derived :: `computed`

- only depends on other existing state
- defined as a method that takes no arguments and returns the derived value

```html
<template>
  <div>{{ fullName }}</div>
</template>

<script>
  export default {
    data() {
      return { title: 'Sir', firstName: 'Tyler', lastName: 'Durden' };
    },
    computed: {
      fullName() {
        return `${this.title} ${this.firstName} ${this.lastName}`; // ES6 template literal
        // will render "Sir Tyler Durden"
      },
    },
  };
</script>
```

- if you need arguments, use a `method` instead

## Class Binding :: `:class`

- **array** of class names, adds all

```html
<template>
  <div :class="[error ? 'text-error' : 'text-success']">
    Some message
  </div>
</template>

<script>
  export default {
    data() {
      return { error: false };
      // will render "<div class="text-success">"
    },
  };
</script>
```

## Class Binding :: `:class` (alt.)

- **object** of `className: bool_expression`, add class names which `bool_expression` evaluates to `true`

```html
<template>
  <div :class="{ 'text-error': error, 'text-success': !error }">
    Some message
  </div>
</template>

<script>
  export default {
    data() {
      return { error: true };
      // will render "<div class="text-error">"
    },
  };
</script>
```

## Bonus :: Formatters Pattern

- define:

```js
// in formatters.js
export function wordalize(count) {
  return `${count} word${count !== 1 ? 's' : ''}`;
}
```

- use:

```html
<template>
  <div>{{ wordalize(count) }}</div>
</template>

<script>
  import { wordalize } from 'path/to/formatters';

  export default {
    data() {
      return { count: 1 };
    },
    methods: { wordalize },
  };
</script>
```

## Demo :: Step 5 & 6

## Components Events :: `$emit()`

- emit event to parent:

```html
<template>
  <div>
    <input v-model="comment" />
    <button @click="$emit('save', comment)">Save</button>
  </div>
</template>

<script>
  export default {
    data() {
      return { comment: '' };
    },
  };
</script>
```

- handling components events in the parent is the same as handling DOM events

## Demo :: Step 7

## List Rendering :: `v-for`

```html
<template>
  <div>
    <movie-card v-for="movie in movies" :movie="movie" :key="movie.id" />
  </div>
</template>

<script>
  export default {
    data() {
      return movies: [
        { id: 1, title: 'Black Swan', /* genre, plot, ... */ },
        { id: 2, title: 'Fight Club', /* genre, plot, ... */ },
        /* ...more movies... */
      ]
    }
  }
</script>
```

- `key` should be bound to a unique item identifier, needed for diffing
- **always** have a `:key` in `v-for`!

## Demo :: Steps 8 - 12

## Import Aliases :: `@`

- `@` is an alias for `src`, can be used in absolute paths
- actually handled by webpack

```js
// in App.vue

// path is relative to App.vue, if it moves, path becomes invalid
import MovieCard from './components/MovieCard.vue';

// better: absolute path
import MovieCard from '@/components/MovieCard.vue';
```

## Routing :: `vue-router`

- install:

```
yarn add vue-router
```

- configure:

```js
// src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';

import MovieList from '@/pages/MovieList.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MovieList,
      name: 'home',
    },
  ],
});
```

## Routing :: `vue-router` (cont.)

- use in `main.js`:

```js
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';

new Vue({
  render: h => h(App),
  router, // router: router
}).$mount('#app');
```

## Demo :: Step 14 - 20

## Slots :: default `<slot>`

- like props, but instead of data they send markup
- in parent component `Page.vue`

```html
<template>
  <layout>
    Page contents here.
  </layout>
</template>
```

- in child component `Layout.vue`

```html
<template>
  <div>
    <header>Some header here</header>
    <div class="content">
      <slot />
      <!-- default slot, will render "Page contents here." -->
    </div>
    <footer>A footer</footer>
  </div>
</template>
```

## Named Slots :: `v-slot`

- in parent component `Page.vue`

```html
<template>
  <layout>
    <template v-slot:title>
      Page Title
    </template>
    Page contents here.
  </layout>
</template>
```

- in child component `Layout.vue`

```html
<template>
  <div>
    <header>
      Some header here
      <slot name="title">Default Title</slot>
      <!-- a slot named "title", will render "Page Title" -->
    </header>
    <div class="content">
      <slot />
    </div>
    <footer>A footer</footer>
  </div>
</template>
```

## Demo :: Step 21

## State Management :: `vuex`

- install:

```plaintext
yarn add vuex
```

- configure:

```js
// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    /* ... */
  },
  getters: {
    /* ... */
  },
  mutations: {
    /* ... */
  },
  actions: {
    /* ... */
  },
});
```

## State Management :: `vuex` (cont.)

- use in `main.js`:

```js
import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
```

## State Management :: `state`

- like internal state in components, can be an object

```js
export default new Vuex.Store({
  state: {
    movies: [],
    loadingMovies: false,
  },
});
```

## State management :: `getters`

- sorta like computed properties in components
- defined as a method that receives the state as an argument
- if you want to parametrize, it can return a function

```js
export default new Vuex.Store({
  /* ... */
  getters: {
    movies: state => state.movies,
    movie: state => id => state.movies[id],
  },
});
```

- use it in component

```js
  /* ... */
  computed: {
    movies() { return this.$store.getters.movies },
    movie() { return this.$store.getters.movie(this.id) },
  }
```

## State management :: `mutations`

- the only place where you mutate state
- **must be synchronous!**
- takes as arguments the state and an optional payload

```js
export default new Vuex.Store({
  /* ... */
  mutations: {
    setMovies(state, /* payload */ movies) {
      state.movies = movies;
    },
  },
});
```

## State management :: `actions`

- put all asynchronous logic here
- do async logic, then call a mutation
- takes as arguments the context (`{ state, commit, ... }`) and an optional payload
- try to not rely on the returned value, use a getter instead

```js
export default new Vuex.Store({
  /* ... */
  actions: {
    async getMovies(/* context */ { state, commit }) {
      if (!state.loaded) {
        const movies = await api.getMovies();
        commit('setMovies', movies):
      }
    },
  },
});
```

- use it in component

```js
  /* ... */
  created() {
    this.$store.dispatch('getMovies');
  }
```

## Demo :: Steps 22 - end

## Thank you! 🙏

Q & A
