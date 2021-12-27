export function getUser(state) {
  return state.user;
}

export function getUserId(state){
  return state.user.id
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

export function isStandardUser(state) {
  return state.status === "authenticated";
}

export function getUserUserName(state) {
  if (state.user) return state.user.username;
}
