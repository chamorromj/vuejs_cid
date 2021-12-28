<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center">New Label</div>
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
        <q-btn label="Reset" type="reset" color="blue"  class="col-12 q-mt-sm" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import {useQuasar} from "quasar";

export default {
  name: "LabelAddView",

  setup() {
    const name = ref(null);
    const description = ref(null);
    const router = useRouter();
    const $q = useQuasar()

    const emptyForm = () => {
      name.value = null;
      description.value = null;
    };

    return {
      name,
      description,

      async onSubmit() {
        const label = {
          name: name.value.toLowerCase(),
          description: description.value,
        };
        try {
          const labelService = new LabelService();
          const ok = await labelService.addLabel(label);
          if (ok){
            $q.notify({ type: 'positive', message: 'Label has been created', color: 'blue', icon: 'thumb_up' })
            await router.push("/labels-list");
          } else{
            $q.notify({ type: 'warning', message: 'It exists a label with this name'})
            name.value = ''
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
