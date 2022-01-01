<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-8 q-my-lg text-weight-bold text-h3 text-center">
        Events Management
      </div>
    </div>
    <q-separator inset />
    <div class="row justify-center col-12 col-md-8 q-mt-sm">
      <q-btn color="primary" icon="add" class="col-12 col-md-10" label="New Event" to="/add-event" />
    </div>
    <div class="row col-12 q-py-lg justify-center">
      <q-table
        :pagination="initialPagination"
        class="my-table col-12 col-md-10"
        title="Events"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :loading="loading"
      >
<!--        <template #loading>
          <q-inner-loading
            showing
            color="primary"
          />
        </template>-->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon-right="edit"
              no-caps
              flat
              dense
              @click="updateEvent(props.row)"
            >
              <q-tooltip>Update event</q-tooltip>
            </q-btn>
            <q-btn
              color="secondary"
              icon-right="label"
              no-caps
              flat
              dense
              @click="addLabels(props.row)"
            >
              <q-tooltip>Add labels</q-tooltip>
            </q-btn>
            <q-btn
              color="secondary"
              icon-right="label_off"
              no-caps
              flat
              dense
              @click="removeLabels(props.row)"
            >
              <q-tooltip>Remove labels</q-tooltip>
            </q-btn>
            <q-btn
              color="blue"
              icon-right="change_circle"
              no-caps
              flat
              dense
              @click="changeCategory(props.row)"
            >
              <q-tooltip>Change category</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <q-dialog v-model="show_addLabel">
    <q-card style="width: 600px">
      <q-card-section>
        <q-btn
          round
          flat
          dense
          icon="close"
          class="float-right"
          color="grey-8"
          v-close-popup
        ></q-btn>
        <div class="text-h6">Add labels to the event</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-select
          label="Choose the labels to add..."
          v-model="labelsSelected"
          multiple
          :options="listOfLabels"
          use-chips
          stack-label
          option-label="name"
          option-value="id"
          map-options
          emit-value>
          <template v-slot:prepend>
            <q-icon name="label" />
          </template>
          <template v-slot:append>
            <q-avatar>
              <img src="~assets/avatar_logo.png">
            </q-avatar>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="SAVE"
            color="primary"
            dense
            v-close-popup
            @click="selectLabels"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card
    >
  </q-dialog>


  <EventCategoryChangeView v-model="show_changeCategory"/>

  <EventRemoveLabelView v-model="show_removeLabel"/>

</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import EventService from "../../services/Event/event.service.js";
import {date, useQuasar} from "quasar";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import LabelService from "src/services/Administration/label.service";
import EventCategoryChangeView from "pages/Event/EventCategoryChangeView";
import CategoryService from "src/services/Administration/category.service";
import EventRemoveLabelView from "pages/Event/EventRemoveLabelView";
import _ from 'lodash';
import EventOrganizerService from "src/services/Administration/eventorganizer.service";

export default defineComponent({
  name: "EventsManagement",
  components: { EventRemoveLabelView, EventCategoryChangeView},
  setup() {
    const router = useRouter();
    const columns = [
      { name: "id", align: "center", label: "ID", field: "id", sortable: true },
      {
        name: "name",
        align: "center",
        label: "Name",
        field: "name",
        sortable: true,
      },
      { name: "ratting", label: "Rating", field: "avgRate", align: "center", sortable: true },
      { name: "location", label: "Location", field: "url", align: "center", sortable: true },
      { name: "inDate", label: "Init Date", field: "startDate", align: "center", sortable: true },
      { name: "endDate", label: "End Date", field: "endDate", align: "center" },
      { name: "action", label: "Actions", field: "action", align: "center" },
    ];
    const rows = ref([]);
    let show_addLabel = ref(false)
    let show_removeLabel = ref(false)
    let show_changeCategory = ref(false)
    const store = useStore()
    const $q = useQuasar()
    const selectedEvent = ref(null)
    const loading = ref(true)
    const listOfLabels = ref()
    const labelsSelected = ref(null);
    const eventLabels = ref([])
    const userId = store.getters["user/getUserId"]
    const eventsToList = []

    onMounted(async () => {
      loading.value = true
      const eventService = new EventService();
      const eventOrganizerService = new EventOrganizerService()
      const organizers= await eventOrganizerService.getEventOrganizersByAdministrator(userId);
      for (const organizer of organizers) {
        const organizerEvents = await eventService.getEventsByAdministratorEventOrganizers(organizer.id);
        organizerEvents.forEach((event)=>{
          eventsToList.push(event)
        })
      }
      store.commit("event/setEvents", eventsToList)
      const tempArray = [];
      eventsToList.forEach((element) => {
        const event = [];
        event.id = element.id;
        event.name = element.name;
        event.description = element.description;
        event.avgRate = element.avgRate;
        event.url = element.url;
        event.startDate = formatDate(element.startDate);
        event.endDate = formatDate(element.endDate);
        tempArray.push(event);
      });
      rows.value = tempArray;


      loading.value = false
    });


    const formatDate = (anyDate) => {
      return date.formatDate(anyDate, "DD-MM-YYYY HH:mm");
    };

    const updateEvent = (event) => {
      store.commit("event/setEvent", event)
      router.push({ name: "UpdateEvent", params: { id: event.id } });
    }

    const addLabels = async (event) => {
      store.commit("event/setEvent", event)
      selectedEvent.value = event
      const labelService = new LabelService()
      listOfLabels.value = await labelService.listAllLabels()
      eventLabels.value = await labelService.getLabelsByEventId(event.id)
      let result = _.differenceBy(listOfLabels.value, eventLabels.value, 'id');
      listOfLabels.value = result
      await store.commit("event/setEventLabels", listOfLabels.value)
      show_addLabel.value = true
    }

    const removeLabels = async (event) => {
      store.commit("event/setEvent", event)
      await store.dispatch("event/addEventLabels")
      show_removeLabel.value = true;
    }

    const changeCategory = async (eventRow) => {
      let eventId = eventRow.id
      const eventService = new EventService();
      const event = await eventService.getEventById(eventId);
      store.commit("event/setEvent", event)
      let categoryId = event.categoryId
      const categoryService = new CategoryService()
      let category = await categoryService.getCategoryById(categoryId)
      store.commit("event/setEventCategory", category)
      show_changeCategory.value = true
    }

    const selectLabels = async () =>{
      for (let labelId of labelsSelected.value){
        await store.dispatch("event/addEventLabel", labelId)
      }
      $q.notify({ type: 'positive', message: 'Labels selected have been added to the event', color: 'blue' });
      labelsSelected.value = null;
    }



    return {
      listOfLabels,
      labelsSelected,
      selectLabels,
      loading,
      changeCategory,
      selectedEvent,
      show_changeCategory,
      updateEvent,
      addLabels,
      removeLabels,
      show_addLabel,
      show_removeLabel,
      formatDate,
      columns,
      rows,
      initialPagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10
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
