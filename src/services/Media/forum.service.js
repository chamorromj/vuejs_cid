import { API_URL } from "src/utils/constants";
import UserService from "../Profile/user.service";
import {useStore} from "vuex";
const userService = new UserService()


const store = useStore()


export default class ForumService {
  async getQuestion(question) {
    try {
      const url = `${API_URL}/public/questions/${question}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
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

  async addResponse(response) {
    const token = userService.getToken();

    try {
      const url = `${API_URL}/responses/response`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      };
      const resp = await fetch(url, params)
      if(response.status === 401){
        return userService.logoutTokenExpired()
      }
      if(!resp.ok){
        return false
      } else{
        return resp.json();
      }


    } catch (error) {
      return userService.logoutTokenExpired()
    }
  }

  async askQuestion(question) {
    try {
      const url = `${API_URL}/public/questions/question`;
      const params = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      };
      const response = await fetch(url, params);
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async listAllQuestions(eventId) {
    try {
      const url = `${API_URL}/public/questions`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      const questions = result.filter((element)=> element.eventId === eventId);
      return questions;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async getResponse(question) {
    try {
      const url = `${API_URL}/public/responses/${question}`;
      const params = {
        method: "GET",
        mode: "cors",
      };
      const response = await fetch(url, params);
      if (response.status === 204){
        return null
      } else{
        return response.json()
      }
    } catch (error) {
      console.log(error)
      return null;
    }
  }


  async listAllQuestionsWithoutAnswerByEvent(eventId){
    try {
      const eventQuestions = await this.listQuestionsByEvent(eventId);
      if(eventQuestions && eventQuestions.length>0) {
        let tempArray = [];
        for await (let question of eventQuestions) {
          let response = await this.getResponse(question.id);
          if (!isNaN(response)){
            tempArray.push(question)
          }
        }
        return tempArray;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async listQuestionsByEvent(eventId){
    try {
      const url = `${API_URL}/public/questions/event/${eventId}`;
      const params = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      if(response.status===204){
        return false
      } else{
        return response.json()
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
