<template>
  <q-page class="flex">
    <ListEvents :events="events" />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue"
import ListEvents from "components/Event/EventListComponent.vue"
import EventService from "src/services/Event/event.service.js"
import { useStore } from "vuex"

export default defineComponent({
  name: "Index",
  components: {
    ListEvents,
  },
  setup() {
    let events = ref({})
    const store = useStore()

    onMounted(async () => {
      const eventService = new EventService()
      const response = await eventService.listAllEvents()
      events.value = response
      store.commit("event/setEvents", response)

    });

    return { events }
  },
});
</script>
