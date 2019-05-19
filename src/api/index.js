import axios from 'axios';

const apiBaseURL = 'https://lpykmjrl9l.sse.codesandbox.io';

export async function getMovies() {
  return (await axios.get(`${apiBaseURL}/movies`)).data;
}

export function updateMovie(movie) {
  return axios.put(`${apiBaseURL}/movies/${movie.id}`, movie);
}

export async function getMovie(id) {
  return (await axios.get(`${apiBaseURL}/movies/${id}`)).data;
}

export async function createMovie(movie) {
  return axios.post(`${apiBaseURL}/movies`, movie);
}

export async function deleteMovie(movie) {
  return axios.delete(`${apiBaseURL}/movies/${movie.id}`);
}
