// Basic Means - SignIn, SignUp, Validation services only
// Some Testing services are also here

import axios from "axios";

class BasicServices {
  static BASE_URL = "http://localhost:8080/api/v1";
  static async login(email, password) {
    try {
      const response = await axios.post(
        `${BasicServices.BASE_URL}/user/sign-in`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async forgotPassword(email, password) {
    try {
      const response = await axios.put(
        `${BasicServices.BASE_URL}/user/forgot-password`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getNewCode(email) {
    try {
      console.log(`${BasicServices.BASE_URL}/user/get-new-code/${email}`);
      console.log("Something");
      const response = await axios.post(
        `${BasicServices.BASE_URL}/user/get-new-code/${email}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async signup(firstName, lastName, email, password, phone) {
    console.log(firstName + "User from service");
    try {
      const response = await axios.post(
        `${BasicServices.BASE_URL}/user/sign-up`,
        {
          firstName,
          lastName,
          email,
          password,
          phone,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async secured(token) {
    try {
      const response = await axios.get(
        `${BasicServices.BASE_URL}/test/secured`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async validate(code) {
    try {
      const response = await axios.post(
        `${BasicServices.BASE_URL}/user/validation-user?code=${code}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
}

export default BasicServices;
