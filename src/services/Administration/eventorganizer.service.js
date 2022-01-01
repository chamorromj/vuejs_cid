import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";

export default class EventOrganizerService {
  async addEventOrganizer(organizer) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/eventorganizers`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizer),
      };
      const response = await fetch(url, params)
      return response.ok
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateEventOrganizer(organizer) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/eventorganizers/` + organizer.id;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizer),
      };
      const response = await fetch(url, params);
      return response.ok
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async listAllEventOrganizers() {
    try {
      const url = `${API_URL}/public/administration/eventorganizers`;
      const params = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getEventOrganizerNameById(idEventOrganizer) {
    try {
      const url = `${API_URL}/public/administration/eventorganizer/${idEventOrganizer}`;
      const params = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result.name;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getEventOrganizerById(idEventOrganizer) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/public/administration/eventorganizer/${idEventOrganizer}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getEventOrganizersByAdministrator(idAdministrator){
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/eventorganizers/user/${idAdministrator}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        },
      };
      const response = await fetch(url, params);
      console.log(response)
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  showEventOrganizer(nameOrganizer) {
    return null;
  }
}
