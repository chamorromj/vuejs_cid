<template>
  <q-page>
    <q-circular-progress
      v-if="!event"
      :value="2"
      size="50px"
      color="orange"
      class="q-ma-md"
    />
    <template v-else>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3 q-pt-md"
        align="justify"
        narrow-indicator
      >
        <q-tab name="data" label="Event" />
        <q-tab name="reviews" label="Reviews" />
        <q-tab name="forum" label="Forum" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="data">
          <div class="row reverse justify-center">


            <div class="gt-sm-col-6 q-mb-lg">
              <div class="text-h6 text-orange-9">
                {{ event.categoryName }}
              </div>
              <div class="text-h3 text-bold">{{ event.name }}</div>
              <div v-if="labels" class="row q-my-md">
                <div
                  v-for="label in labels"
                  :key="label.id"
                >
                  <div
                    class="cursor-pointer"
                    @click="filterByLabel(label.id, label.name)"
                  >

                    <q-chip
                      class="glossy text-subtitle2"
                      color="green"
                      square
                      icon="label"
                      >{{ label.name }}</q-chip
                    >
                  </div>
                </div>
               </div>
              <q-separator class="q-my-md" />
              <div class="text-subtitle2">{{ event.description }}</div>
              <q-separator class="q-my-md" />

              <div v-if="event.eventOrganizerName" class="text-h6 text-blue-9">
                Organized by: {{ event.eventOrganizerName }}
              </div>
              <div class="q-mt-md q-pa-sm" style="border: solid 1px black">
                <div class="text-subtitle1">
                  <q-icon name="event" size="sm" color="black" />
                  <span class="q-ma-md"
                    >From:
                    <strong>{{ formatDate(event.startDate) }}</strong></span
                  >
                </div>
                <div class="text-subtitle1 q-mt-md" v-if="event.endDate">
                  <q-icon name="event" size="sm" color="black" />
                  <span class="q-ma-md"
                    >To: <strong>{{ formatDate(event.endDate) }}</strong></span
                  >
                </div>
              </div>
            </div>
            <div class="gt-xs" style="width:40px"> </div>

            <div class="gt-sm-col-6">

              <q-img style="width: 450px;height: auto"
                     :src= "`data:image/png;base64,${event.img}`" :alt="event.name" />
              <div class="row q-pt-sm justify-between">
                <q-btn class="col-12 q-mt-sm" icon="home" label="HOME" color="primary" to="/" />
                <q-btn
                  class="col-12 q-mt-sm"
                  v-if="isPastEvent(event.startDate)"
                  disable
                  color="deep-orange-9"
                  label="EVENT ENDED"/>
                <q-btn class="col-12 q-mt-sm"
                  v-else-if="user && arethereReaminingTickets"
                  color="primary"
                  icon="shopping_cart"
                  label="Book"
                  @click="show_order=true"
                />
                <q-btn class="col-12 q-mt-sm"
                  v-else-if="user && !arethereReaminingTickets"
                  color="deep-orange-10"
                  icon="shopping_cart"
                  disable
                  label="SOLD OUT"
                />
                <q-btn class="col-12 q-mt-sm"
                       v-if="user"
                       icon="send"
                       label="SUGGEST"
                       color="primary"
                       @click="show_suggest = true"
                />

                <q-btn class="col-12 q-mt-sm"
                       v-if="isOnUserFavorites(event.id)"
                       icon="favorite"
                       label="FAVORITE"
                       color="secondary">
                  <q-tooltip>This event is on your list of favorites</q-tooltip>
                </q-btn>

                <q-btn class="col-12 q-mt-sm"
                       v-else-if="user"
                       icon="favorite"
                       label="FAVORITE"
                       color="primary"
                       @click="addToFavorites(event)"
                >
                  <q-tooltip> Add to your favorites </q-tooltip>
                </q-btn>

              </div>

            </div>
          </div>

          <!-- comments -->
        </q-tab-panel>
        <q-tab-panel name="reviews">
          <RatingView :event="event" />
          <q-separator class="q-my-md" />
          <CommentListView :comments="comments" v-if="comments.length >0"/>
          <div v-else class="text-bold text-h5 q-pl-md">
            There are still no comments
          </div>
          <div
            class="row q-pa-md cursor-pointer"
            v-if="user"
            @click="show_commentForm = true"
          >
            <q-icon
              name="add_circle_outline"
              class="text-teal"
              style="font-size: 2.4em"
            />
            <span class="text-subtitle2 text-bold q-ml-sm"
              >Add your comment</span
            >
          </div>
          <div v-else>Register to send your comments about this event</div>
        </q-tab-panel>
        <q-tab-panel name="forum">
          <QuestionListView :event="event" />
        </q-tab-panel>
      </q-tab-panels>

      <CommentAddView  v-model="show_commentForm" :event="event"/>

      <SuggestEventView :event="event" v-model="show_suggest"/>

      <EventOrderView :event="event" v-model="show_order"/>

    </template>
  </q-page>
</template>

<script>
import {API_URL} from "src/utils/constants";
import {useStore} from "vuex";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import MediaService from "src/services/Media/media.service";
import QuestionListView from "components/Media/QuestionListView.vue";
import EventService from "src/services/Event/event.service";
import {useRoute, useRouter} from "vue-router";
import Swal from "sweetalert2";
import EventProfileService from "src/services/Profile/eventprofile.service";
import {date, QSpinnerGears, useQuasar} from "quasar";
import LabelService from "src/services/Administration/label.service";
import CommentListView from "pages/Media/CommentListView";
import CommentAddView from "pages/Media/CommentAddView";
import RatingView from "components/Media/RatingView";
import EventOrderView from "components/Event/EventOrderView";
import SuggestEventView from "components/Event/SuggestEventView";
import {isStandardUser} from "src/store/user/getters";

export default {
  name: "Event",
  components: {
    EventOrderView,
    SuggestEventView,
    RatingView,
    CommentAddView,
    CommentListView,
    QuestionListView,
  },

  watch: {
      $route(to, from) {
        if(to.name){
          console.log(to.name)
        } else {
          if(to.name && to.name.includes("event")){
            this.getEvent(to.params.id)
          } else {
            const eventId = this.$store.getters["event/getEventId"]
            this.getEvent(eventId)
          }
        }
      },

  },
  setup() {
    const eventprofileService = new EventProfileService()
    const mediaService = new MediaService()
    const eventService = new EventService()
    const labelService = new LabelService()
    const formCommentOpen = ref(false)
    const store = useStore()
    const $q = useQuasar()

    const show_commentForm = ref(false)
    const router = useRouter()
    const event = computed(() => store.getters["event/getEvent"])
    const user = computed(() => store.getters["user/getUser"])
    const show_suggest = ref(false)
    const show_order = ref(false)
    const comments = computed(() => store.getters["media/getComments"])
    const favorites = computed(()=>store.getters["media/getFavorites"])
    const labels = ref([]);



    onMounted(async () => {
      const eventId = store.getters["event/getEventId"]
      getEvent(eventId)
      let userId = (!user.value) ? localStorage.getItem("userId") : user.value.id
      if(userId){
        let favs = await mediaService.listAllFavoritesByUser(userId)
        await store.dispatch("media/addFavorites", favs)
      }
    });

    const formatDateForDataBase = (anyDate) =>{
      return date.formatDate(anyDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    }

    const isPastEvent = (anyDate)=> {
      return anyDate < formatDateForDataBase(Date.now())
    }

    const getEvent = async (eventId) => {
      if (isNaN(eventId)){
        console.log(eventId)
        eventId = store.getters["event/getEventId"]
      }
          $q.loading.show({
            spinner: QSpinnerGears,
            spinnerColor: 'primary',
            messageColor: 'secondary',
            backgroundColor: 'gray',
            message: 'Loading the event...'
          })
          event.value = await eventprofileService.showEvent(eventId)
          await store.dispatch("media/addComments", eventId)
          await store.dispatch("media/addQuestions", eventId)
          labels.value = await labelService.getLabelsByEventId(eventId)

          $q.loading.hide()
        }

    const getFirstLetter = (name) => {
      return name.slice(0, 1);
    };

    const openFormComment = () => {
      formCommentOpen.value = !formCommentOpen.value;
    };

    const isOnUserFavorites = (eventId)=>{
      let ids = store.getters["media/getEventIdFromFavorites"];
      return ids.includes(eventId);
    }

    const addToFavorites = async (event) => {
      try {
        const favorite = {
          userId: user.value.id,
          eventId: event.id,
        };
        await store.dispatch("media/addFavorite", favorite)
        await store.dispatch("user/addFavorite", favorite);
        $q.notify({ type: 'positive', message: event.name + ' has been added to your favorites', color: 'blue' })
      } catch (error) {
        $q.notify({ type: 'warning', message: error.message, color: 'secondary' })
      }

    };

    const callToRegister = () => {
      Swal.fire(
        "Please, sign up!",
        "Consider getting registered to get all functionalities",
        "info"
      );
    };


    const formatDate = (dateToFormat) => {
      return date.formatDate(dateToFormat, "D-MM-YYYY HH:mm");
    };
    return {
      filterByLabel: (id, name) => {
        store.commit("administration/changeElement", name);
        router.push({ name: "labels", params: { id: id } });
      },
      getFirstLetter,
      comments,
      favorites,
      show_commentForm,
      show_suggest,
      show_order,
      isOnUserFavorites,
      formatDateForDataBase,
      isPastEvent,
      isStandardUser: store.getters["user/isStandardUser"],
      arethereReaminingTickets: store.getters["event/arethereReaminingTickets"],
      getEvent,
      user,
      event,
      labels,
      API_URL,
      formatDate,
      QuestionListView,
      openFormComment,
      formCommentOpen,
      addToFavorites,
      callToRegister,
      tab: ref("data"),
    };
  },
};
</script>
