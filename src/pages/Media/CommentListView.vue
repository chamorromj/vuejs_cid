<template>
  <template v-if="comments">
    <div class="row q-pa-md" style="max-width: 800px">
      <q-list padding>
        <q-item-label header class="text-h5 text-bold"
        >Comments
        </q-item-label
        >
        <template v-for="comment in comments" :key="comment.id">
          <q-item class="wrap" v-ripple>
            <q-item-section top avatar>
              <q-avatar color="primary" v-if="comment.userId">
                {{ getFirstLetter(comment.name) }}
              </q-avatar
              >
              <q-avatar color="primary" v-else>
                A
              </q-avatar
              >
            </q-item-section>

            <q-item-section>
              <q-item-label v-if="comment.name">{{ comment.name }}</q-item-label>
              <q-item-label v-else>Anonymous</q-item-label>
              <q-item-label caption :lines="2" class="wrap" style="white-space: break-spaces">{{ comment.comment }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption
              ><span v-if="comment.createdAt">{{formatDate(comment.createdAt)}}</span>
                <span v-else>{{formatDate(Date.now())}}</span></q-item-label
              >
            </q-item-section>
          </q-item>
          <q-separator inset="item"/>
        </template>
      </q-list>
    </div>
  </template>

</template>
<script>
import {date} from "quasar";

export default {
  name: 'CommentListView',
  props: {
    comments: Array
  },
  setup(){
    const formatDate = (dateToFormat) => {
      return date.formatDate(dateToFormat, "D-MM-YYYY HH:mm");
    };
    const getFirstLetter = (name) => {
      return name.slice(0, 1);
    };
    return{
      formatDate,
      getFirstLetter
    }
  }
}
</script>
