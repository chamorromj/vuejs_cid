import { API_URL } from "../../utils/constants";
import { useStore } from "vuex";
import { computed } from "vue";

export default class UserService {
  async registerUser(formData) {
    try {
      const url = `${API_URL}/users`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUser(user) {
    try {
      const url = `${API_URL}/users/` + user.id;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async showUser() {
    const store = useStore();
    return computed(() => store.getters["user/getUser"]);
  }

  async getUserById(id) {
    try {
      const url = `${API_URL}/users/` + id;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  async login(formData) {
    try {
      const url = `${API_URL}/login`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logout() {
    const store = useStore();
    store.commit("user/removeUser");
    this.removeToken();
    return null;
  }

  getUser() {
    const store = useStore();
    return store.getters["user/getUser"];
  }

  setToken(token, user) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}