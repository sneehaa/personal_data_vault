// importing axios
import axios from "axios";

// Creating Axios instance
const Api = axios.create({
    baseURL: "http://localhost:5500",
    withCredentials: true,
});

// configuration for axios
const config = {
    headers :{
        "Content-Type": "multipart/form-data",
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}

// Creating test API
export const testApi = () => Api.get("/test");

// Creating register API
export const registerApi = (data) => Api.post("/api/user/register", data);

// Creating login API
export const loginApi = (data) => Api.post("/api/user/login", data);

export const getUserProfileApi = (userId) => Api.get(`/api/user/profile/${userId}`);

export const verifyEmailApi = (token) => Api.get(`/verify-email/${token}`);

// Creating add data API
export const addDataApi = (data) => Api.post("/api/data/add", data, config);

// Creating view data API
export const viewDataApi = () => Api.get("/api/data/view", config);


export default Api;