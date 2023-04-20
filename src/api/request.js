import axios from "axios";

let baseURL=process.env.NODE_ENV === 'production'?'':'http://localhost:8080/api'
const request=axios.create({
    timeout:5000,
    baseURL
})

export default request