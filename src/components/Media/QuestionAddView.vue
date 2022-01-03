<template>
  <q-dialog>
    <q-card style="width: 600px">
      <q-card-section>
        <q-btn
            round
            flat
            dense
            icon="close"
            class="float-right"
            color="grey-8"
            v-close-popup
        ></q-btn>
        <div class="text-h6">New question</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Title</q-item-label>
                <q-input filled type="text" v-model="title" label="Title" @keyup.enter="checkQuestion"/>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Message</q-item-label>
                <q-input
                    filled
                    type="text"
                    v-model="message"
                    label="Question"
                    @keyup.enter="checkQuestion"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
              flat
              label="CANCEL"
              color="secondary"
              dense
              v-close-popup
          ></q-btn>
          <q-btn
              flat
              label="SEND"
              color="primary"
              dense
              v-close-popup
              @click="askQuestion"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
  </q-dialog>
</template>
<script>
import {computed, ref} from "vue";
import {useQuasar} from "quasar";
import {useStore} from "vuex";

export default {
  name: 'QuestionAddView',
setup(){
  const title = ref("");
  const message = ref("");
  const $q = useQuasar()
  const store = useStore();
  const user = computed(() => store.getters["user/getUser"]);
  const event = computed(() => store.getters["event/getEvent"]);

  const checkQuestion = () => {
    if(!title.value){
      $q.notify({ type: 'warning', message: "You should write a title for your question! Try again", color: 'secondary' })
    }
    else if(!message.value){
      $q.notify({ type: 'warning', message: "You should write a message for your question! Try again", color: 'secondary' })
    } else{
      $q.notify({ type: 'warning', message: "Click SEND button to send your question", color: 'secondary' })
    }
  }
  const askQuestion = () => {
    if(!title.value){
      $q.notify({ type: 'warning', message: "You should write a title for your question! Try again", color: 'secondary' })
    }
    else if(!message.value){
      $q.notify({ type: 'warning', message: "You should write a message for your question! Try again", color: 'secondary' })
    } else {
      const question = {
        title: title.value,
        message: message.value,
        eventId: event.value.id,
        userId: user.value ? user.value.id : null,
        createdAt: Date.now(),
      }
      try {
        const id = store.dispatch("media/addQuestion", question);
        if(id){
          $q.notify({ type: 'positive', message: 'Thanks for your interest. Your question will be answered as soon as possible', color: 'blue'})
        }
        emptyForm()
        close()
      } catch (error) {
        console.log(error)
      }
    }
  };

  const emptyForm = () => {
    title.value = null
    message.value = null
  };

  return {
    emptyForm,
    title,
    message,
    user,
    checkQuestion,
    askQuestion,
  };
}
}
</script>
