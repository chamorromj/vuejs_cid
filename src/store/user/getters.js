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
    return state.user.name;
  }
