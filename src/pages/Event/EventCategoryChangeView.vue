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
        <div class="text-h6">Change the category of the event</div>
      </q-card-section>
      <q-separator inset/>
      <q-card-section class="q-pt-sm">
        <div>
          <span class="text-bold text-subtitle2 q-my-sm">Actual Category:</span>
          <q-field class="text-h6 text-bold justify-center color-black">{{recoverActualCategory()}}</q-field>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <div>
          <span class="text-bold text-subtitle2 q-mb-sm">New Category:</span>
          <q-select
              filled
              color="primary"
              v-model="categorySelected"
              :options="categoryOptions"
              stack-label
              class="text-h5 q-my-sm"
              label="Choose the new category..."
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
              flat
              label="DONE"
              color="primary"
              dense
              v-close-popup
              @click="changeCategorySelected"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
  </q-dialog>
</template>
<script>
import {onMounted, ref} from "vue";
import CategoryService from "src/services/Administration/category.service";
import {useStore} from "vuex";
import {useQuasar} from "quasar";

export default {
  name: 'EventCategoryChangeView',
  setup: function () {
    let categorySelected = ref(null)
    let categoryOptions = []
    let allCategoryIds = []
    const store = useStore()
    const $q = useQuasar()
    let actualCategory = ref(null)

    onMounted(async () => {
      const categoryService = new CategoryService()
      let allCategories = await categoryService.listAllCategories();
      for (let cat of allCategories) {
        categoryOptions.push(cat.name)
        allCategoryIds.push(cat.id)
      }
    })

    const recoverActualCategory = () =>{
      let name = store.getters["event/getEventCategoryName"]
      return name
    }

    const changeCategorySelected = () => {
      let categoryId = allCategoryIds[categoryOptions.indexOf(categorySelected.value)]
      store.dispatch("event/changeCategory", categoryId)
      $q.notify({type: 'positive', message: 'Successful! You changed the Category of the Event!', color: 'blue'})
      actualCategory.value = null
      categorySelected.value = null
    }
    return {
      recoverActualCategory,
      changeCategorySelected,
      categorySelected,
      categoryOptions,
      actualCategory,
      allCategoryIds,
    }
  }
}
</script>
