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
        <div class="text-h6">Suggesting {{ event.name }}</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs">Your name</q-item-label>
                <q-input
                  v-model="from_suggest"
                  type="string"
                  outlined
                  style="max-width: 400px"
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"
                >The mail of your friend
                </q-item-label
                >
                <q-input
                  v-model="to_suggest"
                  type="email"
                  outlined
                  style="max-width: 400px"
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
            @click="suggestEvent(event.id, to_suggest, from_suggest)"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
  </q-dialog>
</template>
<script>
import {computed, ref} from "vue"
import {useStore} from "vuex"
import Swal from "sweetalert2";
import {useQuasar} from "quasar";


export default {
  name: 'SuggestEventView',
  props: {
    event: Object,
  },
  setup(){
    const show_suggest = ref(false);
    const store = useStore()
    const user = computed(() => store.getters["user/getUser"]);
    const from_suggest = ref(user.value ? user.value.name : "");
    const to_suggest = ref("");
    const $q = useQuasar()

    const suggestEvent = (eventId, toSugg, fromSugg) => {
      if (!toSugg || !fromSugg) {
        Swal.fire(
          "Error!",
          "Try again introducing your name and the mail of your friend",
          "warning"
        );
      } else if (!isValidEmail(toSugg)) {
        Swal.fire("Error!", "Retry introducing an email address", "warning");
      } else {
        const suggestion = {
          eventId,
          email: toSugg,
          from: fromSugg,
        };
        const {ok, error} = store.dispatch("media/suggestEvent", suggestion);
        if (true) {
          $q.notify({ type: 'positive', message: "Suggestion sent! Your suggestion has been correctly sent", color: 'blue' });
        } else {
          $q.notify({ type: 'warning', message: "Ups, something went wrong", color: 'secondary' })
        }

      }
    }

    const isValidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val);
    };

    return{
      from_suggest,
      show_suggest,
      to_suggest,
      suggestEvent,
      isValidEmail
    }
  }
}
</script>
