<template>
    <q-tabs
      v-model="tab"
      dense
      class="bg-grey-3 q-pt-md"
      align="justify"
      narrow-indicator
    >
      <q-tab name="data" label="1" />
      <q-tab name="others" label="2" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="data">

    <div class="row justify-center">
      <div class="text-h3 q-my-md text-center">Update Event <span class="text-h4">(starting...)</span></div>
    </div>
        <q-separator inset class="q-mb-md" color="primary"/>
        <div class="row q-px-lg justify-center">

          <div class="col-12 col-md-8 text-bold">
            Select the organizer of the event:
            <q-select
              filled
              class="q-my-md"
              v-model="eventOrganizerId"
              :options="options_organizer"
              label="Event Organizer"
              emit-value
              map-options
            />

          </div>
        </div>
      <div class="row q-px-lg justify-center">
        <div class="col-12 col-md-8 text-bold">
          Introduce the name of the event:
          <q-input
            class="q-mt-md"
            v-model="name"
            outlined
            type="text"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type the name of the event',
            ]"
          />
        </div>
        <div class="col-12 col-md-8 text-bold">
          Introduce the description of the event:
          <q-input
            class="q-mt-md"
            v-model="description"
            outlined
            type="textarea"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type the description of the event',
            ]"
          />
        </div>
      </div>
        <div class="row q-px-lg justify-center">

          <div class="col-12 col-md-8 ">
            <div class="row">
              <div class="col-sm" style="max-width: 300px">
                <div class="text-bold">Select the initial date:</div>
                <div class="q-gutter-md row items-start">
                  <q-input readonly clearable v-model="startDate">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="startDate=null" flat v-close-popup />
                              <q-btn label="SET" color="primary" flat v-close-popup />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="startDate" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="startDate=null" flat v-close-popup />
                              <q-btn label="SET" color="primary" flat v-close-popup />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-sm" style="max-width: 300px">
                <div class="text-bold">Select the end date:</div>
                <div class="q-gutter-md row items-start">
                  <q-input readonly clearable v-model="endDate">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="endDate=null" flat v-close-popup />
                              <q-btn label="SET" color="primary" flat v-close-popup />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="endDate" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="endDate=null" flat v-close-popup />
                              <q-btn label="SET" color="primary" flat v-close-popup />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>


          </div>
          <div class="col-12 col-md-8">
            <q-btn class="full-width q-mt-md" color="gray-2" text-color="primary" label="Continue" @click="tab='others'"/>
            <q-btn class="full-width q-mt-md" label="Cancel" type="button" color="secondary" to="/event-list"/>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="others">
        <div class="row justify-center">
          <div class="text-h3 q-my-md text-center">Update Event <span class="text-h4">(concluding...)</span></div>
        </div>
        <q-separator inset class="q-mb-md" color="primary"/>
        <div class="row q-px-lg justify-center">
          <div class="col-12 col-md-8 text-bold">
          Please, specify the location of the event:
          <q-input
            class="q-mt-md"
            v-model="url"
            outlined
            type="text"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type the location of the event',
            ]"
          />
        </div>
      </div>
        <div class="row q-px-lg justify-center">
          <div class="col-12 col-md-8 text-bold">
          <q-img style="height:150px; width: 300px"
                 :src= "`data:image/png;base64,${img}`" />
        </div>
        </div>
        <div class="row q-px-lg justify-center">


          <div class="col-12 col-md-8 text-bold q-mt-md">
            Change the actual picture for the event:

            <q-file color="teal" class="q-my-md" outlined label="Click to select the new picture" v-model="picture" @update:model-value="handleFileUpload( $event )">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
              <template v-slot:append>
                <q-avatar>
                  <img src="~assets/avatar_logo.png">
                </q-avatar>
              </template>
            </q-file>

          </div>
        </div>


      <div class="row q-px-lg justify-center">
        <div class="col-12 col-md-8 text-bold">
          Select the category to which the event fits better:
          <q-select
            class="q-mt-md"
            filled
            v-model="categoryId"
            :options="options"
            label="Category"
            emit-value
            map-options
          />
        </div>
      </div>


        <div class="row q-px-lg justify-center">
          <div class="col-12 col-md-8">
          <q-btn
            icon-right="send"
            label="Update the event"
            @click="submit"
            color="primary"
            class="full-width q-mt-md"
          />
        </div>
        </div>
        <div class="row q-px-lg justify-center">
          <div class="col-12 col-md-8">
          <q-btn
            label="Reset"
            @click="reset"
            color="secondary"
            text-color="white"
            class="full-width q-mt-md"
          />
        </div>
        </div>
        <div class="row q-px-lg justify-center">
          <div class="col-12 col-md-8">
            <q-btn
              label="Back"
              @click="tab='data'"
              color="gray-3"
              text-color="primary"
              class="full-width q-mt-md"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
</template>

<script>
import { date, useQuasar } from "quasar";
import EventProfileService from "../../services/Profile/eventprofile.service.js";
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import CategoryService from "../../services/Administration/category.service";
import EventOrganizerService from "src/services/Administration/eventorganizer.service";
import Swal from "sweetalert2";
import {useStore} from "vuex";

export default defineComponent({
  name: "NewEventForm",

  setup() {
    const router = useRouter();
    const store = useStore();
    const route = useRoute();
    const $q = useQuasar()
    let formDataUpdate = ref({})

    let categories = null;
    let organizers = null;
    let options = ref([]);
    let options_organizer = ref([]);
    let option = ref(null);
    let file = null
    let picture = ref(null);

    let eventOrganizerId = ref(null)
    let name = ref(null)
    let description = ref(null)
    let startDate = ref(null)
    let endDate = ref(null)
    let url = ref(null)
    let categoryId = ref(null)
    let img = ref(null)
    let id = ref(null)


    onMounted(async () => {
      let eventprofileService = new EventProfileService()
      let event = await eventprofileService.showEvent(route.params.id);
      eventOrganizerId.value = event.eventOrganizerId
      name.value = event.name
      description.value = event.description
      startDate.value = event.startDate
      endDate.value = event.endDate
      url.value = event.url
      categoryId.value = event.categoryId
      img.value = event.img
      id.value = event.id
      const eventOrganizerService = new EventOrganizerService();
      organizers = await eventOrganizerService.listAllEventOrganizers();
      organizers.forEach((element) => {
        option = {
          label: element.name,
          value: element.id,
        };
        options_organizer.value.push(option);
      });
      const categoryService = new CategoryService();
      categories = await categoryService.listAllCategories();
      categories.forEach((element) => {
        option = {
          label: element.name,
          value: element.id,
        };
        options.value.push(option);
      });

    });

    const handleFileUpload = (event) =>{
      file = event;
      console.log(file)
    };

    const formatDateForDataBase = (anyDate) =>{
      return date.formatDate(anyDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    }

    const submitFile = async (id)=>{
      console.log(file)
      const eventProfileService = new EventProfileService()
      await eventProfileService.uploadPicture(id, file)
    }

    const tooHeavyImg =()=>{
      Swal.fire("Image too heavy!!!", "Remember, the maximum weigh for the image is 2 MB", "warning");
    }

    const emptyForm = () =>{
      formDataUpdate.value = null;
    }

    const submit = async() =>{
      const formData = {
        id: id.value,
        eventOrganizerId: eventOrganizerId.value,
        name: name.value,
        description: description.value,
        startDate: formatDateForDataBase(startDate.value),
        endDate: formatDateForDataBase(endDate.value),
        url: url.value,
        categoryId: categoryId.value,
        avgRate: 0
      }
      try {
        const eventProfileService = new EventProfileService();
        await eventProfileService.updateEvent(formData);
        if(file){
          await submitFile(id.value)
        }

        $q.notify({ type: 'positive', message: 'Great! The Event has been updated', color: 'blue', icon: 'thumb_up' })
        emptyForm();
        router.push("/event-list")
      } catch (error) {
        console.log(error);
      }
    };

    return {
      eventOrganizerId,
      name,
      description,
      startDate,
      endDate,
      url,
      categoryId,
      img,
      id,
      submitFile,
      picture,
      file,
      emptyForm,
      tooHeavyImg,
      handleFileUpload,
      formatDateForDataBase,
      formDataUpdate,
      options,
      options_organizer,
      categories,
      tab: ref("data"),
      submit,
      reset() {
        emptyForm()
      },
    };
  },
});
</script>
