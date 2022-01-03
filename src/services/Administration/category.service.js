import { API_URL } from "src/utils/constants"
import UserService from "../Profile/user.service"
const userService = new UserService()


export default class CategoryService {
  async addCategory(category) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/categories`
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
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

  async listAllCategories() {
    try {
      const url = `${API_URL}/public/categories`
      const params = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(url, params)
      return response.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getCategoryById(idCategory) {
    try {
      const url = `${API_URL}/public/categories/${idCategory}`
      const params = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(url, params)
      return response.json()
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateCategory(category) {
    const token = userService.getToken()

    try {
      const url = `${API_URL}/administration/categories/` + category.id
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
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
