<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center">New Category</div>
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
        v-model="description"
        label="Description"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Please type the description',
        ]"
      />

      <div class="row justify-right">
        <q-btn label="Submit" type="submit" class="col-12" color="primary" />
        <q-btn label="Reset" type="reset" class="col-12 q-mt-sm" color="blue" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import {useQuasar} from "quasar";

export default {
  name: "CategoryAddView",

  setup() {
    const name = ref(null);
    const description = ref(null);
    const router = useRouter();
    const $q = useQuasar()

    return {
      name,
      description,
      async onSubmit() {
        const category = {
          name: name.value,
          description: description.value,
        };
        try {
          const categoryService = new CategoryService();
          await categoryService.addCategory(category);
          $q.notify({ type: 'positive', message: 'The new Category has been created', color: 'blue' })
          router.push("/categories-list");
        } catch (error) {
          console.log(error);
        }
      },
      onReset() {
        name.value = null;
        description.value = null;
      },
    };
  },
};
</script>

