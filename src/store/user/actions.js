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
      }
      const { token } = await userService.login(userToLogin)
      delete user.password;
      commit("loginUser", { user, token });

      return { ok: true };
    }
  } catch (error) {
    return { ok: false, message: "An error happened" };
  }
}

export async function addFavorite({ commit }, favorite) {
  commit("addFav", favorite);
  return {ok:true}
}

export async function addRatting({ commit }, ratting) {
  await mediaService.addRating(ratting);
  commit("addRatting", ratting);
}

export async function updateUser({ commit }, userData) {
  try {
    const ok = await userService.updateUser(userData)
    if(ok){
      commit("userUpdate", userData)
    }
    return ok
  } catch (error) {
    return {ok: false}
  }
}

export async function signInUser({ commit }, userData) {
  try {
    const data = await userService.login(userData)
    if (!data.userId){
      return false
    }

    const token = data.token
    const userId = data.userId
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)

    const user = await userService.getUserById(userId)

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
  try {
    const user = await userService.getUserById(userId);
    if(!user){
      commit("logout")
      location.replace("/")
    }
    commit("loginUser", { user, token });
    return { ok: true };
  } catch (error) {
    commit("logout")
    return { ok: false, message: 'The server returned an error' };
  }
}



