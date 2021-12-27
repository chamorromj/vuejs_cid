<template>
  <q-page class="flex">
    <ListEvents :events="events" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ListEvents from "components/Event/EventListComponent.vue";
import EventService from "src/services/Event/event.service";
import LabelService from "src/services/Administration/label.service";

export default defineComponent({
  name: "EventsByLabel",
  components: {
    ListEvents,
  },
  watch: {
    $route(to, from) {
      this.getEventsByLabel(to.params.id);
    },
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const events = ref({});
    const eventService = new EventService();

    const getEventsByLabel = async (id) => {
      const labelService = new LabelService();
      const labelRecovered = await labelService.showLabel(id);
      let label = {
        name: labelRecovered.name
      };
      const eventsFound = await eventService.findEventsByLabel(label);
      events.value = eventsFound;
    };
    getEventsByLabel(route.params.id);
    return {
      getEventsByLabel,
      events,
      ListEvents,
    };
  },
});
</script>
