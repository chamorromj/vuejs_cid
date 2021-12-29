<template>
  <q-scroll-area style="height: 75vh">
    <div
      v-if="questions && questions.length == 0"
      class="row text-subtitle1 text-bold q-px-md"
    >
      This event has no questions
    </div>
    <div v-else>
      <div
        class="q-py-xs column q-mb-xs q-px-md"
        v-for="question in questions"
        :key="question.id"
      >
        <QuestionDetailView :question="question" />
      </div>
    </div>
    <q-icon
      v-if="!showAddQuestion"
      class="q-ma-md cursor-pointer"
      name="add_circle"
      color="primary"
      size="xl"
      @click="addQuestion"
    >
      <q-tooltip>New question</q-tooltip>
    </q-icon>

    <QuestionAddView v-model="showAddQuestion"/>
  </q-scroll-area>
</template>

<script>
import {computed, defineAsyncComponent, onBeforeMount, ref} from "vue";
import {useStore} from "vuex";
import QuestionAddView from "components/Media/QuestionAddView";

export default {
  name: "QuestionListView",
  components: {
    QuestionAddView,
    QuestionDetailView: defineAsyncComponent(() =>
      import("./QuestionDetailView.vue")
    ),
  },
  props:{
    event:{
      type: Object
    }
  },

  setup(props, context) {
    const showAddQuestion = ref(false);
    const store = useStore();
    const user = computed(() => store.getters["user/getUser"]);
    const event = computed(() => store.getters["event/getEvent"]);
    const questions = computed(() => store.getters["media/getQuestions"]);


    onBeforeMount(async()=>{
      await store.dispatch("media/addQuestions", props.event.id);

    })


    return {
      showQuestionForm: ref(false),
      addQuestion: () => (showAddQuestion.value = true),
      questions,
      showAddQuestion,
      user,
    };
  },
};
</script>

