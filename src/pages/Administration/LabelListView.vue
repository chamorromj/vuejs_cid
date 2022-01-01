<template>
  <q-page>
    <div class="row">
      <div class="col-8 q-my-lg text-weight-bold text-h3 text-center">
        Labels Management
      </div>
    </div>
      <q-separator inset />
      <div class="row justify-center col-12 col-md-8 q-mt-sm">
        <q-btn color="primary" icon="add" class="col-12 col-md-8" label="New Label" to="/add-label" />
      </div>
      <div class="row col-12 q-py-lg justify-center">
      <q-table
        :pagination="initialPagination"
        class="my-table col-12 col-md-8"
        title="Labels"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <!-- <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template> -->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon-right="edit"
              no-caps
              flat
              dense
              @click="updateLabel(props.row)"
            >
            </q-btn>
            <q-btn
              dense
              round
              flat
              color="red"
              @click="deleteLabel(props.row)"
              icon="delete"
            ></q-btn>
          </q-td>
        </template>
      </q-table>

      </div>
  </q-page>
</template>

<script>
import LabelService from "src/services/Administration/label.service";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import {useQuasar} from "quasar";



export default defineComponent({
  name: "LabelListView",

  setup() {
    const store = useStore();
    const router = useRouter();
    const labelService = new LabelService();
    const $q = useQuasar()
    // const filter = "";

    const columns = [
      { name: "id", align: "center", label: "ID", field: "id", sortable: true },
      {
        name: "name",
        align: "left",
        label: "NAME",
        field: "name",
        sortable: true,
      },
      {
        name: "description",
        label: "DESCRIPTION",
        field: "description",
        sortable: true,
      },
      { name: "action", label: "ACTIONS", field: "action" },
    ];

    const rows = ref([]);

    onMounted(async () => {
      const response = await labelService.listAllLabels();
      rows.value = response;
    });

    const deleteLabel = (label) => {
      const labelService = new LabelService();
      Swal.fire({
        title: "Are you sure?",
        text: "The label removed could not be restored",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "primary",
        confirmButtonText: "Yes, proceed!",
      }).then((result) => {
        if (result.isConfirmed) {
          labelService.removeLabel(label);
          rows.value = rows.value.filter((row) => row.id !== label.id);
          $q.notify({ type: 'positive', message: 'The label selected has been removed', color: 'blue' })
        }
      });
    };

    const updateLabel = (label) => {
      const labelToUpdate = {
        id: label.id,
        name: label.name,
        description: label.description,
      };
      store.commit("administration/changeElement", labelToUpdate);
      router.push("update-label");
    };
    return {
      columns,
      rows,
      updateLabel,
      deleteLabel,

      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      // filter,
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
