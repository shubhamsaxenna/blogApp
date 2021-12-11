import axios from "axios";

const secureAxious = axios.create({
    baseURL : "http://localhost:8000/"
})


export default secureAxious