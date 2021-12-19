<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center">Update Event Organizer</div>
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
        <q-btn label="Submit" type="submit" class="col-12 q-mt-sm" color="primary" />
        <q-btn
          label="Cancel"
          type="button"
          color="secondary"
          to="/organizers-list"
          class="col-12 q-mt-sm"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import EventOrganizerService from "../../services/Administration/eventorganizer.service";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {useQuasar} from "quasar";

export default {
  name: "CategoryAddView",

  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar()
    const organizerToUpdate = ref(null);

    let name = ref("");
    let description = ref("");

    onMounted(async () => {
      const organizer = computed(
        () => store.getters["administration/getElement"]
      );
      organizerToUpdate.value = organizer.value;
      name.value = organizer.value.name;
      description.value = organizer.value.description;
    });

    const emptyForm = () => {
      name.value = null;
      description.value = null;
    };

    return {
      name,
      description,
      emptyForm,
      organizerToUpdate,
      async onSubmit() {
        const organizerData = {
          name: name.value,
          description: description.value,
          id: organizerToUpdate.value.id,
        };
        try {
          const eventOrganizerService = new EventOrganizerService();
          await eventOrganizerService.updateEventOrganizer(organizerData);
          $q.notify({ type: 'positive', message: 'The Event organizer has been updated', color: 'blue' })
          router.push("/organizers-list");
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

