import { API_URL } from "../../utils/constants";
import { date } from 'quasar'
import { useStore } from "vuex";
import UserService from "../Profile/user.service";

export default class EventService {
  async listAllEvents() {
    try {
      const url = `${API_URL}/public/events`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findEventsByLabel(label) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/public/events/search/by-label`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
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

  async findEventsByName(text) {
    try {
      const event = {
        name: text,
      };
      const url = `${API_URL}/public/events/search/by-name`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getEventById(eventId) {
    try {
      const url = `${API_URL}/public/events/${eventId}`;
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


  async findEventsByLabel(label) {
  try {
    const url = `${API_URL}/public/events/search/by-label`;
    const params = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(label),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
  }

  async findEventsByCategory(categoryId) {
    try {
      let url = "";
      if(typeof(categoryId) !== 'undefined') {
        url = `${API_URL}/public/events/search/by-category/${categoryId}`;
      } else {
        url = `${API_URL}/public/events`;
      }


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

  async showEvent(eventId) {
    return null;
  }

  async orderEvent(order) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/orders`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
