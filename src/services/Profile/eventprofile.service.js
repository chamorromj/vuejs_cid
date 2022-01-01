import { API_URL } from "src/utils/constants"
import UserService from "../Profile/user.service"
import EventService from "../Event/event.service"
import axios from "axios"
import {useStore} from "vuex"
const userService = new UserService()


const store = useStore()

export default class EventProfileService {
  async addEvent(event) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/events`
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async uploadPicture(eventId, file) {
    const token = userService.getToken()

    let formData = new FormData()
    let authorization = "Bearer " + token
    formData.append('file', file)
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
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/events/${event.id}`
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async showEvent(idEvent) {
      const eventService = new EventService()
      const event = await eventService.getEventById(idEvent)
      return event

  }

  async addCategoryToEvent(eventId, categoryId) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/events/${eventId}/category/${categoryId}`
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return {ok:true}
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async removeCategoryFromEvent(eventId, categoryId) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/events/${eventId}/category/${categoryId}`
      const params = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        }
      }
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return {ok:true}
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async addLabelToEvent(event, label) {
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
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async removeLabelFromEvent(event, label) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/events/${event}/label/${label}`
      const params = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }
}
