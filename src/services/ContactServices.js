import axios from "axios";

class ContactServices {
  static BASE_URL = "http://localhost:8080/api/v1/contact";
  static async addContact(token, firstName, lastName, phone, email, comment) {
    console.log(firstName + "User from service");
    console.log(token + "Token");
    try {
      const response = await axios.post(
        `${ContactServices.BASE_URL}/save-contact`,
        {
          firstName,
          lastName,
          email,
          phone,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async allContacts(token,pageNumber) {
    // console.log(token + "Token");
    console.log(pageNumber + " page Number ")
    if(pageNumber < 0) pageNumber = 0;
    try {
      const response = await axios.get(
        `${ContactServices.BASE_URL}/contacts?pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  static async getContactById(token,cid) {
    console.log(cid);
    
    try {
      const response = await axios.get(
        `${ContactServices.BASE_URL}/contact/${cid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateContact(token, firstName, lastName, phone, email, comment,contact_id) {
    try {
      const response = await axios.put(
        `${ContactServices.BASE_URL}/update-contact/${contact_id}`,
        {
          firstName,
          lastName,
          phone,
          email,
          comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteContact(token, contact_id){
    try {
      console.log(token + " - " + contact_id);
      const response = await axios.delete(`${ContactServices.BASE_URL}/delete-contact/${contact_id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      )
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

}

export default ContactServices;
