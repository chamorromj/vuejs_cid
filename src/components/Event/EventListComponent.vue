<template>
  <div class="row wrap">
    <div v-if="events.length == 0" class="text-h5 text-bold q-ma-lg">
      There are no events that fits the parameters you chose
    </div>
    <div v-for="event in events" :key="event.id" class="justify-between justify-md-evenly my-grid">
      <EventDetailComponent
        :event="event"
        v-on:addToFavorites="addToFavorites"
        v-on:goToDetail="goToDetail"
        v-on:buyTickets="buyTickets"
      />
    </div>
    <!--    <q-inner-loading
          :showing="visible"
          label="Please wait..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />-->
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import EventDetailComponent from "components/Event/EventDetailComponent.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import EventService from "src/services/Event/event.service";
import {date, QSpinnerGears, useQuasar} from "quasar";
import CategoryService from "src/services/Administration/category.service";
import EventOrganizerService from "src/services/Administration/eventorganizer.service";
import MediaService from "src/services/Media/media.service";

export default {
  name: "ListEvents",
  props: {
    events: Array,
  },
  components: {
    EventDetailComponent,
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar()
    const eventService = new EventService();
    const categoryService = new CategoryService();
    const mediaService = new MediaService();
    const categories = ref([]);
    const user = store.getters["user/getUser"];
    let eventsReceived = null

    onBeforeUnmount(() => {
      $q.loading.hide()
    })

    onMounted(async () => {
      $q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'primary',
        messageColor: 'secondary',
        backgroundColor: 'gray',
        message: 'Loading events...'
      })
      if(props.events.length === 0){
        eventsReceived = store.getters["events/getEvents"]

      } else{
        store.commit("event/setEvents", props.events)
      }
      categories.value = await categoryService.listAllCategories();
      let userId = localStorage.getItem("userId")
      if(userId){
        let favs = await mediaService.listAllFavoritesByUser(userId);
        if (favs) await store.dispatch("media/addFavorites", favs);
      }


      $q.loading.hide()

    });




    const goToDetail = async (event) => {
      store.commit("event/setEvent", event);
      router.push({ name: "event", params: { id: event.id } });
    };

    const addToFavorites = async (event) => {
      try {
        const favorite = {
          userId: user.id,
          eventId: event.id,
        };
        await store.dispatch("media/addFavorite", favorite);
        await store.dispatch("user/addFavorite", favorite);
        $q.notify({ type: 'positive', message: event.name + ' has been added to your favorites', color: 'blue' });
      } catch (error) {
        $q.notify({ type: 'warning', message: error.message, color: 'secondary' })
      }

    };


    const buyTickets = async (event) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You are going to book access for " + event.name,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "primary",
        confirmButtonText: "Yes, proceed!",
      }).then((result) => {
        if (result.isConfirmed) {
          $q.notify({ type: 'positive', message: 'Booked! Your purchase have been processed, thank you!', color: 'blue' })
        }
      });
      const order = {
        date: date.formatDate(Date.now(), "YYYY-MM-DD"),
        // eventId: event.id,
        // email: user.value.email,
        event: event,
        user: user.value,
        reservationId: "123456",
        orderId: "12334",
      };
      await eventService.orderEvent(order);
    };

    const isValidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val);
    };



    return {
      isValidEmail,
      eventsReceived,
      user,
      goToDetail,
      addToFavorites,
      buyTickets,
      // orderEvent,
    };
  },
};
</script>
<style  lang="sass" scoped>

</style>
