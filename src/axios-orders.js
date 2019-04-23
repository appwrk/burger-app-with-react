import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e8a39.firebaseio.com/'
});

export default instance;