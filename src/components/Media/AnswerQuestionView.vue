<template>
  <div class="row q-pa-md justify-center">

    {{question}}
    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md col-xs-12 col-md-8 q-py-md"
      autofocus
    >
      <q-input filled type="text" v-model="message" label="Answer" />

      <div class="row justify-right">
        <q-btn label="Submit" type="submit" class="q-mr-md" color="primary" />
        <q-btn label="Cancel" type="button" color="secondary" />
      </div>
    </q-form>
  </div>
</template>
<script>
import { ref } from "vue";
import {useStore} from "vuex"
import {useQuasar} from "quasar";
export default {
  name: "AnswerQuestionView",
  props: {
    question: Object,
  },

  setup(props) {
    const message = ref(null);
    const store = useStore();
    const response = ref(null)
    const $q = useQuasar()

    const onSubmit = async () => {
      if(message.value==''){
        $q.notify({ type: 'warning', message: "The response can't be empty! Try again", color: 'secondary' })
      } else{
        response.value = {
          questionId: props.question.id,
          message: message.value,
        };
        console.log(response.value);
        await store.commit("media/popQuestion", props.question.id);
      }


    };

    return {
      message,
      onSubmit,
      response
    };
  },
};
</script>
