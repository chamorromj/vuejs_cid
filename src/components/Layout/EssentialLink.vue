<template>
  <q-item clickable tag="a" @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-weight-bold">{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "#",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    return {
      navigateTo() {
        if (props.link.includes("events/")) {
          const category = props.link
            .substring(
              props.link.lastIndexOf("/") + 1,
              props.link.length + props.link.lastIndexOf("/")
            )
            .trim()
            .toLowerCase();
          router.push({ name: "events", params: { category: category } });
        } else {
          router.push({ name: props.link });
        }
      },
    };
  },
});
</script>
