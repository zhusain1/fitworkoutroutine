import axios from "axios";

let headers = {
    'Content-Type':'application/json'
}

let apiVideo = axios.create({
    baseURL: 'http://localhost:3002/',
    headers: headers
})

apiVideo.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');

        if (token) {
        config.headers = {
            'token': token,
            'Content-Type':'application/json'
        }
        } else{
        config.headers = {
            'Content-Type':'application/json'
        }
        }

        console.log(config);
        return config;
    },
);
  

export default apiVideo;