import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList: [], // list of ids
    movies: {}, // id: movie
    loaded: false,
    moviesLoading: false,
  },

  getters: {
    movies: state => state.movieList.map(id => state.movies[id]),
    moviesLoading: state => state.moviesLoading,
  },

  mutations: {
    setMoviesLoading(state, loading) {
      state.moviesLoading = loading;
    },
    setMovies(state, movies) {
      for (let movie of movies) {
        const { id } = movie;
        state.movieList.push(id);
        state.movies[id] = movie;
      }
      state.loaded = true;
    },
  },

  actions: {
    async loadMovies({ commit, state }) {
      if (!state.loaded) {
        commit('setMoviesLoading', true);
        const movies = await api.getMovies();
        commit('setMovies', movies);
        commit('setMoviesLoading', false);
      }
    },
  },
});
