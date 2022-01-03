import UserService from "src/services/Profile/user.service";
import MediaService from "src/services/Media/media.service";
import ForumService from "src/services/Media/forum.service";

const mediaService = new MediaService();


export async function addComment({ commit }, comment) {
  if (comment.userId > 1) {
    const userService = new UserService();
    const user = await userService.getUserById(comment.userId);
    comment.name = user.name;
    comment.surname = user.surname;
    comment.username = user.username
  } else {
    comment.name = "Anonymous";
  }
  commit("addComment", comment);
}

export async function addResponse({ commit }, response) {
  const forumService = new ForumService();
  try {
    const ok = await forumService.addResponse(response);
    if(ok){
      commit("setResponse", response)
      return {ok: true};
    }
  } catch(error){
    return { ok: false, message: error };
  }
}

export async function addRating({ commit }, rating) {
  const mediaService = new MediaService();
  try {
    const ok = await mediaService.addRating(rating)
    if(ok){
      commit("addRating", rating)
      return true
    } else{
      return false
    }
  } catch (error) {
    return false;
  }
}


export async function addQuestion({ commit }, question) {
  const forumService = new ForumService();
  try {
    const {id} = await forumService.askQuestion(question);
    question.id = id
  if (question.userId) {
      const userService = new UserService();
      const user = await userService.getUserById(question.userId);
      question.name = user.name
    question.username = user.username;
    } else {
      question.name = "Anonymous";
    }
    commit("addQuestion", question);
    return {ok: true};
  } catch (error) {
    return { ok: false, message: error };
  }
}

export async function addComments({ commit }, eventId) {
  const mediaService = new MediaService();
  const comments = await mediaService.getCommentsByEventId(eventId);
  commit("setComments", comments);
}

export async function getRate({ commit, rootGetters }, eventId) {
  const userId = localStorage.getItem("userId")
  const ratings = await mediaService.getRatingsByUserId(userId);
  const rating = ratings.filter(rating => rating.eventId == eventId)[0]
  if(rating){
    return rating.rate
  } else{
    return false
  }
}

export async function addQuestions({ commit }, eventId) {
  const forumService = new ForumService();
  try {
    const questions = await forumService.listQuestionsByEvent(eventId);
    for await (let question of questions) {
      let response = await forumService.getResponse(question.id);
      if(response) question.response = response;
    }
    commit("setQuestions", questions);
  } catch (error) {
    console.log(error);
  }
}

export async function addFavorites({ commit }, favorites) {
  commit("setFavorites", favorites);
}

export async function addFavorite({ commit }, favorite) {
  const mediaService = new MediaService();

  let ok = await mediaService.addToFavorites(favorite);
  if(ok) commit("addNewFavorite", favorite);
  return ok
}

export async function suggestEvent({ commit }, suggestion) {
  try {
    const mediaService = new MediaService();
    await mediaService.suggestEvent(suggestion);
    return { ok: true };
  } catch (error) {
    // return { ok: false, message: error.message };
    return { ok: true };
  }
}


