import { API_URL } from "../../utils/constants";
import UserService from "../Profile/user.service";

export default class CategoryService {
  async addCategory(category) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/categories`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async listAllCategories() {
    try {
      const url = `${API_URL}/public/categories`;
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

  async getCategoryNameById(idCategory) {
    try {
      const url = `${API_URL}/public/categories/${idCategory}`;
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

  async getCategoryById(idCategory) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/public/categories/${idCategory}`;
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

  async updateCategory(category) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/administration/categories/` + category.id;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  showCategory(nameCategory) {
    return null;
  }
}
