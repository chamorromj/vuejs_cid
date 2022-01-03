<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center">Update Category</div>
  </div>
  <q-separator inset color="secondary" />

  <div class="row q-pa-md justify-center">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md col-xs-12 col-md-8 q-py-md"
      autofocus
    >
      <q-input
        filled
        type="text"
        v-model="name"
        label="Name"
        @keydown.enter="onSubmit"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') ||
            'Please type the name of the category',
        ]"
      />

      <q-input
        filled
        autogrow
        type="text"
        @keydown.enter="onSubmit"
        v-model="description"
        label="Description"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Please type the description',
        ]"
      />

      <div class="row justify-right">
        <q-btn label="Submit" type="submit" class="col-12 q-mt-sm" color="primary" />
        <q-btn
          label="Cancel"
          type="button"
          color="secondary"
          to="/categories-list"
          class="col-12 q-mt-sm"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import CategoryService from "../../services/Administration/category.service";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import {useQuasar} from "quasar";

export default {
  name: "CategoryAddView",

  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar()
    const categoryToUpdate = ref(null);

    let name = ref("");
    let description = ref("");

    onMounted(async () => {
      getCategoryData()
    });

    const getCategoryData = ()=>{
      const category = computed(
        () => store.getters["administration/getElement"]
      );
      categoryToUpdate.value = category.value;
      name.value = category.value.name;
      description.value = category.value.description;
    }

    const emptyForm = () => {
      name.value = null;
      description.value = null;
    };

    return {
      name,
      description,
      emptyForm,
      categoryToUpdate,
      getCategoryData,
      async onSubmit() {
        const categoryData = {
          name: name.value,
          description: description.value,
          id: categoryToUpdate.value.id,
        };
        try {
          const categoryService = new CategoryService();
          const ok = await categoryService.updateCategory(categoryData)
          if(ok){
            $q.notify({ type: 'positive', message: 'The Category has been updated', color: 'blue' })
            router.push("/categories-list");
          } else{
            $q.notify({ type: 'warning', message: 'It exists another category with this name'})
            getCategoryData()
          }

        } catch (error) {
          console.log(error);
        }
      },
      onReset() {
        emptyForm();
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
