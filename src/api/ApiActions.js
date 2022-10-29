import AxiosInstance from "../assets/Axios/AxiosInstance";


export const getCodeToken = (formData) => {
    return AxiosInstance.post("/submissions", formData)
        .then(res => res.data.token)
}

export const getCodeOutput = (token) => {
    return AxiosInstance.get(`/submissions/${token}`)
        .then(res => res.data)
}