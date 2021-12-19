export function getComments(state) {
  return state.comments;
}

export function getFavorites(state) {
  return state.favorites;
}

export function getQuestions(state) {
  return state.questions;
}

export function getRatings(state) {
  return state.ratings;
}

export function isPreviouslyRated(state){
  return state.ratings.length > 0
}
