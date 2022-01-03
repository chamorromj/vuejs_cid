<template>

  <q-field
    color="gray"
    filled
    standout
    label="Response"
    stack-label
    label-color="secondary"
    class="q-ml-xl q-mt-sm"
  >
    <template v-slot:label>
      <div class="row items-center all-pointer-events text-subtitle2 q-mb-sm">
        <q-icon
          class="q-mr-xs"
          color="primary"
          size="sm"
          name="question_answer"
        />
        Answered on: {{ formatDate(response.createdAt) }}
      </div>
    </template>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">
        {{ response.message }}
      </div>
    </template>
  </q-field>
</template>

<script>
import { date } from "quasar";
export default {
  name: "ResponseDetailView",
  props: {
    response: Object,
  },
  setup() {
    const formatDate = (anyDate) => {
      return date.formatDate(anyDate, "YYYY-MM-DD HH:mm");
    };
    return {
      formatDate,

    };
  },
};
</script>

