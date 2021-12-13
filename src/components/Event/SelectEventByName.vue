<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row relative-position">
      <q-input
        v-model="textName"
        dense
        filled
        type="search"
        label="Search by Name"
        placeholder="Start typing..."
        @keyup="findEvents(textName)"
      >
        <template v-slot:append>
          <q-icon name="search" @click="findEvents(textName)" />
        </template>
      </q-input>
      <div
        class="
          column
          text-weight-bold
          absolute-right
          q-mt-xl
          shadow-2
          bg-gray-2
          text-black
        "
        style="top: 25px; width: 92%"
      >
        <q-list bordered separator class="bg-white">
          <q-item
            clickable
            v-ripple
            v-for="result in searchResults"
            :key="result.id"
            style="width: 100%"
          >
            <q-item-section @click="goToEvent(result.id)">{{
                result.name
              }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import EventService from "../../services/Event/event.service";
import { useRouter } from "vue-router";

export default {
  setup() {
    const searchResults = ref(null);
    const store = useStore();
    const router = useRouter();
    const textName = ref(null);

    const findEvents = async (text) => {
      console.log(text);
      if (text.length) {
        const eventService = new EventService();
        const results = await eventService.findEventsByName(text);
        console.log(results);
        const res = [];
        results.forEach((element) => res.push(element));
        console.log(res.slice(0, 3));
        searchResults.value = res;
      }
    };

    const emptyResults = () => {
      console.log("emptying");
      searchResults.value = null;
      textName.value = "";
    };

    const goToEvent = (idEvent) => {
      emptyResults();
      router.push({ name: "event", params: { id: idEvent } });
    };

    return {
      textName,
      goToEvent,
      findEvents,
      searchResults,
      emptyResults,
    };
  },
};
</script>
