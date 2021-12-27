export function changeUser(state, user) {
  state.user = user;
}

export function removeUser(state) {
  state.user = null;
}

export function addRatting(state, ratting) {
  delete ratting.user;
  state.user.ratings.push(ratting);
}

export function loginUser(state, {user, token}) {
  state.user = user;
  state.token = token;

  if(user){
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
}

export function addFavorite(state, favorite) {
  state.user.favorites.push(favorite);
}

export function userUpdate(state, user) {
  state.user = user;
}

export const logout = (state) => {
  state.user = null;
  state.token = null;
  state.status = "not-authenticated";

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};
