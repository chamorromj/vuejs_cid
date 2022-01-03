<template>
  <q-page class="flex">
    <ListEvents :events="events" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import {useRoute, useRouter} from "vue-router";
import { useStore } from "vuex";
import ListEvents from "components/Event/EventListComponent.vue";
import EventService from "src/services/Event/event.service";
import LabelService from "src/services/Administration/label.service";
import {useQuasar} from "quasar";

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
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const $q = useQuasar()
    const events = ref({})
    const labelService = new LabelService()
    const eventService = new EventService()
    let labelName = ""

    const checkIfLabelExists = async(labelId)=>{
      const exists = await labelService.showLabel(labelId);
      return exists;
    }

    const getEventsByLabel = async (id) => {
      //let exists = await checkIfLabelExists(id)
      /*if(!exists){
        $q.notify({ type: 'warning', message: 'No label exists with this id'})
        router.push("/")
      } else {*/
        labelName = {
          name: store.getters["administration/getElement"]
        }
        if (!labelName){
          const labelRecovered = await labelService.showLabel(id);
          labelName = {
            name: labelRecovered.name
          }
        }
        const eventsFound = await eventService.findEventsByLabel(labelName);
        events.value = eventsFound;
     // }

    };
    getEventsByLabel(route.params.id);
    return {
      getEventsByLabel,
      events,
    };
  },
});
</script>
