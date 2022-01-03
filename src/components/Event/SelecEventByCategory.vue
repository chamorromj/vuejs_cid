<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row relative-position">
      <q-select
        filled
        dense
        v-model="categorySelected"
        use-input
        input-debounce="0"
        label="Search by Category"
        :options="options"
        option-label="name"
        option-value="id"
        map-options
        emit-value
        style="width: 250px"
        behavior="menu"
        @update:model-value="filterByCategory"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import CategoryService from "src/services/Administration/category.service";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  setup() {
    let stringOptions = []
    const categorySelected = ref(null)
    const options = ref([])
    const router = useRouter()
    const store = useStore()

    onMounted(async()=>{
      let categoryService = new CategoryService();
      options.value = await categoryService.listAllCategories()
    })

    const filterByCategory = () => {
      store.commit("event/setEvents", [])
      store.commit("media/setQuestions", [])
      let sel = categorySelected.value
      store.commit('ui/toggleSideMenu')
      categorySelected.value = null
      router.push({ name: "events", params: { category: sel } });
      }

    return {
      filterByCategory,
      categorySelected,
      stringOptions,
      options,


    }
  }
}
</script>

