import axios from 'axios';

const apiBaseURL = 'https://lpykmjrl9l.sse.codesandbox.io';

export async function getMovies() {
  return (await axios.get(`${apiBaseURL}/movies`)).data;
}

export function updateMovie(movie) {
  axios.put(`${apiBaseURL}/movies/${movie.id}`, movie);
}
