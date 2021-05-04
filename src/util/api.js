import axios from "axios";

let uri = 'http://localhost:8080/';
let headers = {
    'Content-Type':'application/json'
}

export default axios.create({
    baseURL: uri,
    heaaders: headers
})
