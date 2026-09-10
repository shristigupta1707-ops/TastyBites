import axios from "axios";

// Create one Axios instance for our backend
const api = axios.create({
    baseURL: "https://tastybites-backend-48or.onrender.com"
});

export default api;