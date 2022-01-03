<template>
  <q-page class="q-ma-md">
    <q-dialog v-model="showAccess">
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
          <div class="text-h6">Access to the event</div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs"><strong>Event:</strong> {{ orderToAccess.name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs"><strong>Reservation number:</strong> {{ orderToAccess.reservationId }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs"><strong>Number of tickets bought:</strong> {{ orderToAccess.numTickets }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator/>
            </q-list>
          </q-form>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn
              label="CANCEL"
              color="secondary"
              dense
              v-close-popup
            ></q-btn>
            <q-btn
              label="GO"
              color="primary"
              dense
              v-close-popup
              @click="accessEvent"
            ></q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card
      >
    </q-dialog>
    <div class="row col-12 q-py-lg justify-center">
      <q-table class="col-12 col-md-10" title="Orders" :pagination="initialPagination" no-data-label="There are still no orders" :rows="rows" :columns="columns" row-key="name" :loading="loading">
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
                :icon="props.expand ? 'remove' : 'add'"
              />
            </q-td>
              <q-td
                class="cursor-pointer"
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                @click="goToDetail(props.row.eventId)"
              >

              <span v-if="col.name === 'iniDate'"> {{ formatDate(col.value) }}</span>
              <span v-if="col.name === 'orderDate'"> {{ formatDate(col.value) }}</span>
              <span v-if="col.name !== 'iniDate' && col.name !== 'orderDate' && col.name !== 'picture'"> {{ col.value }}</span>

              <q-avatar v-if="col.name == 'picture'" square>
                <img :src= "`data:image/png;base64,${props.row.img}`"/>
              </q-avatar>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left coursor-pointer text-subtitle2 text-bold">
                <div
                  class="cursor-pointer text-blue"
                  @click="openAccess(props.row)"
                >
                  >>ENTER TO THE EVENT
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import OrderService from "src/services/Event/order.service";
import UserService from "src/services/Profile/user.service";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { API_URL } from "src/utils/constants";
import moment from "moment";
import { useStore } from "vuex";
import { openURL } from "quasar";
import EventService from "src/services/Event/event.service";
import Swal from "sweetalert2";
export default {
  name: "OrderListView",
  setup() {
    let orders = [];
    let eventsRecovered = [];
    const router = useRouter();
    const store = useStore();
    const showAccess = ref(false)
    const orderToAccess = ref(null)

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
        name: "reservationId",
        align: "center",
        label: "Reservation Id",
        field: "reservationId",
        sortable: true,
      },
      {
        name: "numTickets",
        align: "center",
        label: "Number of Tickets",
        field: "numTickets",
      },
      {
        name: "orderDate",
        label: "Order Date",
        field: "date",
        sortable: true,
      },
    ];
    const rows = ref([]);
    const loading = ref(true)

    onMounted(async () => {
      loading.value = true
      const user = computed(() => store.getters["user/getUser"]);
      const orderService = new OrderService();
      orders = await orderService.listOrdersByUser(user.value);
      if(orders.length === 0){
        rows.value = []
      } else {
        for (let order of orders) {
          let eventData = await incorporateEventDataToOrder(order)
          eventsRecovered.push(eventData);
        }
        rows.value = eventsRecovered
      }
      loading.value = false
    })

    const incorporateEventDataToOrder = async (orderContent) => {
      const eventService = new EventService();
      const eventRestored = await eventService.getEventById(
        orderContent.eventId
      );
      const orderData = {
        eventId: eventRestored.id,
        name: eventRestored.name,
        img: eventRestored.img,
        startDate: eventRestored.startDate,
        url: eventRestored.url,
        reservationId: orderContent.reservationId,
        numTickets: orderContent.numTickets,
        orderDate: orderContent.date
      };
      return orderData;
    };

    const formatDate = (date) => {
      return moment(date).format("D-MM-YYYY HH:mm");
    };

    const goToDetail = async (idEvent) => {
      const eventService = new EventService();
      const eventSelected = await eventService.getEventById(idEvent);
      store.commit("event/setEvent", eventSelected);
      router.push({ name: "event", params: { id: idEvent } });
    };

    return {
      showAccess,
      orderToAccess,
      orders,
      goToDetail,
      columns,
      rows,
      loading,
      formatDate,
      API_URL,
      openAccess: (order)=>{
        orderToAccess.value = order
        showAccess.value = true
      },
      accessEvent: () => {
        let url = orderToAccess.value.url
        if(!url.includes("http://")) {
          url = "http://" + url
        }
        window.open(url, "_blank")
      },
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

