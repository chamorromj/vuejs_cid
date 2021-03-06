import { API_URL } from "src/utils/constants"
import { useStore } from "vuex"
import { computed } from "vue"
import {Notify} from "quasar"

const store = useStore()
export default class UserService {
  async registerUser(formData) {
    try {
      const url = `${API_URL}/register`
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
      const response = await fetch(url, params)
      if(!response.ok){
        return response.ok
      } else{
        return response.json()
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateUser(user) {
    const token = this.getToken()

    try {
      const url = `${API_URL}/users/` + user.id
      const params = {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
      const response = await fetch(url, params)
      if(response.status === 401){
        return this.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async showUser() {
    const store = useStore()
    return computed(() => store.getters["user/getUser"])
  }


  async getUserById(id) {
    const token = this.getToken()

    try {
      const url = `${API_URL}/users/${id}`
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          Accepts: "application/json"
        },
      }
      const response = await fetch(url, params)
      if(response.status===204){
        return {ok:false}
      }
      if(response.status === 401){
        return this.logoutTokenExpired()
      }
      return response.json()
    } catch (error) {
      return this.logoutTokenExpired()
    }
  }

  async getLanguages(){
    try {
      const url = `${API_URL}/public/administration/languages`
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json"
        },
      }
      const response = await fetch(url, params)
      return response.json()
    } catch (error) {
      return error
    }
  }

  async login(formData) {
    try {
      const url = `${API_URL}/login`
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
      const response = await fetch(url, params)

      if(response.status !== 200){
        return {userId:false}
      }
      return response.json()
    } catch (error) {
      console.log(error)
      return {ok:false}
    }
  }



  async logout() {

    store.commit("user/removeUser")
    this.removeToken();
    return null;
  }

  async logoutTokenExpired(){
    if(localStorage.getItem("userId")){
      store.commit("user/removeUser")
    } else{
      await this.logout()
    }
    Notify.create({
      type: 'warning', message: 'The time of connection has expired'
    })
    store.commit("logout")
    return null
  }

  getUser() {
    return store.getters["user/getUser"]
  }


  getToken() {
    return localStorage.getItem("token")
  }

  removeToken() {
    localStorage.removeItem("token")
  }
}
