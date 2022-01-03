import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";

const userService = new UserService()



export default class OrderService {
  async showOrder(orderId) {
    return null;
  }

  async addOrder(order) {
    const token = userService.getToken();

    try {
      const url = `${API_URL}/orders/order`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };
      const response = await fetch(url, params)
      if (response.status === 204){
        return false
      }
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      return response.json()
    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async listOrdersByUser(user) {
    const token = userService.getToken();

    try {
      const url = `${API_URL}/orders/search/by-email`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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
