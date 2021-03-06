import { API_URL } from "src/utils/constants"
import UserService from "../Profile/user.service"
const userService = new UserService()


export default class LabelService {
  async addLabel(label) {
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/labels`
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
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

  async updateLabel(label) {
    const token = userService.getToken()
    try {
      const url = `${API_URL}/administration/labels/` + label.id
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
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

  async listAllLabels() {
    try {
      const url = `${API_URL}/public/labels`
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params)
      return response.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async showLabel(id) {
    try {
      const url = `${API_URL}/public/labels/${id}`
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params)
      if(response.status === 200){
        return response.json()
      } else{
        return false
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async getLabelsByEventId(eventId){
    try {
      const url = `${API_URL}/public/labels/event/${eventId}`
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Accepts: "application/json",
        },
      };
      const response = await fetch(url, params)
      return response.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async removeLabel(label) {
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/labels`
      const params = {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
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

  async searchLabelByName(label) {
    try {
      const url = `${API_URL}/public/administration/labels/search/by-name`
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
      };
      const response = await fetch(url, params)
      return response.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }


}
