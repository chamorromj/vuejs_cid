<template>
  <q-page class="q-ma-md">
    <div class="row col-12 q-py-lg justify-center">
      <q-table
        class="col-12 col-md-10"
        title="Favorites"
        :rows="rows"
        :pagination="initialPagination"
        :columns="columns"
        row-key="name"
        :loading="loading"
        no-data-label="There are still no favorites"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="accent"
                round
                dense
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'">
              <!--<q-tooltip>Click to read/close description</q-tooltip>-->
              </q-btn>
            </q-td>
            <q-td
              class="cursor-pointer"
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              @click="goToDetail(props.row.eventId)"
            >
              <span v-if="col.name === 'iniDate'"> {{ formatDate(col.value) }}</span>
              <span v-if="col.name === 'endDate'"> {{ formatDate(col.value) }}</span>
              <span v-if="col.name !== 'iniDate' && col.name !== 'endDate' && col.name !== 'picture'"> {{ col.value }}</span>


              <q-avatar v-if="col.name == 'picture'" square>
                <img :src= "`data:image/png;base64,${props.row.img}`"/>
              </q-avatar>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left ellipsis" style="white-space: break-spaces">{{ props.row.description }}.</div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import EventService from "src/services/Event/event.service";
import MediaService from "src/services/Media/media.service";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { API_URL } from "src/utils/constants";
import { date } from "quasar";
import { useStore } from "vuex";
import moment from "moment";

export default {
  name: "FavoritesListView",
  setup() {
    const favorites = computed(() => store.getters["media/getFavorites"]);
    const router = useRouter();
    const store = useStore();
    const loading = ref(true)

    const columns = [
      {
        name: "picture",
        label: "Picture",
        align: "left",
        field: "img",
      },
      {
        name: "name",
        align: "center",
        label: "Name",
        field: "name",
        sortable: true,
      },
      {
        name: "iniDate",
        label: "Initial Date",
        field: "startDate",
        sortable: true,
      },
      {
        name: "endDate",
        label: "End Date",
        field: "endDate",
        sortable: true,
      },
      {
        name: "ratting",
        label: "Rating",
        field: "avgRate",
        sortable: true,
      },
    ];
    const rows = ref([]);
    let favs = [];
    let favsRecovered = [];

    onMounted(async () => {
      loading.value = true
      const user = computed(() => store.getters["user/getUser"]);
      let userId = (!user.value) ? localStorage.getItem("userId") : user.value.id
      const mediaService = new MediaService();
      favs = await mediaService.listAllFavoritesByUser(userId);

      for (let fav of favs) {
        let favorite = await incorporateEventDataToFav(fav)
        favsRecovered.push(favorite);
      }
      await store.dispatch("media/addFavorites", favsRecovered);
      rows.value = favorites.value;

      loading.value = false
    });



    const incorporateEventDataToFav = async (eventContent) => {
      const eventService = new EventService();
      const eventRestored = await eventService.getEventById(
        eventContent.eventId
      );
      const fav = {
        eventId: eventRestored.id,
        name: eventRestored.name,
        img: eventRestored.img,
        startDate: eventRestored.startDate,
        endDate: eventRestored.endDate,
        avgRate: eventRestored.avgRate,
        description: eventRestored.description,
      };
      return fav;
    };

    const formatDate = (anyDate) => {
      return date.formatDate(anyDate, "D-MM-YYYY HH:mm");
    };

    const goToDetail = async (idEvent) => {
      const eventService = new EventService();
      const eventSelected = await eventService.getEventById(idEvent);
      store.commit("event/setEvent", eventSelected);
      router.push({ name: "event", params: { id: idEvent } });
    };

    return {
      loading,
      favorites,
      columns,
      rows,
      formatDate,
      goToDetail,
      API_URL,
      incorporateEventDataToFav,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
    };
  },
};
</script>

