import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";
import {useStore} from "vuex";
const userService = new UserService()


const store = useStore()

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
      const response = await fetch(url, params)
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findEventsByName(text) {
    if(text.length>0 && text.trim() !== ''){
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
        return response.json();
      } catch (error) {
        console.log(error);
        return null;
      }
    } else{
      return false
    }
  }

  async getEventById(eventId) {
    try {
      let url = "";
      if(typeof(eventId) !== 'undefined') {
        url = `${API_URL}/public/events/${eventId}`
      } else {
        return false
      }
      const params = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(url, params);
      if(response.status === 200){
        return response.json()
      } else{
        return false
      }
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
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async orderEvent(order) {
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
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.json()
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async getEventsByAdministratorEventOrganizers(organizerId){
    const token = userService.getToken();

    try {
      const url = `${API_URL}/administration/events/search/by-event-organizer/${organizerId}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.json()
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }



}
