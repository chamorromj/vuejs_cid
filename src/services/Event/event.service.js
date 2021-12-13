import { API_URL } from "../../utils/constants";
import UserService from "src/services/Profile/user.service";

export default class EventService {
  async listAllEvents() {
      return null;
  }

  async findEventsByLabel(label) {
    return null;
}

  async findEventsByName(text) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const event = {
        name: text,
      };
      console.log(event);
      const url = `${API_URL}/events/search/by-name`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      };
      const response = await fetch(url, params);
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getEventById(eventId) {
    return null;
}

  async findEventsByLabel(label) {
    return null;
}

  async findEventsByCategory(categoryId) {
    return null;
}

  async showEvent(eventId) {
    return null;
  }

  async orderEvent(order) {
    return null;
}
}
