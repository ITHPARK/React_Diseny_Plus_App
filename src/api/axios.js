import axios from 'axios';

const isntance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "b4d67c308521168b41c0169c5f7084ea",
        language: "ko-KR",
    }
})

export default isntance;