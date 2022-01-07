<template>
  <div class="q-pa-xs">
    <div v-if="question.user" class="text-subtitle2">
      {{ question.user.username }}
    </div>
    <q-field
      color="orange"
      filled
      standout
      label="Label"
      stack-label
      label-color="secondary"
    >
      <template v-slot:prepend>
        <q-avatar color="primary">
          {{ getFirstLetter("Anonymous") }}</q-avatar
        >
      </template>
      <template v-slot:label>
        <div class="row items-center all-pointer-events text-subtitle2 q-mb-sm">
          <q-icon class="q-mr-xs" color="primary" size="sm" name="quiz" />
          {{ question.title }} <span class="text-black q-ml-sm">({{formatDate(question.createdAt)}})</span>
        </div>
      </template>

      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0"  style="white-space: break-spaces">
           {{ question.message }}
        </div>
      </template>
      <template
        v-slot:append
        v-if="(!question.response || question.response==1) && (isAdminUser || isSuperAdminUser)"
      >
        <q-icon
          name="question_answer"
          color="primary"
          class="cursor-pointer"
          @click="showAddResponse = true"
          ><q-tooltip>Give an answer</q-tooltip></q-icon
        >
      </template>
    </q-field>
    <template v-if="question.response && question.response!= 1">
      <ResponseDetailView :response="question.response" />
    </template>
  </div>

  <ResponseAddView  v-model="showAddResponse" :question="question"/>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import ResponseDetailView from "./ResponseDetailView.vue";
import {date} from "quasar";
import ResponseAddView from "components/Media/ResponseAddView";

export default {
  name: "DetailQuestionView",
  components:{
    ResponseAddView,
    ResponseDetailView
  },
  props: {
    question: Object,
  },
  setup() {
    const showAddResponse = ref(false);
    const store = useStore();



    const getFirstLetter = (name) => {
      return name.slice(0, 1);
    };

    const formatDate = (anyDate) => {
      return date.formatDate(anyDate, "YYYY-MM-DD HH:mm");
    };
    return {
      formatDate,
      showAddResponse,
      getFirstLetter,
      isAdminUser: store.getters["user/isAdminUser"],
      isSuperAdminUser: store.getters["user/isSuperAdminUser"],
    };
  },
};
</script>

