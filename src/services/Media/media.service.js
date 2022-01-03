import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";
const userService = new UserService()



export default class MediaService {
  async sendComment(comment) {
    const token = userService.getToken();
    let response = null

    try {
      const url = `${API_URL}/comments/comment`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      };
      response = await fetch(url, params);
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async getCommentsByEventId(eventId) {
    try {
      const url = `${API_URL}/public/comments/event/${eventId}`;
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
      console.log(error);
      return null;
    }
  }

  async getRatingsByUserId(userId) {
    const token = userService.getToken();
    let response = null
    try {
      const url = `${API_URL}/ratings/rating/user/${userId}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          Accepts: "application/json",
        },
      };
      response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.json()
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async addRating(rating) {
    const token = userService.getToken();
    let response = null

    try {
      const url = `${API_URL}/ratings/rating`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
      };
      response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async suggestEvent(suggestion) {
    try {
      const url = `${API_URL}/public/events/suggest`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(suggestion),
      };
      const response = await fetch(url, params);

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addToFavorites(favorite) {
    const token = userService.getToken();
    let response = null

    try {
      const url = `${API_URL}/favorites/favorite`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
      };
      response = await fetch(url, params);
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.ok
    } catch (error) {
      return {ok: false}
    }

  }

  async listAllFavoritesByUser(userId) {
    const token = userService.getToken();

    try {
      const url = `${API_URL}/favorites/user/${userId}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.json();
    } catch (error) {
      return false
    }
  }
}
