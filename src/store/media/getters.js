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

export function getEventIdFromFavorites(state){
  let ids = []
  for (let fav of state.favorites){
    ids.push(fav.eventId)
  }
  return ids;
}

// export async function getIsFavorite(state, rootGetters){
//   if(rootGetters.getters["event/isThereEvent"]){
//     let isFav = false
//     let eventId = await rootGetters.getters["event/getEventId"]
//     for (let fav of state.favorites)
//       if (fav.eventId === eventId)
//         isFav = true
//     return isFav
//   } else{
//     return false
//   }
// }



