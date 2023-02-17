import axios from 'axios'

export const searchPixabay = (term) => {
  axios.get(`https://pixabay.com/api/?key=33302691-e457ebbb76777606d0bed289e&q=${term}&image_type=photo`)
    .then((response) => {
      setResults(response.data.hits);
    })
    .catch((error) => {
      console.log(error);
    });
}
