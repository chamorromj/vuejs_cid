export function setComments(state, comments) {
  state.comments = comments;
}

export function addComment(state, comment) {
  state.comments.push(comment);
}

export function setFavorites(state, favorites) {
  state.favorites = favorites;
}

export function addRating(state, rating){
  state.ratings.push(rating);
}

export function addNewFavorite(state, favorite) {
  state.favorites.push(favorite);
}

export function addQuestion(state, question) {
  state.questions.push(question);
}

export function setQuestions(state, questions) {
  state.questions = questions;
}

export function setResponse(state, response) {
  state.questions.filter(
    (element) => element.id == response.questionId
  )[0].response = response;
}
