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
              @click="$emit('suggestEvent', event.id, to_suggest, from_suggest)"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
  </q-dialog>
</template>
<script>
import {computed, ref} from "vue";

export default {
  name: 'SuggestEventView',
  props: {
    event: {},
  },
  setup(){
    const user = computed(() => store.getters["user/getUser"]);
    const to_suggest = ref('')
    const from_suggest = ref(user.value ? user.value.name : "");
    return {
      to_suggest,
      from_suggest
    }
  }
}
</script>
