import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";

export default class AdministratorService {
  async addAdministrator(administrator) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/administrators`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(administrator),
      };
      const response = await fetch(url, params);
      return response.ok
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async listAllAdministrators() {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/administrators`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(url, params);
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateAdministrator(administrator) {
    console.log(administrator)
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url =
        `${API_URL}/administration/administrators/` + administrator.id;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(administrator),
      };
      const response = await fetch(url, params);
      return response.ok;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async showAdministrator(administrator) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const response = await fetch(
        `${API_URL}/administration/administrators/${administrator.id}`
      );
      const result = await response.json();
      return result[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async assignAdministratorToEventOrganizer(administratorId, organizerId) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url =
        `${API_URL}/administration/administrator/${administratorId}/eventorganizers/${organizerId}`
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(url, params)
      console.log(response)
      return response.ok
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
