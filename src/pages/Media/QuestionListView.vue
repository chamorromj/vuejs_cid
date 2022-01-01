<template>
  <q-page>
    <div class="row justify-center">
      <div
        class="
          col-8
          justify-center
          q-my-lg
          text-weight-bold text-h4 text-center
        "
      >
        Forums Management
      </div>
    </div>
    <div class="row text-subtitle2 justify-center">
      Questions pending of response
    </div>

    <q-separator color="blue" />

    <template v-for="event in events" :key="event.id">
      <div class="row col-12 q-my-md text-bold">
          <q-separator inset />
        <q-list padding bordered class="rounded-borders col-6">
          <q-expansion-item
            expand-icon-toggle
            expand-separator
            icon="perm_identity"
            :label="event.name"
          >
          <template v-for="question in event.questions" :key="question.id">
            <q-card>
              <q-card-section>
                  <QuestionDetailView :question="question" />
              </q-card-section>
            </q-card>
          </template>
          </q-expansion-item>
        </q-list>
      </div>
    </template>
  </q-page>
</template>

<script>
import EventService from "src/services/Event/event.service";
import ForumService from "src/services/Media/forum.service";
import QuestionDetailView from "../../components/Media/QuestionDetailView.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { findIndex } from "lodash";
import {setEventsWithQuestions} from "src/store/event/actions";

export default {
  name: "AnswerQuestionView",
  components: {
    QuestionDetailView,
  },

  setup() {
    const eventService = new EventService();
    const forumService = new ForumService();
    const events = ref(null);
    const store = useStore();
    const listEvents = computed(() => store.getters["event/getEvents"]);


    const createEventsArrayWithItsQuestionsWithoutAnswer = async () => {
      store.commit("event/setEvents", [])

      const events = await eventService.listAllEvents();
      listEvents.value = events;
      for (let actualEvent of events) {
        let questionsWithoutAnswer = await forumService.listAllQuestionsWithoutAnswerByEvent(actualEvent.id);
        if (questionsWithoutAnswer && questionsWithoutAnswer.length >0){
          actualEvent.questions = questionsWithoutAnswer;
          await store.commit("event/addEvent", actualEvent)
        }
      }
    };

    createEventsArrayWithItsQuestionsWithoutAnswer();

    events.value = listEvents.value

    return {
      events,
      createEventsArrayWithItsQuestionsWithoutAnswer,
      QuestionDetailView,
    };
  },
};
</script>
