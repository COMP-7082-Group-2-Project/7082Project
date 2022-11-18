import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: "https://judge0-ce.p.rapidapi.com",
    // baseURL: "http://edicode.westus3.cloudapp.azure.com:2358",
    params: { base64_encoded: "true", fields: "*" },
    headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
    }
})

AxiosInstance.defaults.headers.post['content-Type'] = 'application/json';
AxiosInstance.defaults.headers.post['Content-Type'] = 'application/json';


export default AxiosInstance
