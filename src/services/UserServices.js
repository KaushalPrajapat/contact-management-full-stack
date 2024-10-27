import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8080/api/v1";

  static async login(email, password) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/user/sign-in`, {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async secured(token) {
    try {
      const response = await axios.get(`${UserService.BASE_URL}/test/secured`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
