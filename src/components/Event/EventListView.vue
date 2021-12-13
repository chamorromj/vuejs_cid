<template>
  <div class="row wrap">
    <div v-if="events.length === 0" class="text-h4 text-bold q-ma-lg">
      There are no events that fits the parameters you chose
    </div>
    <div v-for="event in events" :key="event.id" class="flex">
      <EventDetailComponent
        :event="event"
        v-on:goToDetail="goToDetail"
        v-on:suggestEvent="suggestEvent"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import EventDetailComponent from "./EventDetailComponent.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import CategoryService from "../../services/Administration/category.service";

export default {
  name: "EventListView",
  props: {
    events: Array,
  },
  components: {
    EventDetailComponent,
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();
    const categoryService = new CategoryService();
    const categories = ref([]);

    onMounted(async () => {
      categories.value = await categoryService.listAllCategories();
    });

    store.commit("event/setEvents", props.events);

    const user = computed({
      get() {
        return store.getters["user/getUser"];
      },
      set(val) {
        store.commit("user/changeUser", val);
      },
    });

    const goToDetail = async (event) => {
      console.log(event);
      store.commit("event/setEvent", event);
      router.push({ name: "event", params: { id: event.id } });
    };


    const isValidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val);
    };

    const suggestEvent = (eventId, toSugg, fromSugg) => {
      if (!toSugg || !fromSugg) {
        Swal.fire(
          "Error!",
          "Try again introducing your name and the mail of your friend",
          "warning"
        );
      } else if (!isValidEmail(toSugg)) {
        Swal.fire("Error!", "Retry introducing an email address", "warning");
      } else {
        const suggestion = {
          eventId,
          email: toSugg,
          from: fromSugg,
        };
        const { ok, error } = store.dispatch("media/suggestEvent", suggestion);
        if (ok) {
          Swal.fire(
            "Suggestion sended!",
            "Your suggestion has been correctly sended to your friend",
            "success"
          );
        } else {
          Swal.fire("Ups, something went wront", error, "warning");
        }
      }
    };

    return {
      isValidEmail,
      user,
      goToDetail,
      EventDetailComponent,
      suggestEvent,
    };
  },
};
</script>
