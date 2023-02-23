import axios from 'axios'




export default axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID L2PgFMG7nPR3OnkjEyMMr93iK2CDfmCeEc15OEhMJ2I',
  },
});
