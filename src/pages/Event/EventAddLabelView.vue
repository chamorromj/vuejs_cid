<template>
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
        <div class="text-h6">Add labels to the event</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-select
          label="Choose the labels to add..."
          v-model="labelsSelected"
          multiple
          :options="listOfLabels"
          use-chips
          stack-label
          option-label="name"
          option-value="id"
          map-options
          emit-value>
          <template v-slot:prepend>
            <q-icon name="label" />
          </template>
          <template v-slot:append>
            <q-avatar>
              <img src="~assets/avatar_logo.png">
            </q-avatar>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
              flat
              label="SAVE"
              color="primary"
              dense
              v-close-popup
              @click="selectLabels"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
</template>
<script>
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import LabelService from "src/services/Administration/label.service";
import {computed, onMounted, ref} from "vue";

export default {
  name: 'EventAddLabelView',
  setup(){
    const store = useStore()
    const $q = useQuasar()
    const labelsSelected = []
    //const listOfLabels =  computed(() => store.getters["event/getEventLabels"]);
const listOfLabels = ref()
    const selectLabels = async () =>{
      const labelService = new LabelService()
      let allLabels = await labelService.listAllLabels();
      for (let label of labelsSelected){
        let labelId = allLabels.find(l=>l.name === label).id
        await store.dispatch("event/addEventLabel", labelId)
      }
      $q.notify({ type: 'positive', message: 'Labels selected have been added to the event', color: 'blue' });
      labelsSelected.value = null;
    }

    onMounted(async()=>{
      const labelService = new LabelService()
      listOfLabels.value = await labelService.listAllLabels()

      /*for(let lab of eventLabels.value){
        console.log(lab)
        store.commit("event/removeLabel", lab.id)
      }
      listOfLabels.value = eventLabels.value*/

    })

    const getListOfLabels = () =>{
      console.log("Getting labels")
    }

    listOfLabels.value = getListOfLabels()
    /*const filterFn = (val, update) =>{
      update(() => {
        if (val === '') {
          filterOptions.value = listOfLabels
        }
        else {
          const needle = val.toLowerCase()
          filterOptions.value = listOfLabels.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }*/


    return{
      getListOfLabels,
      listOfLabels,
      labelsSelected,
      selectLabels,
    }

  }
}
</script>
