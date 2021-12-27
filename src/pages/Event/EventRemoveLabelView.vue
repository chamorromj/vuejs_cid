<template>
  <q-dialog >
    <q-card style="width: 600px" v-if="eventLabels.length> 0">
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
        <div class="text-h6">Remove labels of the event</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list dense bordered padding class="rounded-borders" v-for="label in eventLabels" :key="label.id">
            <q-item>
              <q-item-section>
                {{ label.name }}
              </q-item-section>
              <q-item-section side>
                <q-icon @click="removeLabel(label.id)" name="highlight_off" class="cursor-pointer"/>
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
              flat
              label="CLOSE"
              color="primary"
              dense
              v-close-popup
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
    <q-card v-else style="width: 600px; height:200px" class="flex flex-center text-h4">This event has no labels</q-card>
  </q-dialog>
</template>
<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: 'EventRemoveLabelView',

  setup(){
    const store = useStore()
    const eventLabels =  computed(() => store.getters["event/getEventLabels"]);

    const removeLabel = async (labelId) => {
      console.log(labelId)
      await store.dispatch("event/removeEventLabel", labelId)
    }
    return{
      removeLabel,
      eventLabels
    }
  }
}
</script>
