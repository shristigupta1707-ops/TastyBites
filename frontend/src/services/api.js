import axios from "axios";

// Create one Axios instance for our backend
const api = axios.create({
    baseURL: "http://localhost:5001/api"
});

export default api;