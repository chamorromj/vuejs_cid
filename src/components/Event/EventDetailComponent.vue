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
    class="my-card q-mt-sm q-mx-xs cursor-pointer"
    style="height: 490px"
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
      <div class="row wrap" @click="$emit('goToDetail', event)">
        <div class="text-h5 title-event q-py-none">
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
        </div>
      </div>

    </q-card-section>
    <q-card-section class="q-py-none">
      <div class="text-caption text-grey ellipsis-2-lines">
        {{ event.description }}
      </div>
    </q-card-section>
    <q-card-section class="justify-between">
      <q-chip icon="event" v-if="!isPastEvent" class="q-pa-md" square color="primary" >{{ formatDate(event.startDate) }}</q-chip>

      <q-chip icon="event" v-else class="q-pa-md" square color="secondary" >{{ formatDate(event.startDate) }}</q-chip>
      <q-chip square  class="q-pa-md">
        <q-avatar icon="schedule" color="primary" text-color="white" />
        {{ formatTime(event.startDate) }}
      </q-chip>
    </q-card-section>

    <q-separator />

    <q-card-actions align="around">
      <q-btn
        flat
        v-if="user"
        color="dark"
        label="Suggest"
        icon-right="send"
        @click="show_suggest=true"
      />
      <q-btn
        v-else
        flat
        color="dark"
        label="Suggest"
        icon-right="send"
        @click="callToRegister"
      />


      <q-btn
        v-if="user && !isNotSoldOut"
        flat
        color="primary"
        icon="shopping_cart"
        label="Book"
        @click="show_order=true"
      />
      <q-btn
        class="q-px-md"
        v-else-if="user && isNotSoldOut"
        disable
        color="deep-orange-10"
        label="SOLD OUT"
      />
      <q-btn
        v-else-if="!user"
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
import moment from "moment";

export default {
  name: "EventData",
  components: {SuggestEventView, EventOrderView,},
  props: {
    event: Object,
  },
  emits: ["addToFavorites", "goToDetail"],

  setup(props) {
    const user = computed(() => store.getters["user/getUser"]);
    const store = useStore();
    const show_suggest = ref(false)
    const show_order = ref(false)
    const today = Date.now()


    const isPastEvent = ()=> {
      return moment(props.event.startDate).isSameOrBefore(Date.now())
    }

    const formatDate = (anyDate) => {
      return date.formatDate(anyDate, "DD-MM-YYYY")
    };

    const formatTime = (anyDate) => {
      return date.formatDate(anyDate, "HH:mm")
    }

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
      formatTime,
      isPastEvent,
      isNotSoldOut: props.event.availableTickets === 0,
      today,
      show_suggest,
      show_order,
      isOnUserFavorites,
      user,
      callToRegister,
    };
  },
};
</script>
<style  scoped>
.title-event :hover{
  pointer: hand;
}
.my-card{
  width: 300px;
}
</style>

