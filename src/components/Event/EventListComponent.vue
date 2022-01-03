<template>
  <div class="grid cards">
    <div v-if="events.length === 0" class="text-h5 text-bold q-ma-lg">
      No events with your selection
    </div>
    <div v-for="event in events" :key="event.id">
      <EventDetailComponent
        :event="event"
        v-on:addToFavorites="addToFavorites"
        v-on:goToDetail="goToDetail"
      />
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import EventDetailComponent from "components/Event/EventDetailComponent.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {date, QSpinnerGears, useQuasar} from "quasar";
import MediaService from "src/services/Media/media.service";

export default {
  name: "ListEvents",
  props: {
    events: Array,
  },
  components: {
    EventDetailComponent,
  },
  setup(props, context) {
    const router = useRouter()
    const store = useStore()
    const $q = useQuasar()
    const mediaService = new MediaService()
    const user = store.getters["user/getUser"]
    let eventsReceived = null
    let userId = null

    onMounted(async (props) => {
      $q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'primary',
        messageColor: 'secondary',
        backgroundColor: 'gray',
        message: 'Loading events...'
      })
      userId = localStorage.getItem("userId")
      if(userId){
        let favs = await mediaService.listAllFavoritesByUser(userId)
        if (favs) await store.dispatch("media/addFavorites", favs)
      }
      $q.loading.hide()

    });

    const goToDetail = async (event) => {
      store.commit("event/setEvent", event)
      router.push({ name: "event", params: { id: event.id } })
    };

    const addToFavorites = async (event) => {
      try {
        const favorite = {
          userId: (user)? user.id: userId,
          eventId: event.id,
        };
        await store.dispatch("media/addFavorite", favorite)
        const ok = await store.dispatch("user/addFavorite", favorite)
        if(ok){
          $q.notify({ type: 'positive', message: event.name + ' has been added to your favorites', color: 'blue' })
        }

      } catch (error) {
        $q.notify({ type: 'positive', message: 'Added to your favorites' })
      }

    };


    const isValidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val)
    };



    return {
      isValidEmail,
      eventsReceived,
      user,
      goToDetail,
      addToFavorites,
    };
  },
};
</script>

