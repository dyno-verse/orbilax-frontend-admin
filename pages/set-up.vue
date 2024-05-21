<template>
  <div
      class="flex flex-row p-5 w-4/5 md:w-1/2 lg:w-1/3 rounded-lg items-center border border-gray-200  mx-auto justify-center justify-items-center align-middle mt-20 h-[400px]">
    <Card>
      <h3 class="text-2xl mx-1">Businesses</h3>
      <div class="grid grid-cols-3 justify-items-center my-3">
        <div v-for="business in user.businesses" class="text-center"
             @click="selectedBusiness(business.branches[0].id)">
          <div
              class="bg-white border-gray-300 border rounded-lg p-5 flex flex-col items-center mx-1 my-1 cursor-pointer">
            <h3 class="text-6xl">{{ getFirstTwoCharacters(business.name) }}</h3>
          </div>
          <p class="text-lg line-clamp-1">{{ business.name }}</p>
        </div>

      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import {IUser} from "~/repository/models/ApiResponse";

const isPending = ref(true);
const {$api} = useNuxtApp();
const {signIn} = useAuth()
const email = ref('')
const password = ref('')
const snackbar = useSnackbar();
const user = ref({} as IUser)


const mySignInHandler = async ({email, password}: { email: string, password: string }) => {
  const {error, url} = await signIn('credentials', {email, password, redirect: false})
  if (error) {
    // Do your custom error handling here
    snackbar.add({
      type: 'error',
      text: 'Sorry! Authentication failed'
    })
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo('/dashboard', {external: true})
  }
}


const getUsers = () => {
  isPending.value = true;
  $api.user.getUser().then(data => {
    user.value = data.data
  }).catch(error => {
    isPending.value = false;

  })
}
const selectedBusiness = (branchId: string) => {
  localStorage.setItem('branchId', branchId)
  // console.log(branchId)
  mySignInHandler({email:'maxcofie+admin@gmail.com',password:'1234567890'})
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

definePageMeta({
  // auth: {
  //   unauthenticatedOnly: false,
  //   navigateAuthenticatedTo: '/dashboard',
  // }
})

getUsers()
</script>

<style scoped>

</style>
