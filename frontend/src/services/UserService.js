import axios from 'axios';

const API = "http://localhost:8080";

class UserService {

    register(data){
        return axios.post(`${API}/register`, data);
    }

    loginPerSesion(data){
        return axios.post(`${API}/loginPerSesion`, data);
    }

    loginPerWeek(data){
        return axios.post(`${API}/loginPerWeek`, data);
    }

}

export default new UserService();