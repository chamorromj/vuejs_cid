<template>
  <q-page class="row justify-between">
    <ListEvents :events="events" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import ListEvents from "components/Event/EventListComponent.vue";
import EventService from "src/services/Event/event.service";

export default defineComponent({
  name: "Events",
  components: {
    ListEvents,
  },
  watch: {
    $route(to, from) {
      this.getEventsByCategory(to.params.category);
    },
  },
  setup() {
    const route = useRoute();
    const events = ref({});
    const eventService = new EventService();

    const getEventsByCategory = async (category) => {
      events.value = await eventService.findEventsByCategory(category);
    };

    getEventsByCategory(route.params.category);
    return {
      getEventsByCategory,
      events,
      ListEvents,
    };
  },
});
</script>
