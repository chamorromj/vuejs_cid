export function changeUser(state, user) {
    state.user = user;
  }

  export function removeUser(state) {
    state.user = null;
  }

  export function addFavorite(state, favorite) {

  }

  export function addRating(state, rating) {

  }

  export function loginUser(state, { user, token }) {
    if (token) {
      localStorage.setItem("token", token);
      state.token = token;
    }
    localStorage.setItem("userId", user.id);

    state.user = user;
    const role = user.roleId;
    switch (role) {
      case 3:
        state.status = "super-admin";
        break;
      case 2:
        state.status = "administrator";
        break;
      default:
        state.status = "authenticated";
    }
  }

  export function updateUser(state, user) {
    state.user = user;
  }

  export const logout = (state) => {
    state.user = null;
    state.token = null;
    state.status = "not-authenticated";

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
