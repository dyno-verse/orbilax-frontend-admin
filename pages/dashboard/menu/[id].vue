<template>
  <div>

    <div v-if="!isPending">
      <div class="flex flex-row justify-between">
        <Breadcrumb :pages="pages"/>

        <div class="flex flex-wrap justify-around space-x-2">
          <Button :type="ButtonTypes.Secondary" :label="'Add New Item'" data-modal-target="addCategoryItemModal"
                  data-modal-toggle="addCategoryItemModal" @click="itemModal.show()"/>
        </div>

      </div>
      <div class="flex flex-row justify-start space-x-2 items-center">
        <h1 class="font-bold text-4xl my-5">{{ menusDetails.name }}</h1>
        <button class="cursor-pointer" @click="openEditModal()">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"/>
          </svg>
        </button>
      </div>

      <div>
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        </div>
        <div id="default-tab-content">
          <div class="rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel"
               aria-labelledby="profile-tab" v-if="!iscCategoryItemsLoading">

            <div class="flex flex-wrap w-full">
              <div v-if="categoryItems.items.length !== 0"
                   class="bg-white border-gray-300 border rounded-lg w-1/5 flex flex-col items-center mx-1 my-1 cursor-pointer"
                   v-for="(item,index) in categoryItems.items" @click="viewItem(item, index)">

                <div v-if="item.imageUrl !== null" class="rounded-t-lg bg-gray-100 w-full mb-2 p-2"
                     :style="{ backgroundColor:item.color}">
                  <object :data="item.imageUrl"
                          :style="{objectFit: 'contain', height: '7rem' ,width: '100%'}"
                          class="object-cover z-10 text-center justify-center">
                  </object>
                </div>

                <div v-else
                     :style="{height: '8rem' ,width: '100%', backgroundColor:item.color}"
                     class="relative px-5 inline-flex items-center bg-gray-50 justify-center rounded-t-lg mb-2 overflow-hidden">
                  <span
                      class="font-bold text-gray-800 text-3xl">{{
                      getFirstTwoCharacters(item.name)
                    }}</span>
                </div>

                <p class="text-center px-5 text-black text-lg text-wrap text-ellipsis overflow-hidden line-clamp-1">
                  {{ item.name }}</p>
                <h5 class="text-center px-5 pb-5 text-black text-sm  font-extrabold">{{
                    format('GHC', item.price)
                  }}</h5>
              </div>
              <EmptyState v-else/>
            </div>
          </div>
          <div class="w-full h-full py-48" v-else>
            <Loader/>
          </div>
        </div>
      </div>

    </div>
    <div class="w-full h-full py-48" v-else>
      <Loader/>
    </div>


    <!-- Main modal -->
    <div id="category" ref="addCategoryItemModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Category
            </h3>
            <button type="button"
                    @click="modal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="addCategoryItemModal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name"
                       v-model="addCategoryData.name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>

              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                  Description</label>
                <textarea id="description" rows="4"
                          v-model="addCategoryData.description"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"></textarea>
              </div>

              <div class="mb-5 col-span-2">
                <form class="mx-auto w-full">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                    Color</label>
                  <select id="countries"
                          v-model="addCategoryData.color"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="color in PredefinedColor" :value="color.value">{{ color.name }}</option>
                  </select>
                </form>
              </div>
            </div>
            <button
                @click="addCategory()"
                class="text-white inline-flex items-center bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"></path>
              </svg>
              Add new category
            </button>
          </div>
        </div>
      </div>
    </div>


    <!---->
    <!-- Main modal -->
    <div id="item" ref="addItemModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Item
            </h3>
            <button type="button"
                    @click="itemModal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name"
                       v-model="addItem.name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>
              <div class="grid grid-cols-2 col-span-6 gap-x-2">
                <div>
                  <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="text" name="price" id="price"
                         v-model="addItem.price"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         placeholder="3.00" required="">
                </div>
                <div>
                  <label for="countries"
                         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select id="countries"
                          v-model="selectedCategoryId"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option :selected="selectedCategoryId === category.id" selected
                            v-for="category in menusDetails.categories" :value="category.id">{{ category.name }}
                    </option>
                  </select>

                </div>
              </div>
              <div class="col-span-6">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                  Description</label>
                <textarea id="description" rows="4"
                          v-model="addItem.description"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"></textarea>
              </div>

              <div class="mb-5 col-span-6">
                <form class="mx-auto w-full">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                    Color</label>
                  <select id="countries"
                          v-model="addItem.color"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="color in PredefinedColor" :value="color.value">{{ color.name }}</option>
                  </select>
                </form>
              </div>
            </div>
            <button
                @click="createCategoryItem()"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"></path>
              </svg>
              Add new item
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Item Edit modal -->
    <div id="item" ref="editItemModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Item
            </h3>
            <button type="button"
                    @click="itemEditModal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <div class="w-full flex flex-col flex-row  border-gray-200 text-center items-center self-center">
              <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload">
              <div class="w-full relative p-3 mb-2 rounded-lg bg-gray-50" :style="{backgroundColor:editItem.color}">

                <object :data="editItem.imageUrl"
                        v-if="editItem.imageUrl !== null"
                        :style="{height:'15rem', width: '100%', objectFit: 'contain'}"
                        class="object-cover z-10 text-center justify-center">
                </object>

                <div v-else
                     :style="{height:'15rem'}"
                     class="relative  inline-flex items-center justify-center overflow-hidden">
                <span
                    class="font-bold text-gray-600 text-6xl">{{
                    getFirstTwoCharacters(editItem.name)
                  }}</span>
                </div>

                <div class="absolute top-0 right-0 flex flex-row space-x-2 m-2">
                  <button class="bg-red-100 text-white py-1 px-2 rounded-lg text-sm"
                          @click="openFileInput()">
                    <svg class="w-6 h-6 text-red-400 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                    </svg>
                  </button>

                  <div class="flex flex-row items-center">
                    <button class="border-gray-200 border bg-white text-gray-700 py-1 px-2 rounded-lg text-sm"
                            @click="uploadImage(editItem.id)">
                      <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                      </svg>

                    </button>
                  </div>

                </div>


              </div>
            </div>
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name"
                       v-model="editItem.name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="text" name="price" id="price"
                       v-model="editItem.price"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="20.00" required="">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <form class="mx-auto w-full">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                    Color</label>
                  <select id="countries"
                          v-model="editItem.color"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="color in PredefinedColor" :value="color.value">{{ color.name }}</option>
                  </select>
                </form>
              </div>
              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item
                  Description</label>
                <textarea id="description" rows="4"
                          v-model="editItem.description"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"></textarea>
              </div>

            </div>
            <div class="flex justify-between">
              <button
                  @click="updateItem(editItem.id)"
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"></path>
                </svg>
                Edit item
              </button>

              <button type="button"
                      @click="deleteItem(editItem.id)"
                      class="text-white bg-gray-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
                <span class="sr-only">Icon description</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!--Edit menu modal-->
    <div id="popup-modal" tabindex="-1" ref="editMenuModalId"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Menu
            </h3>
            <button type="button"
                    @click="editMenuModal.hide()"
                    class="absolute top-3 end-2.5 text-gray-400 me-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>


          <div class="p-4 md:p-5 text-center">

            <div class="flex flex-col justify-start text-start">
              <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" v-model="menusDetails.name" id="email"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="name@flowbite.com" required/>
              </div>

              <div class="mb-5">
                <label for="email"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea v-model="menusDetails.description" id="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=""></textarea>
              </div>


              <div class="mb-5">
                <form class="max-w-sm mx-auto">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                    Color</label>
                  <select id="countries"
                          v-model="menusDetails.color"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-for="color in PredefinedColor" :value="color.value">{{ color.name }}</option>
                  </select>
                </form>
              </div>
            </div>
            <div class="flex flex-row justify-between">
              <button data-modal-hide="popup-modal" type="button"
                      @click="updateMenu()"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Save
              </button>
              <button type="button"
                      class="text-white bg-gray-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
                <span class="sr-only">Icon description</span>
              </button>
            </div>
            <!--            <button type="button"-->
            <!--                    @click="editMenuModal.hide()"-->
            <!--                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">-->
            <!--              Cancel-->
            <!--            </button>-->
          </div>
        </div>
      </div>
    </div>

    <!-- Category modal -->
    <div ref="categoryItemModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Categories
            </h3>
            <button type="button"
                    @click="categoriesModal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="select-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <ul class="space-y-4 mb-4">
              <li v-for="(category, index) in menusDetails.categories">
                <label for="job-1"
                       class="inline-flex items-center justify-between w-full p-2 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                  <div class="block">
                    <div class="w-full text-lg font-semibold">
                      <input type="text" v-model="category.name" class="border-gray-200 rounded">
                    </div>
                  </div>
                  <svg class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true"
                       @click="updateCategory(category.id,index)"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"/>
                  </svg>
                  <svg class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true"
                       @click="deleteCategory(category.id,index)"
                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {ButtonTypes} from "~/components/Constants";
import Button from "../components/units/Button.vue";
import Breadcrumb from "../components/units/Breadcrumb.vue";
import {BreadCrumbNav} from "#build/components/units/Breadcrumb.vue";
import {IMenuDetail} from "~/repository/models/ApiResponse";
import {ICategoryItems} from "~/repository/models/ApiResponse";
import {ICreateCategory} from "~/repository/models/inputModels";
import {initModals, Modal, ModalOptions} from "flowbite";
import {ICreateCategoryItem} from "~/repository/models/inputModels";
import EmptyState from "~/components/EmptyState.vue";
import Loader from "~/components/units/Loader.vue";
import {ICreateMenu} from "~/repository/models/inputModels";
import {Iitem} from "~/repository/models/ApiResponse";
import {format} from 'money-formatter';
import {PredefinedColor} from "~/components/Constants";


const route = useRoute();
const {$api} = useNuxtApp();
const modal = ref({});
const itemModal = ref({});
const itemEditModal = ref({})
const editMenuModal = ref({})
const categoriesModal = ref({})
const snackbar = useSnackbar();

const fileInput = ref(null);
const selectedFile = ref(null);


const branchId = localStorage.getItem('branchId');
const businessId = localStorage.getItem('businessId') ?? '';

const menuId = ref("");
const selectedCategoryId = ref("");
const addCategoryData = ref({} as ICreateCategory)
const addItem = ref({} as ICreateCategoryItem)
const editItem = ref({} as ICreateCategoryItem)

const isPending = ref(true);
const iscCategoryItemsLoading = ref(true);
const addCategoryItemModal = ref(null);
const editItemModal = ref(null);
const addItemModal = ref(null);
const categoryItemModal = ref(null);
const editMenuModalId = ref(null);
const menusDetails = ref({} as IMenuDetail);
const categoryItems = ref({} as ICategoryItems);


definePageMeta({
  layout: "main",
  middleware: "auth"

});


onMounted(() => {
  initModals();

  menuId.value = route.params.id.toString();

  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  modal.value = new Modal(addCategoryItemModal.value, options);
  itemModal.value = new Modal(addItemModal.value, options)
  getDetailedMenu(menuId.value);
})

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];

  //Display uploaded image
  const reader = new FileReader();
  reader.onload = (e) => {
    editItem.value.imageUrl = e.target.result;
  };
  reader.readAsDataURL(selectedFile.value);
};

const uploadImage = async (itemId: string) => {
  if (!selectedFile.value) {
    snackbar.add({
      type: 'error',
      text: 'No file selected'
    })
    return;
  }

  const formData = new FormData();
  formData.append('image', selectedFile.value);

  $api.item.uploadItemImage(itemId, formData).then(data => {
    editItem.value.imageUrl = data.data.imageUrl
    getDetailedMenu(menuId.value, selectedCategoryId.value);

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

const openEditModal = () => {
  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  editMenuModal.value = new Modal(editMenuModalId.value, options)
  editMenuModal.value.show()
}

const openCategoriesModal = () => {
  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  categoriesModal.value = new Modal(categoryItemModal.value, options)
  categoriesModal.value.show()
}

function getFirstTwoCharacters(sentence: string): string {
  const words = sentence.split(' ');

  if (words.length >= 2) {
    const firstWord = words[0].slice(0, 1);
    const secondWord = words[1].slice(0, 1);
    return `${firstWord}${secondWord}`.toUpperCase();
  } else {
    return words[0].slice(0, 2).toUpperCase();
  }
}

const getDetailedMenu = (menuId: string, categoryId?: string) => {
  $api.menu.getMenusDetailsById(menuId).then(data => {
    menusDetails.value = data.data;
    isPending.value = false;

    if (categoryId) {
      getItemsByCategory(categoryId)
    } else {
      if (menusDetails.value.items.length !== 0) {
        iscCategoryItemsLoading.value = false;
        categoryItems.value.items = menusDetails.value.items
      } else {
        if (menusDetails.value.categories.length !== 0) {
          selectedCategoryId.value = menusDetails.value.categories[0].id
          getItemsByCategory(selectedCategoryId.value)
        } else {
          iscCategoryItemsLoading.value = false;
          categoryItems.value.items = []
        }

      }
    }

    pages.push(
        {
          name: menusDetails.value.name,
          link: '',
          isActive: false
        } as BreadCrumbNav
    )

  }).catch(error => {
    isPending.value = false;

  })
}

const viewItem = (item: ICreateCategoryItem, position: number) => {
  editItem.value.id = item.id
  editItem.value.name = item.name
  editItem.value.price = item.price
  editItem.value.description = item.description
  editItem.value.position = position
  editItem.value.color = item.color
  editItem.value.imageUrl = item.imageUrl

  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };
  itemEditModal.value = new Modal(editItemModal.value, options);

  itemEditModal.value.show();
}

const addCategory = () => {
  createCategory()
}

const createCategory = () => {
  modal.value.hide()
  const request: ICreateCategory = {
    name: addCategoryData.value.name,
    description: addCategoryData.value.description,
    color: addCategoryData.value.color,
    branchId: branchId ?? ''
  }
  $api.menu.createCategoryUnderMenu(request, menuId.value).then(data => {
    getDetailedMenu(menuId.value, selectedCategoryId.value);
    snackbar.add({
      type: 'success',
      text: 'Category added'
    })
  }).catch(error => {
    console.log(error.data)
  })
}

const isSelectedCategoryId = (cat: string) => {
  return cat === selectedCategoryId.value
}

const createCategoryItem = () => {
  itemModal.value.hide()
  const request: ICreateCategoryItem = {
    id: addItem.value.id,
    name: addItem.value.name,
    description: addItem.value.description,
    color: addItem.value.color,
    position: 0,
    price: Number(addItem.value.price),
    ingredients: [],
    branchId: branchId ?? ''
  }

  if (selectedCategoryId.value.length !== 0) {
    $api.menuCategory.addItem(selectedCategoryId.value, request).then(data => {
      getDetailedMenu(menuId.value, selectedCategoryId.value);
      snackbar.add({
        type: 'success',
        text: 'Item added'
      })
    }).catch(error => {

    })
  } else {
    $api.menu.addItemUnderMenu(menuId.value, request).then(data => {
      getDetailedMenu(menuId.value, selectedCategoryId.value);
      snackbar.add({
        type: 'success',
        text: 'Item added'
      })
    }).catch(error => {

    })
  }


}

const updateItem = (itemId: string) => {
  const request: Iitem = {
    name: editItem.value.name,
    description: editItem.value.description,
    price: Number(editItem.value.price),
    color: editItem.value.color,
    ingredients: [],
    id: itemId
  }

  $api.item.updateItem(itemId, request).then(data => {
    itemEditModal.value.hide()
    const item = categoryItems.value.items[editItem.value.position]

    item.name = data.data.name
    item.price = data.data.price
    item.color = data.data.color
    item.ingredients = data.data.ingredients
    item.description = data.data.description

    snackbar.add({
      type: 'success',
      text: 'Item updated'
    })
  }).catch(error => {
  })

}

const deleteItem = (itemId: string) => {
  itemEditModal.value.hide()// close dialog
  $api.item.deleteItem(itemId).then(data => {
    snackbar.add({
      type: 'success',
      text: 'Item deleted'
    })
    categoryItems.value.items.splice(editItem.value.position, 1)
  }).catch(error => {

  })
}

const deleteCategory = (categoryId: string, position: number) => {
  categoriesModal.value.hide()// close dialog
  $api.menuCategory.deleteCategory(categoryId).then(data => {
    snackbar.add({
      type: 'success',
      text: 'Category deleted'
    })
    menusDetails.value.categories.splice(position, 1)
  }).catch(error => {

  })
}

const updateCategory = (categoryId: string, position: number) => {
  const request: ICreateCategory = {
    name: menusDetails.value.categories[position].name,
    description: menusDetails.value.categories[position].description
  }

  $api.menuCategory.updateCategory(categoryId, request).then(data => {
    // categoriesModal.value.hide()
    snackbar.add({
      type: 'success',
      text: 'Category updated'
    })
  }).catch(error => {

  })
}


const updateMenu = () => {
  const request: ICreateMenu = {
    name: menusDetails.value.name,
    description: menusDetails.value.description,
    branchId: brandId,
    color: menusDetails.value.color
  }

  $api.menu.updateMenu(menuId.value, request).then(data => {
    editMenuModal.value.hide()
    snackbar.add({
      type: 'success',
      text: 'Menu updated'
    })
  }).catch(error => {

  })
}

const getItemsByCategory = (categoryId: string) => {
  selectedCategoryId.value = categoryId
  iscCategoryItemsLoading.value = true
  // categoryItems.value.items = []

  $api.menuCategory.getItemsUnderCategories(selectedCategoryId.value).then(data => {
    categoryItems.value = data.data;
    iscCategoryItemsLoading.value = false;
  }).catch(error => {
    iscCategoryItemsLoading.value = false;
  });
}

const pages = [
  {
    name: 'Products',
    link: '/dashboard/menu/',
    isActive: true
  } as BreadCrumbNav
]

</script>

<style scoped>

</style>
