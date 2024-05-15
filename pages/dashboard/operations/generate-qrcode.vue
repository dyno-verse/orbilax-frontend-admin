<template>
  <div>
    <div class="flex justify-between h-14">
      <Breadcrumb :pages="pages"/>
    </div>

    <div class="flex flex-wrap w-full">
      <div class="flex flex-wrap my-4">
        <div class="">
          <input type="text" id="large-input"
                 v-model="tableNumber"
                 class="block p-4 text-gray-900 border border-gray-300  bg-gray-50 text-base focus:ring-blue-500 rounded-l-lg focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>

        <button ref="dropdownId" id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                class="text-white bg-red-500 font-medium rounded-r-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button">Select table number
          <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4"/>
          </svg>
        </button>
      </div>

      <div class="w-full">
        <div class="grid-cols-5 grid gap-4">

          <div
              class="cursor-pointer bg-white border-gray-300 border rounded-lg p-5 text-center flex flex-col items-center justify-center"
              v-for="i in Number(tableNumber)" @click="showSelectedTable(i)">

            <svg class="w-6 h-6 text-gray-400 self-end " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/>
            </svg>

            <p class="text-lg font-bold">Table #{{ i }}</p>
            <img src="../../../assets/imgs/round-table.png" class="w-20">
            <!--            <button type="button"-->
            <!--                    "-->
            <!--                    class="px-3 py-2 my-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">-->
            <!--              Explore-->
            <!--            </button>-->
          </div>
        </div>
      </div>
    </div>

    <!---->
    <!-- Dropdown menu -->
    <div id="dropdown" ref="dropdownMenuId"
         class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-for="i in 15">
          <a @click="selectTableNumber(i)" href="#"
             class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ i }}</a>
        </li>
      </ul>
    </div>

    <!-- Main modal -->
    <div id="popup-modal" ref="qrCodeId" tabindex="-1"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button"
                  @click="qrCodeModal.hide()"
                  class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">

            <div class="justify-center flex flex-col my-4">
              <h3 class="text-2xl text-gray-800 dark:text-gray-400 font-bold">Table QR Code</h3>
              <qrcode-vue :value="selectedTable.url" :size="150" level="H" :render-as="'svg'"
                          class="self-center text-center py-4"/>
              <h3 class="text-lg font-normal text-gray-700 dark:text-gray-400 italic underline">
                {{ selectedTable.url }}</h3>
              <small class="text-gray-400">table number: <span class="font-bold">{{ selectedTable.tableNumber }}</span>
              </small>
            </div>

            <button data-modal-hide="popup-modal" type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              Download
            </button>
            <button data-modal-hide="popup-modal" type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import QrcodeVue, {Level, RenderAs} from 'qrcode.vue'
import {Dropdown, DropdownInterface, DropdownOptions, Modal, ModalOptions} from "flowbite";
import BreadCrumbNav from "~/components/units/Breadcrumb.vue";
import Breadcrumb from "../components/units/Breadcrumb.vue";
import QRCode from 'qrcode'


const value = ref('qrcode')
const level = ref<Level>('M')
const renderAs = ref<RenderAs>('canvas')
const businessSlug = "dyno-pub"

const qrCodeModal = ref({})
const qrCodeId = ref(null)
const selectedTable = ref({} as QRCodeData)
const dropdown = ref({})
const dropdownId = ref(null)
const dropdownMenuId = ref(null)

const tableNumber = ref(10)


onMounted(() => {
  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };
  qrCodeModal.value = new Modal(qrCodeId.value, options);

  // options with default values
  const dropDownOptions: DropdownOptions = {
    placement: 'bottom',
    triggerType: 'click',
    offsetSkidding: 0,
    offsetDistance: 10,
    delay: 300,
    onHide: () => {
      console.log('dropdown has been hidden');
    },
    onShow: () => {
      console.log('dropdown has been shown');
    },
    onToggle: () => {
      console.log('dropdown has been toggled');
    },
  };


  dropdown.value = new Dropdown(
      dropdownMenuId.value,
      dropdownId.value,
      dropDownOptions);

})

const selectTableNumber = (table: number) => {
  tableNumber.value = table
  dropdown.value.hide()
}

definePageMeta({
  layout: "main",
  middleware: "auth"
});

const pages = [
  {
    name: 'Operations',
    link: '/dashboard/operations/',
    isActive: true
  } as BreadCrumbNav,
  {
    name: 'QR Codes',
    link: '/dashboard/operations/',
    isActive: true
  } as BreadCrumbNav
]

const showSelectedTable = (tableNumber: number) => {
  selectedTable.value.tableNumber = tableNumber
  selectedTable.value.url = `https://dynomenu.com/${businessSlug}/${tableNumber}`

  qrCodeModal.value.show()
}

interface QRCodeData {
  tableNumber: number
  url: string
}

</script>

<style scoped>

</style>
