export function getUser(state) {
  return state.user;
}

export function currentState(state) {
  return state.status;
}

export function isAdminUser(state) {
  return state.status === "administrator";
}

export function isSuperAdminUser(state) {
  return state.status === "super-admin";
}

export function getUserName(state) {
  if (state.user) return state.user.name;
}

export function getDataToLogin(state){
  let data = {
    username: state.username,
    password: state.password
  }
  return data
}
