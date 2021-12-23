<template>
  <q-page>
    <div class="row justify-center">
      <div class="text-h2 q-my-lg text-center">Assign Administrator</div>
    </div>
    <q-separator inset color="blue" />

    <div class="row q-pa-md justify-center text-bold text-h5">
      Select the event organizer you want to assign to the administrator
    </div>

    <div class="text-h5 text-center q-ma-md">{{ administratorName }}</div>
    <div class="row q-px-lg justify-center">
      <div class="col-8">
        <q-select
          filled
          v-model="organizer_selected"
          :options="options_organizer"
          label="Event Organizer"
          autocomplete="organizers"
          option-label="name"
          option-value="id"
          map-options
          emit-value
        />
      </div>
    </div>
    <div class="row q-pa-lg justify-center">
      <div class="col-12 col-md-8">
        <q-btn label="Assign" class="bg-primary full-width" @click="assignOrganizer()" />
        <q-btn
          label="Cancel"
          type="button"
          color="secondary"
          to="/administrators-list"
          class="bg-primary full-width"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import AdministratorService from "../../services/Administration/administrator.service";
import EventOrganizerService from "src/services/Administration/eventorganizer.service";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "AdministratorAssignationView",

  setup() {
    const router = useRouter();
    const store = useStore();
    const administratorToUpdate = ref(null);
    const organizers = ref(null);
    const options_organizer = ref([]);
    let option = ref(null);
    const organizer_selected = ref("");
    const administratorName = ref("");
    const administratorId = ref("");

    onMounted(async () => {
      const administrator = computed(
        () => store.getters["administration/getElement"]
      );
      administratorToUpdate.value = administrator.value;
      administratorName.value =
        administrator.value.surname + ", " + administrator.value.name;
      administratorId.value = administrator.value.id;
      const organizerService = new EventOrganizerService();
      options_organizer.value = await organizerService.listAllEventOrganizers();

    });

    return {
      administratorName,
      administratorToUpdate,
      organizer_selected,
      organizers,
      options_organizer,
      option,
      assignOrganizer: async () => {
        if (organizer_selected.value){
          console.log(organizer_selected.value)
          const administratorService = new AdministratorService()
          let {ok} = await administratorService.assignAdministratorToEventOrganizer(administratorId.value, organizer_selected.value)
          if(ok){
            Swal.fire(
              "Assignation done!",
              organizer_selected.value.label +
              " has been assigned to " +
              administratorName.value,
              "success"
            );
            router.push("/administrators-list")
          }


        }


      },
    };
  },
};
</script>

<style></style>
