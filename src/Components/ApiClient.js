import axios from "axios";


const apiCLient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) =>{
    apiCLient.interceptors.request.use(async function(config) {
        config.headers.Authorization = "Bearer " + token;
        return config;
    })
}



export default apiCLient;