import Vue from 'vue';
import Vuex from 'vuex';

import * as api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    movieList: [], // list of ids
    movies: {}, // id: movie
    loaded: false,
    moviesLoading: false,
    movieLoading: false,
  },

  getters: {
    movies: state => state.movieList.map(id => state.movies[id]),
    moviesLoading: state => state.moviesLoading,
    movie: state => id => {
      if (id === 'new') {
        return {
          title: '',
          year: '',
          genre: '',
          plot: '',
          poster: '',
          comment: '',
        };
      }
      return state.movies[id];
    },
    movieLoading: state => state.movieLoading,
  },

  mutations: {
    setMoviesLoading(state, loading) {
      state.moviesLoading = loading;
    },
    setMovies(state, movies) {
      for (let movie of movies) {
        const { id } = movie;
        state.movieList.push(id);
        // state.movies[id] = movie !!!not reactive!!!
        state.movies = { ...state.movies, [id]: movie };
      }
      state.loaded = true;
    },
    setMovieLoading(state, loading) {
      state.movieLoading = loading;
    },
    setMovie(state, movie) {
      // state.movies[movie.id] = movie !!!not reactive!!!
      state.movies = { ...state.movies, [movie.id]: movie };
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
    async loadMovie({ commit, state }, id) {
      if (id !== 'new' && !(id in state.movies)) {
        commit('setMovieLoading', true);
        const movie = await api.getMovie(id);
        commit('setMovie', movie);
        commit('setMovieLoading', false);
      }
    },
  },
});
