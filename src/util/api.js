import axios from "axios";

let uri = 'http://localhost:8080/';
let headers = {};

const api = axios.create({
    baseUrl: uri,
    heaaders
})