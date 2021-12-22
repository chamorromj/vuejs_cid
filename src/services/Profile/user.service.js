import { API_URL } from "../../utils/constants";
import { useStore } from "vuex";
import { computed } from "vue";

export default class UserService {
  async registerUser(formData) {
    try {
      const url = `${API_URL}/register`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(url, params);
      if(!response.ok){
        return response.ok
      } else{
        return response.json();
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateUser(user) {
    const store = useStore()
    const token = this.getToken();
    try {
      const url = `${API_URL}/users/` + user.id;
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(url, params);
      if(response.status===204){
        await store.dispatch("user/refreshLogin")
      }
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
  // async showUser(id) {
  //   try {
  //     const response = await fetch(`${API_URL}/users/` + id);
  //     const result = await response.json();
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }

  async getUserById(id) {
    const store = useStore();
    const token = this.getToken();
    try {
      const url = `${API_URL}/users/${id}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          Accepts: "application/json"
        },
      };
      const response = await fetch(url, params);
      if(response.status===204){
        await store.dispatch("user/refreshLogin")
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  async getLanguages(){
    try {
      const url = `${API_URL}/public/administration/languages`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json"
        },
      };
      const response = await fetch(url, params);
      return response.json();
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
      return response.json();
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
    console.log("Setting token");
    console.log(token);
    console.log(user);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user);
  }

  getToken() {
    let token = localStorage.getItem("token");
    return token;
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}
