import UserService from "src/services/Profile/user.service";

const userService = new UserService();

export async function addFavorite({ commit }, favorite) {

}

export async function addRatting({ commit }, ratting) {

}

export async function createUser({ commit }, userData) {
  try {
    const user = await userService.registerUser(userData);

    const userToLogin = {
      username: userData.username,
      password: userData.password,
    };
    const { token } = await userService.login(userToLogin);
    delete user.password;
    commit("loginUser", { user, token });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function signInUser({ commit }, userData) {
  try {
    const { token, userId } = await userService.login(userData);
    const user = await userService.getUserById(userId);

    commit("loginUser", { user, token });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
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

export async function checkAuthentication({ commit }) {
  const token = localStorage.getItem("token");

  if (!token) {
    commit("logout");
    return { ok: false, message: "No token found" };
  }
  try {
    const userId = localStorage.getItem("userId");
    const user = await userService.getUserById(userId);
    commit("loginUser", { user, token });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}