import UserService from "src/services/Profile/user.service";
import MediaService from "src/services/Media/media.service";
import jwtDecode from "jwt-decode";
import { date,Notify } from 'quasar'

const userService = new UserService();
const mediaService = new MediaService();

export async function createUser({ commit }, userData) {
  try {
    const user = await userService.registerUser(userData);
    if (!user){
      return false
    } else{
      const userToLogin = {
        username: userData.username,
        password: userData.password,
      };
      const { token } = await userService.login(userToLogin);
      delete user.password;
      commit("loginUser", { user, token });

      return { ok: true };
    }

  } catch (error) {
    return { ok: false, message: "An error happened" };
  }
}

export async function addFavorite({ commit }, favorite) {
  commit("addFavorite", favorite);
}

export async function addRatting({ commit }, ratting) {
  await mediaService.addRating(ratting);
  commit("addRatting", ratting);
}

export async function updateUser({ commit }, userData) {
  try {
    await userService.updateUser(userData);
    commit("updateUser", userData);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function signInUser({ commit }, userData) {
  try {
    const { token, userId } = await userService.login(userData);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    const user = await userService.getUserById(userId);

    commit("loginUser", {user, token});

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function checkAuthentication({ commit }) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if ((!token) || (!userId) || isNaN(parseInt(userId))) {
    console.log("No valid user information");
    commit("logout");
    return { ok: false, message: "No valid user information" };
  }

  const {exp} = jwtDecode(token);
  if (date.getMaxDate(exp, Date.now()) === exp){
    Notify.create({
      type: 'warning', message: 'The time of connection has expired'
    })
    commit("logout")
    location.reload()
  }
  console.log("User Info OK");
  try {
    const user = await userService.getUserById(userId);
    commit("loginUser", { user, token });
    return { ok: true };
  } catch (error) {
    console.log("logging out")
    commit("logout")
    return { ok: false, message: 'The server returned an error' };
  }
}

export async function refreshLogin({commit, dispatch, getters}){
  let formData = getters["getDataToLogin"]
  dispatch("signInUser",formData)
}
