import axios from 'axios';

const apiBaseURL = 'https://lpykmjrl9l.sse.codesandbox.io';

export async function getMovies() {
  return (await axios.get(`${apiBaseURL}/movies`)).data;
}

export async function updateMovie(movie) {
  return (await axios.put(`${apiBaseURL}/movies/${movie.id}`, movie)).data;
}

export async function getMovie(id) {
  return (await axios.get(`${apiBaseURL}/movies/${id}`)).data;
}

export async function createMovie(movie) {
  return (await axios.post(`${apiBaseURL}/movies`, movie)).data;
}

export async function deleteMovie(movie) {
  return axios.delete(`${apiBaseURL}/movies/${movie.id}`);
}
