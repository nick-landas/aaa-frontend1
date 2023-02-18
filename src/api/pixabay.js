import axios from 'axios'



// const API_KEY = '33302691-e457ebbb76777606d0bed289e';
// const API_URL = `https://pixabay.com/api/?key=${API_KEY}`;

// export default axios.create(`${API_URL}&q=$`);   

export default axios.create({
  baseURL: 'https://api.pexels.com/v1/',
  headers: {
    Accept: 'application/json',
    Authorization: 'YRr0n4eVPr2Rmp6kl4blVj9q92dInLswwNX9QpIhInt7cfzJILRdeeOI'
  }
});
