<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-8 q-my-lg text-weight-bold text-h3 text-center">
        Event Organizers Management
      </div>
    </div>
    <q-separator inset />
    <div class="row justify-center col-12 col-md-8 q-mt-sm">
        <q-btn
          class="col-12 col-md-8"
          color="primary"
          icon="add"
          label="New Organizer"
          to="/add-organizer"
        />
    </div>
    <div class="row col-12 q-py-lg justify-center">
      <q-table
        :pagination="initialPagination"
        class="my-table col-12 col-md-8"
        title="Event Organizers"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon-right="edit"
              no-caps
              flat
              dense
              @click="updateOrganizer(props.row)"
            >
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import EventOrganizerService from "src/services/Administration/eventorganizer.service";
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EventOrganizerListView",
  setup() {
    const store = useStore();
    const router = useRouter();
    const columns = [
      { name: "id", align: "center", label: "ID", field: "id", sortable: true },
      {
        name: "name",
        align: "left",
        label: "NAME",
        field: "name",
        sortable: true,
      },
      { name: "description", label: "DESCRIPTION", field: "description" },
      { name: "action", label: "UPDATE", field: "action" },
    ];
    const rows = ref([]);

    onMounted(async () => {
      const eventOrganizerService = new EventOrganizerService();
      const response = await eventOrganizerService.listAllEventOrganizers();
      rows.value = response;
    });

    const updateOrganizer = (organizer) => {
      const organizerToUpdate = {
        id: organizer.id,
        name: organizer.name,
        description: organizer.description,
      };
      store.commit("administration/changeElement", organizerToUpdate);
      router.push("update-organizer");
    };

    return {
      columns,
      rows,
      updateOrganizer,

      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
});
</script>
<style lang="sass">
.my-table

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  min-width: 800px

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #fff

  td:first-child
    background-color: #f5f5dc

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
