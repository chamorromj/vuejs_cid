import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";

const userService = new UserService();
const token = userService.getToken();

export default class MediaService {
  async sendComment(comment) {
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
      const response = await fetch(url, params);
      return {ok:true};
    } catch (error) {
      console.log(error);
      return null;
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
      const response = await fetch(url, params);
      console.log(response)

      const result = response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addRating(rating) {
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
      const response = await fetch(url, params)
      console.log(response)
      return response.ok
    } catch (error) {
      console.log(error);
      return null;
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
    const userService = new UserService();
    const token = userService.getToken();
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
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  async listAllFavoritesByUser(userId) {
    const userService = new UserService();
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
      const response = await fetch(url, params);
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
