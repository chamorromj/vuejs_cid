<template>
  <q-circular-progress
    v-if="!event"
    :value="2"
    size="50px"
    color="orange"
    class="q-ma-md"
  />
  <q-card
    v-else
    class="my-card q-ma-sm cursor-pointer"
    style="height: 450px"
  >
    <q-img
      style="height:200px"
      :src= "`data:image/png;base64,${event.img}`"
      :alt="event.picture"
      @click="$emit('goToDetail', event)"
    />

    <q-card-section>
      <q-btn
        v-if="isOnUserFavorites(event.id)"
        fab
        icon="favorite"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        color="secondary">
        <q-tooltip>This event is on your list of favorites</q-tooltip>
      </q-btn>
      <q-btn
        fab
        v-else-if="user"
        icon="favorite"
        class="absolute"
        color="primary"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        @click="$emit('addToFavorites',event)"
      >
        <q-tooltip> Add to your favorites </q-tooltip>
      </q-btn>
      <q-btn
        v-else
        fab
        color="primary"
        icon="favorite"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
        @click="callToRegister"
      >
        <q-tooltip> Add to your favorites </q-tooltip>
      </q-btn>

      <div class="text-overline text-orange-9">{{ event.categoryName }}</div>
      <div class="row no-wrap items-center" @click="$emit('goToDetail', event)">
        <div class="text-h5 q-mt-sm q-mb-xs title-event">
          {{ event.name }}
        </div>
        <div
          class="
            col-auto
            text-grey text-caption
            q-pt-sm
            row
            no-wrap
            items-center
          "
        >
          <!-- <q-icon name="time" />
          {{ event.inDate }} -->
        </div>
      </div>

      <!-- <q-rating no-dimming v-model="stars" :max="5" size="32px" disable /> -->
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption text-grey ellipsis-2-lines">
        {{ event.description }}
      </div>
    </q-card-section>
    <q-card-section>
      <q-icon name="event" size="sm" color="black" />
      <span class="subtitle1 q-ml-md"
      >{{ formatDate(event.startDate) }}
        <!-- <strong>-</strong>
        {{ formatDate(event.endDate) }} -->
      </span>
    </q-card-section>

    <q-separator />

    <q-card-actions class="justify-between">
      <q-btn
        flat
        color="dark"
        label="Suggest"
        icon-right="send"
        @click="show_suggest=true"
      />
      <q-btn
        v-if="user"
        flat
        color="primary"
        icon="shopping_cart"
        label="Book"
        @click="show_order=true"
      />
      <q-btn
        v-else
        flat
        color="primary"
        icon="person_add_alt"
        label="Register"
        to="/register"
      />
    </q-card-actions>
  </q-card>

  <SuggestEventView :event="event" v-model="show_suggest"/>

  <EventOrderView :event="event" v-model="show_order"/>
</template>

<script>
import {computed, ref} from "vue";
import {API_URL} from "src/utils/constants";
import {date} from "quasar";
import {useStore} from "vuex";
import Swal from "sweetalert2";
import EventOrderView from "components/Event/EventOrderView";
import SuggestEventView from "components/Event/SuggestEventView";

export default {
  name: "EventData",
  components: {SuggestEventView, EventOrderView,},
  props: {
    event: Object,
  },
  emits: ["addToFavorites", "goToDetail", "buyTickets"],

  setup(props) {
    const user = computed(() => store.getters["user/getUser"]);
    const store = useStore();
    const show_suggest = ref(false)
    const show_order = ref(false)

    const formatDate = (anyDate) => {
      return date.formatDate(anyDate, "YYYY-MM-DD HH:mm");
    };

    const isOnUserFavorites = (eventId)=>{
      let ids = store.getters["media/getEventIdFromFavorites"];
      return ids.includes(eventId);
    }


    const callToRegister = () => {
      Swal.fire(
        "Please, sign up!",
        "Consider getting registered to get all functionalities",
        "info"
      );
    };
    return {
      API_URL,
      formatDate,
      show_suggest,
      show_order,
      isOnUserFavorites,
      user,
      callToRegister,
    };
  },
};
</script>
<style lang="sass" scoped>
.title-event
  &_hover
    pointer: hand
.my-card
  width: 300px


</style>

