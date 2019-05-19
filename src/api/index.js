import axios from 'axios';

const apiBaseURL = 'https://lpykmjrl9l.sse.codesandbox.io';

export async function getMovies() {
  return (await axios.get(`${apiBaseURL}/movies`)).data;
}
