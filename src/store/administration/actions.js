import EventProfileService from "src/services/Profile/eventprofile.service";
import EventService from "src/services/Event/event.service";
import ForumService from "src/services/Media/forum.service";
import LabelService from "src/services/Administration/label.service";

const eventService = new EventService();
const eventProfileService = new EventProfileService();
const forumService = new ForumService();

export async function addEvent({ commit }, event) {
  try {
    await eventProfileService.addEvent(event);
    const events = await eventService.listAllEvents();
    commit("setEvents", events);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

export async function updateEvent({ commit }, event) {
  try {
    const data = await eventProfileService.updateEvent(event);
    const events = await eventService.listAllEvents();
    commit("setEvents", events);
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}

/*export function addResponse({ commit }, { question, message }) {
  const response = {
    question: question.id,
    message: message,
  };
  console.log(question);
  if (question.event) {
    commit("addResponse", { question, response });
  }
  forumService.addResponse(response);
}*/

export async function addQuestion({ commit }, question) {
  try {
    const resp = await forumService.askQuestion(question);
    const quest = await forumService.getQuestion(resp.id);
    question = quest;
    commit("addQuestion", question);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addEventLabels({commit, getters}){
    let eventId = getters["getEventId"];
    const labelService = new LabelService()
    const labels = await labelService.getLabelsByEventId(eventId)
    console.log(labels)
    commit("setEventLabels", labels)
}

export async function addEventLabel({commit, getters}, labelId){
  let eventId = getters["getEventId"];
  await eventProfileService.addLabelToEvent(eventId, labelId)
  //commit("removeLabel", labelId)
}

export async function removeEventLabel({commit, getters}, labelId){
  let eventId = getters["getEventId"]
  await eventProfileService.removeLabelFromEvent(eventId, labelId)
  commit("removeLabel", labelId)
}

export async function changeCategory({getters}, categoryId){
  let eventId = getters["getEventId"]
  let actualCategoryId = getters["getEventCategoryId"]
  let {ok} = await eventProfileService.removeCategoryFromEvent(eventId, actualCategoryId)
  if(ok){
    let {ok} = await eventProfileService.addCategoryToEvent(eventId, categoryId)
    if(ok){
      return {ok:true}
    }
  }
}


