import { API_URL } from "../../utils/constants";
import UserService from "../Profile/user.service";

const userService = new UserService();
const token = userService.getToken();

export default class OrderService {
  async showOrder(orderId) {
    return null;
  }

  async listOrders() {
    try {
      const url = `${API_URL}/orders`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
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

  async addOrder(order) {
    const userService = new UserService();
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
      const response = await fetch(url, params);
      console.log(response)
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async listOrdersByUser(userId) {
    const userService = new UserService();
    const token = userService.getToken();
    try {
      const url = `${API_URL}/orders/${userId}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
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
}
