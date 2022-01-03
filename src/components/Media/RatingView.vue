<template>
  <div class="q-ma-sm text-bold">
    Average rate of the event is:
    <div class="q-gutter-y-md column">
      <q-rating
        model-value="event.avgRate"
        v-model="avgRate"
          size="2em"
          color="secondary"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          readonly
      />
      <span class="q-mt-sm" v-if="user && !isPreviouslyRated">
                Please, feel free to let your rating and your comment</span
      >
      <q-rating
          v-if="user && !isPreviouslyRated"
          v-model="userRating"
          size="2em"
          color="secondary"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          @click="setRating"
      />



      <q-rating
          v-else-if="user"
          v-model="userRating"
          size="2em"
          readonly
          color="secondary"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          @click="setRating"
      />

      <span class="q-mt-sm" v-if="user">
                You rated: {{ userRating }}</span
      >
      <span v-else-if="!user" class="q-mt-sm">Register to rate this event</span>
    </div>
  </div>
</template>
<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useQuasar} from "quasar";


export default {
  name: 'RatingView',
  props: {
    event: Object,
  },
  setup(props){
    const isPreviouslyRated = computed(() => store.getters["media/isPreviouslyRated"]);
    let newRating = null;
    const userRating = ref(0);
    const user = computed(() => store.getters["user/getUser"]);
    const store = useStore();
    const route = useRoute();
    const $q = useQuasar()
    const avgRate = ref("")

    onMounted(async() => {
      if(user.value){
        let isRated = await store.dispatch("media/getRate", route.params.id )
        if(isRated) {
          userRating.value = isRated
          await store.commit("media/addRating", isRated)
        }

      }
      avgRate.value = props.event.avgRate

    })

    const setRating = async () => {
      newRating = {
        userId: user.value.id,
        eventId: store.getters["event/getEventId"],
        rate: userRating.value,
      }

      const ok = await store.dispatch("media/addRating", newRating)
      if(ok){
        $q.notify({ type: 'positive', message: 'Thanks for your rating!', color: 'blue' })
      } else {
        $q.notify({ type: 'warning', message: "Server error. Retry later", color: 'secondary' })
      }
    };

    return{
      isPreviouslyRated,
      setRating,
      avgRate,
      user,
      userRating
    }

  }
}
</script>
