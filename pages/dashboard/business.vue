<template>
  <div>
    <div class="flex flex-row justify-between h-14">
      <Breadcrumb :pages="pages"/>
      <Button :type="ButtonTypes.Primary" :label="'Save changes'" data-modal-target="categoryModal"
              data-modal-toggle="categoryModal" @click="updateBusinessInfo('72f16ef5-6b78-4504-80bd-16aef1c52b46')"/>

    </div>


    <div v-if="!isPending" class=" w-full my-4">
      <div class="flex-row flex justify-start space-x-4">
        <div class="w-3/5">
          <div class="flex flex-col">
            <div class="w-full flex flex-row bg-blue-400 rounded-lg justify-start w-3/5 mb-2 items-center text-center relative">
              <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload">

              <object :data="businessInfo.bannerUrl"
                      style="{object-fit: cover; height: 17rem; width: 100%;}"
                      class="object-cover z-10 text-center justify-center rounded-lg">
              </object>

              <div class="absolute top-0 right-0 flex z-30 flex-row space-x-2 m-2">
                <button class="bg-red-100 text-white py-1 px-2 rounded-lg text-sm" @click="openFileInput()">
                  <svg class="w-6 h-6 text-red-400 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                  </svg>
                </button>

                <div class="flex flex-row items-center">
                  <button class="border-gray-200 border bg-white text-gray-700 py-1 px-2 rounded-lg text-sm"
                          @click="uploadImage(businessId)">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                    </svg>

                  </button>
                </div>

              </div>


              <div
                  class="drop-shadow-lg absolute bottom-0 left-0 bg-white flex items-center rounded-full h-28 w-28 z-30 p-2 m-5 justify-start self-start mx-10">
                <img :src="businessInfo.logoUrl" class="rounded-full">
              </div>

            </div>
          </div>


          <div class="flex flex-col  justify-start bg-white p-5 rounded-lg border-gray-300 border">
            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" id="email"
                     v-model="businessInfo.name"
                     class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                     placeholder="" disabled/>
            </div>
            <div class="flex flex-wrap space-x-2">
              <div class="mb-5 w-1/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input type="text" id="email"
                       v-model="businessInfo.city"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
              <div class="mb-5 w-1/2">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact
                  number</label>
                <input type="text" id="email"
                       v-model="businessInfo.phoneNumber"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
            </div>
            <div class="mb-5 w-2/3">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input type="text" id="email"
                     v-model="businessInfo.address"
                     class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                     placeholder="" required/>
            </div>
            <div class="flex flex-wrap space-x-2">
              <div class="mb-5 w-1/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <input type="text" id="email"
                       v-model="businessInfo.country"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
            </div>
          </div>
        </div>
        <div class="w-2/5 h-full flex flex-col space-y-4">
          <div class="w-full bg-white border border-gray-300 rounded-lg p-5">
            <div class="flex flex-wrap flex-col">
              <div class="mb-5 w-2/3">
                <label for="email"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
                <input type="text"
                       v-model="businessInfo.instagramUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>

              <div class="mb-5 w-2/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
                <input type="text"
                       v-model="businessInfo.twitterUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>

              <div class="mb-5 w-2/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
                <input type="text"
                       v-model="businessInfo.facebookUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>

              <div class="mb-5 w-2/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                <input type="text"
                       v-model="businessInfo.websiteUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
            </div>
          </div>
          <div class="w-full bg-white  border border-gray-300 rounded-lg p-5">
            <div class="flex flex-row justify-around">
              <div>
                <label for="hs-color-input" class="block text-sm font-medium mb-2 dark:text-white">Primary Color</label>
                <input type="color"
                       v-model="businessInfo.primaryColor"
                       class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                       id="hs-color-input" title="Choose your color">
              </div>

              <div>
                <label for="hs-color-input" class="block text-sm font-medium mb-2 dark:text-white">Text Color</label>
                <input type="color"
                       v-model="businessInfo.textColor"
                       class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                       id="hs-color-input" title="Choose your color">
              </div>

              <div>
                <label for="hs-color-input" class="block text-sm font-medium mb-2 dark:text-white">Background
                  Color</label>
                <input type="color"
                       v-model="businessInfo.backgroundColor"
                       class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
                       id="hs-color-input" title="Choose your color">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loader class="w-full h-full py-48"/>
    </div>


    <!-- Main modal -->
    <div id="authentication-modal" ref="modalId" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Generate QR Code
            </h3>
            <button type="button"
                    @click="modal.hide()"
                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-5 w-full justify-center text-center flex-row flex">
            <div v-if="qrCanvas">
              <img :src="qrDataUrl" alt="QR Code"/>
              <a :href="qrDataUrl" download="qrcode.png" class="mb-5">
                <button>Download QR Code</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb, {BreadCrumbNav} from "~/components/units/Breadcrumb.vue";
import {ButtonTypes} from "~/components/Constants";
import Button from "~/components/units/Button.vue";
import {IBusinessInfo} from "~/repository/models/ApiResponse";
import Loader from "~/components/units/Loader.vue";
import {IUpdateBusiness} from "~/repository/models/inputModels";
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import {Modal, ModalOptions} from "flowbite";

const {data, signOut, getSession} = useAuth()


const {$api} = useNuxtApp();
const businessInfo = ref({} as IBusinessInfo)
const isPending = ref(true)
const snackbar = useSnackbar()
const fileInput = ref(null)
const selectedFile = ref(null)
const businessId = data.value.businessId
const qrDataUrl = ref('');
const qrCanvas = ref(null);
const modal = ref({})
const modalId = ref(null)

definePageMeta({
  layout: "main",
  middleware: "auth"
});

onMounted(() => {
  getBusinessById(businessId);

  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  modal.value = new Modal(modalId.value, options);
})


const getBusinessById = (id: string) => {
  isPending.value = true;
  $api.business.getBusinessInfoById(id).then(data => {
    businessInfo.value = data.data
    isPending.value = false;

  }).catch(error => {
    isPending.value = false;

  })
}

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];

  //Display uploaded image
  const reader = new FileReader();
  reader.onload = (e) => {
    businessInfo.value.bannerUrl = e.target.result;
  };
  reader.readAsDataURL(selectedFile.value);
};


const updateBusinessInfo = (id: string) => {
  const request: IUpdateBusiness = {
    name: businessInfo.value.name,
    tag: businessInfo.value.tag,
    twitterUrl: businessInfo.value.twitterUrl,
    instagramUrl: businessInfo.value.instagramUrl,
    facebookUrl: businessInfo.value.facebookUrl,
    websiteUrl: businessInfo.value.websiteUrl,
    primaryColor: businessInfo.value.primaryColor,
    textColor: businessInfo.value.textColor,
    backgroundColor: businessInfo.value.backgroundColor
  }

  $api.business.updateBusinessInfoById(id, request).then(data => {
    businessInfo.value = data.data
    snackbar.add({
      type: 'success',
      text: 'Business info updated'
    })
  }).catch(error => {
  })
}

const openFileInput = () => {
  fileInput.value.click();
};

const uploadImage = async (businessId: string) => {
  if (!selectedFile.value) {
    snackbar.add({
      type: 'error',
      text: 'No file selected'
    })
    return;
  }

  const formData = new FormData();
  // formData.append('')
  formData.append('banner', selectedFile.value);

  $api.business.updateBusinessInfoWithMedia(businessId, formData).then(data => {
    // editItem.value.imageUrl = data.data.imageUrl
    // getDetailedMenu(menuId.value, selectedCategoryId.value);

    snackbar.add({
      type: 'success',
      text: 'Image uploaded'
    })
  }).catch(error => {
    console.log(error.data)
    snackbar.add({
      type: 'error',
      text: error.data.statusMessage
    })
  })

  console.log('File selected:', selectedFile.value);
};


const generateQRCode = async () => {
  modal.value.show()
  const data = 'https://dynomenu.com/'+businessInfo.value.slug; // Data to encode into QR code
  try {
    const qrCanvasElement = await generateQRCodeCanvas(data);
    qrCanvas.value = qrCanvasElement;
    qrDataUrl.value = await convertCanvasToDataURL(qrCanvasElement);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

const generateQRCodeCanvas = (data: string): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    QRCode.toCanvas(data, (err, canvas) => {
      if (err) {
        reject(err);
      } else {
        resolve(canvas);
      }
    });
  });
};

const convertCanvasToDataURL = (canvas: HTMLCanvasElement): Promise<string> => {
  document.body.appendChild(canvas);
  return new Promise((resolve, reject) => {
    html2canvas(canvas)
        .then((canvas) => {
          resolve(canvas.toDataURL('image/png'));
        })
        .catch((error) => {
          reject(error);
        });
  });
};


const pages = [
  {
    name: 'Business',
    link: '/dashboard/menu/',
    isActive: true
  } as BreadCrumbNav
]
</script>

<style scoped>

</style>
