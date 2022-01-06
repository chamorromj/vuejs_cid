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
                  @keyup.enter="buyTickets"
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
import { ref } from "vue";
import OrderService from "src/services/Event/order.service";
import {useQuasar} from "quasar";
export default {
  name: "EventOrderView",
  props: {
    event: Object,
  },
  setup(props) {
    const orderService = new OrderService()
    const $q = useQuasar()
    const userId = localStorage.getItem("userId")
    const numberOfTickets = ref(0);

    const buyTickets = async ()=>{
      if(numberOfTickets.value >0){
        if(numberOfTickets.value > props.event.availableTickets){
          let message = 'Sorry, not enough tickets remaining for this event. They are only ' + props.event.availableTickets + ' tickets available'
          numberOfTickets.value = props.event.availableTickets
          $q.notify({ type: 'warning', message: message })
          return
        }

        let order = {
          userId: userId,
          eventId: props.event.id,
          numTickets: numberOfTickets.value,
          date: Date.now()
        }
        const ok = await orderService.addOrder(order)
        if(ok){
          $q.notify({type:"positive", message: "Thanks for your order!", color: "blue"})
        } else {
          $q.notify({ type: 'warning', message: 'Sorry, not enough tickets remaining for this event' })
        }
      } else{
        numberOfTickets.value = 0
        $q.notify({ type: 'warning', message: 'Sorry, the number introduced is wrong' })
      }
    }


    return {
      numberOfTickets,
      buyTickets
    };
  },
};
</script>

<style></style>
