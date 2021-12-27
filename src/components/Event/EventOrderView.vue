<template>
  <q-dialog>
    <q-card style="width: 600px; max-width: 60vw">
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
        <div class="text-h6">Order tickets for {{ event.name }}</div>
      </q-card-section>
      <q-separator inset></q-separator>
      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs"
                  >Number of tickets to buy</q-item-label
                >
                <q-input
                  v-model.number="numberOfTickets"
                  type="number"
                  outlined
                  style="max-width: 200px"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="warning"
            dense
            v-close-popup
          ></q-btn>
          <q-btn
            flat
            label="BUY"
            color="primary"
            dense
            v-close-popup
            @click="buyTickets"
          ></q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {computed, ref} from "vue";
import EventDetailComponent from "components/Event/EventDetailComponent.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import OrderService from "src/services/Event/order.service";
export default {
  name: "EventOrderView",
  props: {
    event: Object,
  },
  setup(props) {
    const orderService = new OrderService()
    const userId = localStorage.getItem("userId")
    const numberOfTickets = ref(0);



    return {
      numberOfTickets,
      buyTickets: async ()=>{
        let order = {
          userId: userId,
          eventId: props.event.id,
          numTickets: numberOfTickets.value,
          date: Date.now()
        }
        console.log(order)
        await orderService.addOrder(order)
      }
    };
  },
};
</script>

<style></style>
