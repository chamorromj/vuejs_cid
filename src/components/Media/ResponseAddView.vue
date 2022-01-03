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
        <div class="text-h6">Introduce your response</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Message</q-item-label>
                <q-input
                    filled
                    type="text"
                    v-model="message"
                    label="Response"
                    @keyup.enter="checkResponse"
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
              @click="addResponse"
          >
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
  </q-dialog>
</template>
<script>
import {useStore} from "vuex";
import {ref} from "vue";
import {useQuasar} from "quasar";
import {useRoute} from "vue-router";

export default {
  name: 'ResponseAddView',
  props:{
    question: Object
  },
  setup(props){
    const store = useStore()
    const $q = useQuasar()
    const message = ref('')
    const route = useRoute()

    const checkResponse = () => {
      if(!message.value){
        $q.notify({ type: 'warning', message: "You should write a message for your response! Try again", color: 'secondary' })
      } else{
        $q.notify({ type: 'warning', message: "Click SEND button to send your response", color: 'secondary' })
      }
    }
    return{
      message,
      checkResponse,
      addResponse: async () => {
        if(message.value.trim() === ''){
          message.value = ''
          $q.notify({ type: 'warning', message: 'The response must have any text, it can not be empty'})
        } else{
          if(props.question.id){
            const response = {
              message: message.value,
              questionId: props.question.id,
              createdAt: Date.now(),
            }
            if(route.name.includes("Question")){
              await store.commit("event/popQuestion", props.question.id);
            }
            const ok = await store.dispatch("media/addResponse", response);
            if(ok){
              $q.notify({ type: 'positive', message: 'The response has been registered', color: 'blue', icon: 'thumb_up' })
            }
        }

        }

      }
    }
  }
}
</script>
