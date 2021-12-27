<template>
  <q-page class="q-ma-md">
    <div class="text-h4">Purchases</div>

    <div class="q-pa-md">
      <q-table title="Purchases" :rows="rows" :columns="columns" row-key="name">
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
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span v-if="col.name != 'picture'"> {{ col.value }}</span>

              <q-avatar v-if="col.name == 'picture'" square>
                <img :src="props.row.picture" />
              </q-avatar>
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left coursor-pointer text-subtitle2 text-bold">
                <div
                  class="cursor-pointer text-blue"
                  @click="accessEvent(props.row.location)"
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
export default {
  name: "FavoritesListView",
  setup() {
    let orders = [];
    const router = useRouter();
    const store = useStore();

    const columns = [
      {
        name: "picture",
        label: "Picture",
        align: "left",
        field: "picture",
        sortable: true,
      },
      {
        name: "name",
        align: "center",
        label: "Name",
        field: "name",
        sortable: true,
      },
      {
        name: "orderId",
        align: "center",
        label: "Order Id",
        field: "orderId",
        sortable: true,
      },
      {
        name: "iniDate",
        label: "Initial Date",
        field: "iniDate",
        sortable: true,
      },
      {
        name: "orderDate",
        label: "Order Date",
        field: "date",
        sortable: true,
      },
    ];
    const rows = ref([]);

    onMounted(async () => {
      const userService = new UserService();
      const orderService = new OrderService();
      const user = computed(() => store.getters["user/getUser"]);
      console.log(user.value);
      orders = await orderService.listOrdersByUser(user.value.email);
      console.log(orders);
      orders.forEach((element) =>
        rows.value.push({
          picture: API_URL + element.event.picture.formats.thumbnail.url,
          name: element.event.name,
          orderId: element.orderId,
          iniDate: formatDate(element.event.iniDate),
          orderDate: formatDate(element.date),
          location: element.event.location,
        })
      );
      console.log(orders);
    });

    const formatDate = (date) => {
      return moment(date).format("D-MM-YYYY HH:mm");
    };

    return {
      orders,
      columns,
      rows,
      formatDate,
      API_URL,
      accessEvent: (url) => openURL(url),
    };
  },
};
</script>

<style></style>
