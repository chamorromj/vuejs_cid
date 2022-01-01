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
        <div class="text-h6">
          Introduce your comment about {{ event.name }}
        </div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md full-width">
          <q-item>
            <div class="full-width" style="max-width: 500px">
              <q-input v-model="text" clearable filled type="textarea"/>
            </div>
          </q-item>
          <q-item v-if="user">
            <q-checkbox v-model="anonymous" label="Publish as anonymous"/>
          </q-item>
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
              @click="sendComment(event, text, anonymous)"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
  </q-dialog>
</template>
<script>
import MediaService from "src/services/Media/media.service";
import {computed, ref} from "vue";
import {useQuasar} from "quasar";
import {useStore} from "vuex";

export default {
  name: 'CommentAddView',
  props: {
    event: Object
  },
  setup() {
    const text = ref("")
    const anonymous = ref(false)
    const user = computed(() => store.getters["user/getUser"])
    const $q = useQuasar()
    const store = useStore();

    return{
      user,
      text,
      anonymous,
      sendComment: async (event, commentText, commentAnonymous) => {
        if(commentText == ''){
          $q.notify({ type: 'warning', message: "The comment can't be empty! Try again", color: 'secondary' })
        } else {
          const mediaService = new MediaService();
          const comment = {
            userId: commentAnonymous ? null : user.value.id,
            eventId: event.id,
            comment: commentText,
            createdAt: Date.now(),
          };
          await mediaService.sendComment(comment);
          await store.dispatch("media/addComment", comment);
          text.value = ""
          anonymous.value = null
          $q.notify({ type: 'positive', message: 'Thanks! Your comment has been received correctly!', color: 'blue' })
        }

      },

  }

  }
}
</script>
