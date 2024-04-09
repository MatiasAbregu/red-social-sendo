import axios from 'axios';

const API = "http://localhost:8080";

class UserService {

    register(data){
        return axios.post(`${API}/register`, data);
    }

    login(data){
        return axios.post(`${API}/login`, data);
    }

}

export default new UserService();