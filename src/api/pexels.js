import axios from 'axios'




export default axios.create({
  baseURL: 'https://api.pexels.com',
  headers: {
    Authorization: 'YRr0n4eVPr2Rmp6kl4blVj9q92dInLswwNX9QpIhInt7cfzJILRdeeOI',
  },
});
