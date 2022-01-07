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
                        <q-date v-model="startDate" mask="YYYY-MM-DD HH:mm" :options="dateOptions">
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
                        <q-date v-model="endDate" mask="YYYY-MM-DD HH:mm" :options="dateOptions">
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

          <div class="row q-py-md justify-center">
            <div class="col-12 col-md-8 text-bold text-center"
                 style="max-width:200px">
              Select the initial number of tickets available:
              <q-input
                v-model.number="availableTickets"
                type="number"
              />
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

  <q-input class="hidden" v-model="startDateWithoutChanges" />
  <q-input class="hidden" v-model="endDateWithoutChanges" />
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
import moment from "moment";

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
    let availableTickets = ref(null)

    let eventOrganizerId = ref(null)
    let name = ref(null)
    let description = ref(null)
    let startDate = ref(null)
    let endDate = ref(null)
    let url = ref(null)
    let categoryId = ref(null)
    let img = ref(null)
    let id = ref(null)
    let tab = ref("data")
    const userId = store.getters["user/getUserId"]
    let event = ref(null)
    let startDateWithoutChanges = ref(null)
    let endDateWithoutChanges = ref(null)
    let endDateEmpty = ref(true)

    onMounted(async () => {
      let eventprofileService = new EventProfileService()
      event.value = await eventprofileService.showEvent(route.params.id);
      eventOrganizerId.value = event.value.eventOrganizerId
      name.value = event.value.name
      description.value = event.value.description
      startDate.value = formatToShow(event.value.startDate)
      endDate.value = formatToShow(event.value.endDate)
      startDateWithoutChanges.value = event.value.startDate
      endDateWithoutChanges.value = event.value.endDate
      url.value = event.value.url
      categoryId.value = event.value.categoryId
      img.value = event.value.img
      id.value = event.value.id
      img.value = event.value.img
      availableTickets.value = event.value.availableTickets
      const eventOrganizerService = new EventOrganizerService();
      organizers = await eventOrganizerService.getEventOrganizersByAdministrator(userId);
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
      if (event.size > 1048576){
        tooHeavyImg()
      } else{
        file = event;
      }
    };

    const formatToShow = (anyDate) =>{
      let ret = date.formatDate(anyDate, 'DD-MM-YYYY HH:mm')
      return ret
    }

    const formatDateForDataBase = (anyDate) =>{
      return date.formatDate(anyDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    }

    const isValidDateTime = (datetime) =>{
      let now = date.formatDate(Date.now(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')
      return moment(datetime).isSameOrAfter(now)
    }

    const compareDates = ()=>{
      if(endDateEmpty.value){
        return true
      } else{
        //let endDateStrAux = formatToShow(endDate.value)
        //let endDateStrAux = endDate.value
        //let ret = moment(endDateStrAux).isSameOrAfter(startDate.value)

        const formatDate = "DD-MM-YYYY hh:mm"
        const startValueDate = moment(startDate.value, formatDate)
        const endValueDate = moment(endDate.value, formatDate)

        let ret = startValueDate.isSameOrBefore(endValueDate)
        return ret
      }
    }

    const submitFile = async (id)=>{
      const eventProfileService = new EventProfileService()
      await eventProfileService.uploadPicture(id, file)
    }

    const tooHeavyImg =()=>{
      Swal.fire("Image too heavy!!!", "Sorry, the maximum weigh for the image is 2 MB", "warning");
    }

    const emptyForm = () =>{
      formDataUpdate.value = null;
    }

    const isValidUrl = (text) =>{
      const pattern = new RegExp("((http|https)://)?(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")
      return pattern.test(text)
    }



    const submit = async() =>{
      if(endDate.value !== null && endDate.value){
        endDateEmpty.value = false
      }
        if(!eventOrganizerId.value){
          $q.notify({ type: 'warning', message: 'You must select an event organizer' })
          tab.value='data'
        } else if(name.value ===''){
          $q.notify({ type: 'warning', message: 'You must write a name for the event' })
          name.value = event.value.name
          tab.value='data'
        } else if(description.value ===''){
          $q.notify({ type: 'warning', message: 'You must write a description for the event' })
          description.value = event.value.description
          tab.value='data'
        } else if(!startDate.value){
          $q.notify({ type: 'warning', message: 'You must inform the start date' })
          tab.value='data'
        } else if(startDate.value!==formatToShow(event.value.startDate) && !isValidDateTime(startDate.value)){
          $q.notify({ type: 'warning', message: "You can not create an event for a previous datetime" })
          startDate.value = formatToShow(startDateWithoutChanges.value)
          tab.value='data'
        } else if(!compareDates()){
          $q.notify({ type: 'warning', message: "You can not create an event for a previous datetime" })
          endDate.value = formatToShow(endDateWithoutChanges.value)
          tab.value='data'
        } else if(endDate.value!==formatToShow(event.value.endDate) && !isValidDateTime(endDate.value)){
          $q.notify({ type: 'warning', message: "End date can not be previous than start date" })
          endDate.value = formatToShow(endDateWithoutChanges.value)
          tab.value='data'
        } else if(availableTickets.value <= 0){
          $q.notify({ type: 'warning', message: "Number of available tickets can't be negative or zero" })
          availableTickets.value = event.value.availableTickets
          tab.value='data'
        } else if(url.value === ''){
          $q.notify({ type: 'warning', message: 'You must include the url for the event' })
          url.value = event.value.url
        } else if(!isValidUrl(url.value)){
          $q.notify({ type: 'warning', message: 'The url is not valid' })
        } else if(!picture.value && !img.value){
          $q.notify({ type: 'warning', message: 'You must upload a picture' })
        } else if(!categoryId.value) {
          $q.notify({type: 'warning', message: 'You must select a category'})
        } else {
          const formData = {
            id: id.value,
            eventOrganizerId: eventOrganizerId.value,
            name: name.value,
            description: description.value,
            startDate: formatDateForDataBase(startDateWithoutChanges.value),
            endDate: formatDateForDataBase(endDateWithoutChanges.value),
            url: url.value,
            categoryId: categoryId.value,
            availableTickets: availableTickets.value
          }
          if (endDate.value!==formatToShow(event.value.endDate)){
            formData.endDate = formatDateForDataBase(endDate.value)
          }
          if (startDate.value!==formatToShow(event.value.startDate)){
            formData.startDate = formatDateForDataBase(startDate.value)
          }
          try {
            const eventProfileService = new EventProfileService();
            let ok = await eventProfileService.updateEvent(formData)
            if(file){
              await submitFile(event.value.id)
            }
            if(ok){
              $q.notify({ type: 'positive', message: 'Great! The Event has been updated', color: 'blue', icon: 'thumb_up' })
              emptyForm();
              await router.push("/events-list")
            }

          } catch (error) {
            console.log(error);
          }
        }

    };
    return {
      dateOptions: (date) => {
        return moment(date).isSameOrAfter(Date.now())
      },
      eventOrganizerId,
      name,
      description,
      endDateEmpty,
      startDate,
      startDateWithoutChanges,
      endDateWithoutChanges,
      isValidUrl,
      availableTickets,
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
      formatToShow,
      formDataUpdate,
      options,
      options_organizer,
      categories,
      tab,
      submit,
      reset() {
        emptyForm()
      },
    };
  },
});
</script>

