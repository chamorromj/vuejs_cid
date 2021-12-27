
export async function addEvent(state, event) {
  state.events.push(event);
}

export async function setEvent(state, event) {
  state.event = event;
}

export function setEvents(state, events) {
  state.events = events;
  console.log("Events setted")
}


export function addResponse(state, { question, response }) {
  state.event.questions.filter(
    (element) => element.id === response.questionId
  )[0].response = response.question;
}

export function popQuestion(state, questionId){
  for (let e = 0; e<state.events.length; e++){
    for (let i = 0; i < state.events[e].questions.length; i++)
       if (state.events[e].questions[i].id === questionId) {
         state.events[e].questions.splice(i,1)
       }
    if(state.events[e].questions.length === 0) state.events.splice(e,1)
      }
}

export function setEventLabels(state, labels){
  state.eventLabels = labels
}

export function removeLabel(state, labelId){
  for (let i = 0; i < state.eventLabels.length; i++)
    if (state.eventLabels[i].id === labelId) {
      state.eventLabels.splice(i,1)
    }
}

export function setEventCategory(state, category){
  state.eventCategory = category
}

