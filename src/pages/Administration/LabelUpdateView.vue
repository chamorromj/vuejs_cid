<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center">Update Label</div>
  </div>
  <q-separator inset color="secondary" />

  <div class="row q-pa-md justify-center">
    <q-form
      @submit="onSubmit"
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
            (val !== null && val !== '') || 'Please type the name of the label',
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
        <q-btn
          label="Cancel"
          type="button"
          color="secondary"
          to="/labels-list"
          class="col-12 q-mt-sm"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import LabelService from "../../services/Administration/label.service";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from 'quasar'

export default {
  name: "LabelUpdateView",

  setup() {
    let name = ref("");
    let description = ref("");
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar()
    const labelToUpdate = ref(null);

    onMounted(async () => {
      const label = computed(() => store.getters["administration/getElement"]);
      labelToUpdate.value = label.value;
      name.value = label.value.name;
      description.value = label.value.description;
    });

    const emptyForm = () => {
      name.value = null;
      description.value = null;
    };

    return {
      name,
      description,
      emptyForm,
      labelToUpdate,
      async onSubmit() {
        const label = {
          name: name.value,
          description: description.value,
          id: labelToUpdate.value.id,
        };
        try {
          const labelService = new LabelService();
          const response = await labelService.updateLabel(label);
          $q.notify({ type: 'positive', message: 'Label has been updated', color: 'blue' })
          router.push("/labels-list");
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

<style lang="scss" scoped>
.add-label {
  text-align: center;
  > h2 {
    margin: 30px 0;
  }
  .ui.form {
    max-width: 300px !important;
    margin: 0 auto;
    margin-bottom: 10px;

    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
}
</style>
