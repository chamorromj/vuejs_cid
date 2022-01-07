<template>
  <div class="text-h5 fixed-center" v-if="!options_organizer || options_organizer.length === 0">
    You have no event organizers assigned
  </div>
  <div v-else>
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
      <div class="text-h3 q-my-md text-center">New Event <span class="text-h4">(starting...)</span></div>
    </div>
        <q-separator inset class="q-mb-md" color="primary"/>
        <div class="row q-px-lg justify-center">

          <div class="col-12 col-md-8 text-bold">
            Select the organizer of the event:
            <q-select
              filled
              class="q-my-md"
              v-model="formData.eventOrganizerId"
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
            v-model="formData.name"
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
            v-model="formData.description"
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
            <div class="row justify-center" >

              <div class="col-12 col-md-6 q-px-md q-mt-sm" style="max-width: 300px">
                <div class="text-bold">Select the initial date:</div>
                <div class="q-gutter-md row items-start">
                  <q-input readonly clearable v-model="formData.startDate">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date v-model="formData.startDate" mask="DD-MM-YYYY HH:mm" :options="dateOptions">
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="formData.startDate=null" flat v-close-popup />
                              <q-btn label="SET" color="primary" flat v-close-popup />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="formData.startDate" mask="DD-MM-YYYY HH:mm" format24h>
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="formData.startDate=null"
                                     flat v-close-popup />
                              <q-btn label="SET" color="primary" flat v-close-popup />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="col-12 col-md-6 q-px-md q-mt-sm" style="max-width: 300px">
                <div class="text-bold">Select the end date:</div>
                <div class="q-gutter-md row items-start">
                  <q-input readonly clearable v-model="formData.endDate">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date
                          v-model="formData.endDate"
                          mask="DD-MM-YYYY HH:mm"
                          :options="dateOptions">
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="formData.endDate=null" flat v-close-popup />
                              <q-btn label="SET" color="primary" flat v-close-popup />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="formData.endDate" mask="DD-MM-YYYY HH:mm" format24h >
                            <div class="row items-center justify-end q-gutter-sm">
                              <q-btn label="CLEAN" color="secondary" @click="formData.endDate=null" flat v-close-popup />
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

            <div class="row q-py-md justify-center">
              <div class="col-12 col-md-8 text-bold text-center"
                   style="max-width:200px">
            Select the initial number of tickets available:
            <q-input
              v-model.number="formData.availableTickets"
              type="number"
            />
          </div>
              </div>
          </div>
          <div class="col-12 col-md-8 ">
            <q-btn class="full-width q-mt-md" color="gray-2" text-color="primary" label="Continue" @click="tab='others'"/>
            <q-btn class="full-width q-mt-md" label="Cancel" type="button" color="secondary" to="/events-list"/>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="others">
        <div class="row justify-center">
          <div class="text-h3 q-my-md text-center">New Event <span class="text-h4">(concluding...)</span></div>
        </div>
        <q-separator inset class="q-mb-md" color="primary"/>
        <div class="row q-px-lg justify-center">
          <div class="col-12 col-md-8 text-bold">
          Please, specify the location of the event:
          <q-input
            class="q-mt-md"
            v-model="formData.url"
            outlined
            type="url"
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
          Select the picture for the event:

          <q-file color="teal" class="q-my-md" outlined label="Click to select the picture" v-model="picture" @update:model-value="handleFileUpload( $event )">
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
            v-model="formData.categoryId"
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
            label="Add the event"
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

  <q-input class="hidden" v-model="endDateEmpty" />
  </div>
</template>

<script>
import { date, useQuasar } from "quasar";
import EventProfileService from "../../services/Profile/eventprofile.service.js";
import {defineComponent, ref, onMounted, computed} from "vue";
import { useRouter } from "vue-router";
import CategoryService from "../../services/Administration/category.service";
import EventOrganizerService from "src/services/Administration/eventorganizer.service";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import moment from "moment"

export default defineComponent({
  name: "NewEventForm",

  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const formData = ref({ endDate: null})
    const store = useStore()

    let categories = null
    let organizers = null
    let options = ref([])
    let options_organizer = ref([])
    let option = ref(null)
    let file = ''
    let picture = ref(null)
    let endDateEmpty = ref(true)
    let tab= ref("data")
    const userId = store.getters["user/getUserId"]

    onMounted(async () => {
      formData.value.availableTickets = 200
      const eventOrganizerService = new EventOrganizerService();
      organizers = await eventOrganizerService.getEventOrganizersByAdministrator(userId);
      if(organizers.length >0){
        organizers.forEach((element) => {
          option = {
            label: element.name,
            value: element.id,
          };
          options_organizer.value.push(option);
        });
      }
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
      if (event.size > 1048576){
        tooHeavyImg()
      } else{
        file = event;
      }
    };

    const formatToShow = (anyDate) =>{
      return date.formatDate(anyDate, 'DD-MM-YYYY HH:mm')
    }

    const formatDateForDataBase = (anyDate) =>{
      return date.formatDate(anyDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    }

    const tooHeavyImg =()=>{
      Swal.fire("Image too heavy!!!", "Sorry,the maximum weigh for the image is 2 MB", "warning")
    }

    const emptyForm = () =>{
      formData.value = null;
    }

    const isValidUrl = (text) =>{
      const pattern = new RegExp("((http|https)://)?(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
      return pattern.test(text)
    }


    const compareDates = ()=>{
      return formData.value.startDate > formData.value.endDate
    }

    const submitFile = async (id)=>{
      const eventProfileService = new EventProfileService()
      await eventProfileService.uploadPicture(id, file)
    }

    const submit = async() =>{
      if(formData.value.endDate !== null && formData.value.endDate){
        endDateEmpty.value = false
      }
      formData.value.startDate =  formatDateForDataBase(formData.value.startDate)
      formData.value.endDate =  formatDateForDataBase(formData.value.endDate)
      formData.value.avgRate = 0

      if(!formData.value.eventOrganizerId){
        $q.notify({ type: 'warning', message: 'You must select an event organizer' })
        tab.value='data'
      } else if(!formData.value.name){
        $q.notify({ type: 'warning', message: 'You must write a name for the event' })
        tab.value='data'
      } else if(!formData.value.description){
        $q.notify({ type: 'warning', message: 'You must write a description for the event' })
        tab.value='data'
      } else if(!formData.value.startDate) {
        $q.notify({type: 'warning', message: 'You must select the start date'})
        tab.value = 'data'
      } else if(!compareDates()){
        $q.notify({ type: 'warning', message: "The event can not end before starting" })
        formData.value.endDate = null
        tab.value='data'
      } else if(formData.value.availableTickets <= 0){
        $q.notify({ type: 'warning', message: "Initial number of available tickets can't be negative or zero" })
        formData.value.availableTickets = 200
        tab.value='data'
      } else if(!formData.value.url){
        $q.notify({ type: 'warning', message: 'You must include the url for the event' })
      } else if(!isValidUrl(formData.value.url)){
      $q.notify({ type: 'warning', message: 'The url is not valid' })
      } else if(!picture.value){
        $q.notify({ type: 'warning', message: 'You must upload a picture' })
      } else if(!formData.value.categoryId) {
        $q.notify({type: 'warning', message: 'You must select a category'})
      } else {
        try {
          const eventProfileService = new EventProfileService();
          let eventResult = await eventProfileService.addEvent(formData.value);
          await submitFile(eventResult.id)
          $q.notify({ type: 'positive', message: 'Great! The new Event has been created', color: 'blue', icon: 'thumb_up' })
          emptyForm();
          await router.push("/events-list")
        } catch (error) {
          console.log(error);
        }
      }


    };


    return {
      dateOptions: (anyDate) => {
        let today = date.formatDate(Date.now(), 'YYYY-MM-DD')
        return moment(anyDate).isSameOrAfter(today)
      },
      formatToShow,
      compareDates,
      endDateEmpty,
      submitFile,
      picture,
      file,
      emptyForm,
      tooHeavyImg,
      handleFileUpload,
      formatDateForDataBase,
      formData,
      options,
      options_organizer,
      categories,
      tab,
      submit,
      reset() {
        emptyForm()
      },
      isValidUrl,
    };
  },
});
</script>
