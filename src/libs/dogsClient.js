import identity from 'lodash/fp/identity';
import Axios from 'axios';

function addErrorCatching(client) {
  client.interceptors.response.use(identity, error => ({
    error,
  }));
  return client;
}

const dogsClient = Axios.create({
  baseURL: 'https://dog.ceo/api/',
});

export default addErrorCatching(dogsClient);
