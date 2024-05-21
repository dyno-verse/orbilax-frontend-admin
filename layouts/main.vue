<template>
  <div class="antialiased">
    <nav
        class="bg-white border-b w-full border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex w-full flex-wrap flex-row justify-between items-center">
        <div class="flex w-full justify-start items-center">
          <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
              ></path>
            </svg>
            <svg
                aria-hidden="true"
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>

          <div class="w-full flex flex-row justify-between">

            <a href="https://dynomenu.com" class="flex items-center justify-between mr-4">
              <img
                  src="../assets/imgs/logo.svg"
                  class="mr-3 h-8"
                  alt="Dyno Logo"
              />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{{data.businessName}}</span>
            </a>

            <button type="button"
                    @click="signOut()"
                    class="text-gray-400 bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">

              <div class="flex flex-row">

                <p>Logout</p>

                <svg class="w-6 h-6 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                </svg>
              </div>
            </button>

          </div>

        </div>
      </div>
    </nav>

    <!-- Sidebar -->

    <aside
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul class="space-y-2">
          <li>
            <NuxtLink
                to="/dashboard"
                active-class="text-red-500 bg-gray-50"
                class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg class="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="currentColor" viewBox="0 0 24 24">
                <path
                    d="M13.5 2a7 7 0 0 0-.5 0 1 1 0 0 0-1 1v8c0 .6.4 1 1 1h8c.5 0 1-.4 1-1v-.5A8.5 8.5 0 0 0 13.5 2Z"/>
                <path d="M11 6a1 1 0 0 0-1-1 8.5 8.5 0 1 0 9 9 1 1 0 0 0-1-1h-7V6Z"/>
              </svg>
              <span class="ml-3">Dashboard</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
                to="/dashboard/menu/"
                active-class="text-red-500 bg-gray-50"
                class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg class="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                      d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                      clip-rule="evenodd"/>
              </svg>

              <span class="ml-3">Products</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
                to="/dashboard/business"
                active-class="text-red-500 bg-gray-50"
                class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg class="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                      d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.4l1.4.7a7.7 7.7 0 0 0 .7.3 21 21 0 0 0 16.4-.3l1.5-.7V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5c0-.6-.4-1-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.4 7.9.6-.3V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.4l.6.3a10 10 0 0 0 .7.3 23 23 0 0 0 18-.3h.1L21 13l.4.9ZM12 10a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                      clip-rule="evenodd"/>
              </svg>
              <span class="ml-3">Business</span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
                to="/pos/orders"
                active-class="text-red-500 bg-gray-50"
                class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg class="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                      d="M8 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8c0-.6.4-1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                      clip-rule="evenodd"/>
              </svg>

              <span class="ml-3">Sales</span>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
                to="/staff"
                active-class="text-red-500 bg-gray-50"
                class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

              <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                      d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
                      clip-rule="evenodd"/>
              </svg>
              <span class="ml-3">Staff</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div
          class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20"
      >
        <small class="font-light text-gray-500">&copy;2024 - dynomenu </small>
      </div>
    </aside>

    <main class="p-4 md:ml-64 h-full pt-20">
      <slot/>
    </main>
  </div>
</template>

<script lang="ts" setup>
const {data, signIn, signOut, getSession, status} = useAuth()


</script>

<style scoped>

</style>
