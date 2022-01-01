import { API_URL } from "src/utils/constants"
import UserService from "../Profile/user.service"
const userService = new UserService()


export default class EventOrganizerService {
  async addEventOrganizer(organizer) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/eventorganizers`
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
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async updateEventOrganizer(organizer) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/eventorganizers/` + organizer.id
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizer),
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

  async listAllEventOrganizers() {
    try {
      const url = `${API_URL}/public/administration/eventorganizers`
      const params = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(url, params)
      const result = await response.json()
      return result;
    } catch (error) {
      console.log(error)
      return null
    }
  }


  async getEventOrganizersByAdministrator(idAdministrator){
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/eventorganizers/user/${idAdministrator}`
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
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
