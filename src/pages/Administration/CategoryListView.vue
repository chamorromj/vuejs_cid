<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-8 q-my-lg text-weight-bold text-h3 text-center">
        Categories Management
      </div>
    </div>
    <q-separator inset />
    <div class="row justify-center col-12 col-md-8 q-mt-sm">
        <q-btn
          class="col-12 col-md-8"
          color="primary"
          icon="add"
          label="New Category"
          to="/add-category"
        />
    </div>
    <div class="row col-12 q-py-lg justify-center">
      <q-table
        :pagination="initialPagination"
        class="my-table col-12 col-md-8"
        title="Categories"
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
              @click="updateCategory(props.row)"
            >
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import CategoryService from "../../services/Administration/category.service";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CategoryListView",

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
      const categoryService = new CategoryService();
      const response = await categoryService.listAllCategories();
      const tempArray = [];
      tempArray.value = await response.forEach((element) => {
        const category = [];
        category.id = element.id;
        category.name = element.name;
        category.description = element.description;
        tempArray.push(category);
      });
      rows.value = tempArray;
    });

    const updateCategory = (category) => {
      const categoryToUpdate = {
        id: category.id,
        name: category.name,
        description: category.description,
      };
      store.commit("administration/changeElement", categoryToUpdate);
      router.push("update-category");
    };

    return {
      columns,
      rows,
      updateCategory,
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
