export function getEvent(state) {
  return state.event;
}

export function getEvents(state) {
  return state.events;
}

export function getEventId(state){
  return state.event.id;
}

export function getEventCategoryId(state){
  return state.eventCategory.id;
}

export function getEventCategoryName(state){
  return state.eventCategory.name
}

export function areThereEvents(state){
  return state.events.length>0
}

export function getEventLabels(state){
  return state.eventLabels
}

export function getEventLabelsNames(state){
  let labelNames = []
  for(let label of state.eventLabels){
    labelNames.push(label.name)
  }
  return labelNames
}

export function arethereReaminingTickets(state){
  return state.event.availableTickets > 0
}

