import { API_URL } from "src/utils/constants";

export default class CategoryService {

    async addCategory(category){
        return null;
    }

    async listAllCategories(){
        try {
            const url = `${API_URL}/administration/categories`;
            const params = {
              method: "GET",
              mode: "cors"
            };
            const response = await fetch(url, params);
            const result = await response.json();
            return result;
          } catch (error) {
            console.log(error);
            return null;
          }
        }
    
    

    async updateCategory(category){
        return null;
    }

    async showCategory(category){
        return null;
    }


}