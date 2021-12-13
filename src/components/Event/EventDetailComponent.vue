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
    style="max-height: 500px"
  >
    <q-img
      src="https://res.cloudinary.com/dzs02neay/image/upload/v1639063522/mkugqnvj8r8b8w3nvly3.jpg"
      :alt="event.picture"
      @click="$emit('goToDetail', event)"
    />

    <q-card-section>
            <q-btn
        fab
        v-if="user"
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
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption text-grey ellipsis-3-lines">
        {{ event.description }}
      </div>
    </q-card-section>
    <q-card-section>
      <q-icon name="event" size="sm" color="black" />
      <span class="subtitle1 q-ml-md"
      >{{ formatDate(event.startDate) }}
      </span>
    </q-card-section>

    <q-separator />

    <q-card-actions class="justify-between">
      <q-btn
        flat
        color="dark"
        label="Suggest"
        icon-right="send"
        @click="show_suggest = true"
      />
      <q-btn
        v-if="user"
        flat
        color="primary"
        icon="shopping_cart"
        label="Book"
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

  <SuggestEventView :event="event" v-if="show_suggest" />
</template>

<script>
import {computed, ref} from "vue";
import {API_URL} from "src/utils/constants";
import {date} from "quasar";
import {useStore} from "vuex";
import Swal from "sweetalert2";
import SuggestEventView from "components/Event/SuggestEventView";

export default {
  name: "EventData",
  components: {
    SuggestEventView
  },
  props: {
    event: Object,
  },
  emits: ["goToDetail", "suggestEvent"],

  setup(props) {
    const user = computed(() => store.getters["user/getUser"]);
    const store = useStore();
    const show_suggest = ref(false);
    const from_suggest = ref(user.value ? user.value.name : "");
    const to_suggest = ref("");

    const formatDate = (anyDate) => {
      return date.formatDate(anyDate, "YYYY-MM-DD HH:mm");
    };


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
      to_suggest,
      from_suggest,
      user,
      callToRegister,
      SuggestEventView
    };
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 300px
.title-event
  &_hover
    pointer: hand
</style>

