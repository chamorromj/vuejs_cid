<template>
  <q-page class="flex">
    <ListEvents :events="events" />
  </q-page>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import { useRoute } from "vue-router";
import ListEvents from "components/Event/EventListComponent.vue";
import EventService from "src/services/Event/event.service";
import {QSpinnerGears, useQuasar} from "quasar";

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
    const $q = useQuasar()
    const events = ref({});
    const eventService = new EventService()

    onMounted(()=>{
      if(events.value){
        getEventsByCategory(route.params.category);
      }
    })

    const getEventsByCategory = async (category) => {
      $q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'primary',
        messageColor: 'secondary',
        backgroundColor: 'gray',
        message: 'Loading events...'
      })
      events.value = await eventService.findEventsByCategory(category);
      $q.loading.hide()
    };



    return {
      getEventsByCategory,
      events,
    };
  },
});
</script>
