<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-8 q-my-lg text-weight-bold text-h3 text-center">
        Administrators Management
      </div>
    </div>
    <q-separator inset />
    <div class="row justify-center col-12 col-md-8 q-mt-sm">
      <q-btn
        class="col-12 col-md-8"
        color="primary"
        icon="add"
        label="New Administrator"
        to="/add-administrator"
      />
    </div>
    <div class="row col-12 q-py-lg justify-center">
      <q-table
        :pagination="initialPagination"
        class="my-table col-12 col-md-8"
        title="Administrators"
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
              @click="updateAdministrator(props.row)"
            >
            </q-btn>
            <q-btn
              color="secondary"
              icon-right="assignment_ind"
              no-caps
              flat
              dense
              @click="assignAdministrator(props.row)"
            >
            </q-btn>
          </q-td>
        </template>
      </q-table>

    </div>
  </q-page>
</template>
<script>
import AdministratorService from "src/services/Administration/administrator.service.js";
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AdministratorListView",
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
      {
        name: "surname",
        align: "left",
        label: "SURNAME",
        field: "surname",
        sortable: true,
      },
      {
        name: "email",
        align: "left",
        label: "EMAIL",
        field: "username",
        sortable: true,
      },
      { name: "action", label: "MODIFY", field: "action" },
    ];
    const rows = ref([]);

    onMounted(async () => {
      const administratorService = new AdministratorService();
      const response = await administratorService.listAllAdministrators();
      const tempArray = [];
      tempArray.value = await response.forEach((element) => {
        const administrator = [];
        administrator.id = element.id;
        administrator.name = element.name;
        administrator.surname = element.surname;
        administrator.username = element.username;
        administrator.password = element.password;

        tempArray.push(administrator);
      });
      rows.value = response;
    });

    const saveDataOnStore = (administrator) => {
      const administratorToUpdate = {
        id: administrator.id,
        username: administrator.username,
        name: administrator.name,
        surname: administrator.surname,
        password: administrator.password
      };
      store.commit("administration/changeElement", administratorToUpdate);
    };

    const updateAdministrator = (administrator) => {
      saveDataOnStore(administrator);
      router.push("update-administrator");
    };

    const assignAdministrator = (administrator) => {
      saveDataOnStore(administrator);
      router.push("assign-administrator");
    };

    return {
      columns,
      rows,
      updateAdministrator,
      saveDataOnStore,
      assignAdministrator,
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
