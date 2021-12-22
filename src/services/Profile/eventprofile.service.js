import { API_URL } from "../../utils/constants";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
import UserService from ".//user.service";
import EventService from "../Event/event.service";
import EventOrganizerService from "src/services/Administration/eventorganizer.service";
import CategoryService from "src/services/Administration/category.service";
import axios from "axios";

export default class EventProfileService {
  async addEvent(event) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/events`;
      const params = {
        method: "POST",
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

  async uploadPicture(eventId, file) {
    let token = localStorage.getItem('token')
    let formData = new FormData();
    let authorization = "Bearer " + token
    formData.append('file', file);
    console.log(file)
    let urlPic = "http://localhost:8080/api/v1/public/administration/events/" + eventId
    await axios.post(urlPic,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': authorization
        }
      }
    )
  }

  async updateEvent(event) {
    console.log(event)
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/events/${event.id}`;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
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

  async showEvent(idEvent) {
    const store = useStore();
      const eventService = new EventService();
      const event = await eventService.getEventById(idEvent);
      if (event){
        const eventOrganizerService = new EventOrganizerService();
        const categoryService = new CategoryService();
        event.categoryName = await categoryService.getCategoryNameById(event.categoryId);
        event.organizerName = await eventOrganizerService.getEventOrganizerNameById(event.eventOrganizerId);

        store.commit("event/setEvent", event);
      }
      return event;

  }

  async addCategoryToEvent(eventId, categoryId) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/events/${eventId}/category/${categoryId}`;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await fetch(url, params);
      return {ok:true};
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeCategoryFromEvent(eventId, categoryId) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/events/${eventId}/category/${categoryId}`;
      const params = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        }
      };
      await fetch(url, params);
      return {ok:true};
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addLabelToEvent(event, label) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/events/${event}/label/${label}`;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await fetch(url, params);
      return 1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async removeLabelFromEvent(event, label) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/events/${event}/label/${label}`;
      const params = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      await fetch(url, params);
      return 1;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
