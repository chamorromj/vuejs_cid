import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";

import {useStore} from "vuex";
const userService = new UserService()


const store = useStore()

export default class AdministratorService {
  async addAdministrator(administrator) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/administrators`
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(administrator),
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

  async listAllAdministrators() {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/administrators`
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
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

  async updateAdministrator(administrator) {
    const token = userService.getToken()

    try {
      const url =
        `${API_URL}/administration/administrators/` + administrator.id
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(administrator),
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

  async showAdministrator(administrator) {
    try {
      const response = await fetch(
        `${API_URL}/administration/administrators/${administrator.id}`
      );
      const result = await response.json()
      return result[0]
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async assignAdministratorToEventOrganizer(administratorId, organizerId) {
    const token = userService.getToken()

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
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
