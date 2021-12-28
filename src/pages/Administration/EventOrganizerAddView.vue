<template>
  <div class="row justify-center">
    <div class="text-h2 q-my-lg text-center">New Event's Organizer</div>
  </div>
  <q-separator inset />

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
            'Please type the name of the event organizer',
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
        <q-btn label="Reset" type="reset" color="blue" class="col-12 q-mt-sm" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import EventOrganizerService from "src/services/Administration/eventorganizer.service";
import {useQuasar} from "quasar";

export default {
  name: "EventOrganizerAddView",

  setup() {
    const name = ref(null);
    const description = ref(null);
    const router = useRouter();
    const $q = useQuasar()

    return {
      name,
      description,
      async onSubmit() {
        const organizer = {
          name: name.value,
          description: description.value,
        };
        console.log(organizer);
        try {
          const eventOrganizerService = new EventOrganizerService();
          const ok = await eventOrganizerService.addEventOrganizer(organizer);
          if (ok){
            $q.notify({ type: 'positive', message: 'The new Event organizer has been created', color: 'blue' })
            router.push("/organizers-list");
          } else {
            $q.notify({ type: 'warning', message: 'It exists an Event organizer with this name'})
            name.value = ''
          }

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
