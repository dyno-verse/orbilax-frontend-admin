<template>
  <div>
    <div class="">
      <div class="flex flex-row justify-between h-14 mb-5">
        <Breadcrumb :pages="pages"/>
      </div>

      <div class="grid-cols-4 grid gap-4">
        <div
            class="h-48 bg-white border border-gray-300 rounded-lg w-full flex flex-col items-center justify-center text-center"
            v-for="i in 4">
          <h1 class="text-5xl font-bold">{{ (600 / i) }}</h1>
          <div class="flex flex-row flex-wrap">
            <p class="text-gray-500">Something below </p>
            <svg class="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v13m0-13 4 4m-4-4-4 4"/>
            </svg>
          </div>
        </div>
      </div>

      <div
          class="h-48 bg-white my-10 border border-gray-300 rounded-lg w-full flex flex-col items-center justify-center text-center">

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "~/components/units/Breadcrumb.vue";
import {BreadCrumbNav} from "~/components/units/Breadcrumb.vue";

definePageMeta({
  layout: "main",
  middleware: "auth"
});

const pages = [
  {
    name: 'Dashboard',
    link: '/dashboard/',
    isActive: true
  } as BreadCrumbNav
]
</script>

<style scoped>

</style>
