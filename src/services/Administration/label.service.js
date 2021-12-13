import { API_URL } from "../../utils/constants";
import UserService from "../ProfileModule/user.service";

export default class LabelService {
  async addLabel(label) {
      return null;
    }

  async updateLabel(label){
      return null;
    }



  async listAllLabels() {
    try {
      const url = `${API_URL}/public/labels`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      };
      const response = await fetch(url, params);
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeLabel(label) {
    return null;
  }

  async showLabel(nameLabel) {
    return null;
  }

  async searchEventByLabel(label) {
    try {
      const url = `${API_URL}/public/administration/labels/search/by-name`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
      };
      const response = await fetch(url, params);
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
