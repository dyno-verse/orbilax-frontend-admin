<template>
  <div>
    <div class="flex justify-between h-14">
      <Breadcrumb :pages="pages"/>
    </div>

    <div class="flex flex-wrap py-8">
      <NuxtLink :to="option.url" v-for="option in options" class="space-x-2 flex m-2.5">
        <div class="p-8 bg-white border border-gray-300 rounded-lg flex flex-col text-center items-center">
          <img :src="option.image" class="w-14">
          <h1 class="font-bold text-lg">{{ option.name }}</h1>
        </div>
      </NuxtLink>
    </div>
  </div>

</template>

<script lang="ts" setup>
import BreadCrumbNav from "~/components/units/Breadcrumb.vue";
import Breadcrumb from "../components/units/Breadcrumb.vue";

definePageMeta({
  layout: "main",
  middleware: "auth"
});

const options = [
  {
    name: "Generate QR Code",
    image: "../assets/imgs/menu.png",
    url: "/dashboard/operations/generate-qrcode"
  },
  {
    name: "Sales Report",
    image: "../assets/imgs/business-report.png",
    url: ''
  }
]

const pages = [
  {
    name: 'Operations',
    link: '/dashboard/operations/',
    isActive: true
  } as BreadCrumbNav
]

</script>

<style scoped>

</style>
