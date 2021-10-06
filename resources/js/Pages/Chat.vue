<template>
    <app-layout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Chat
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg flex" style="min-height: 400px; max-height: 400px;">

                    <!-- list-users -->
                    <div class="w-3/12 bg-gray-300 bg-opacity-25 border-r border-gray-400 overflow-y-scroll">
                        <ul>
                            <li
                            v-for="user in users" :key="user.id"
                            class="p-6 text-lg text-gray-600 leading-7 font-semibold border-b border-indigo-200 hover:bg-indigo-200 hover:opacity-50  hover:cursor-pointer">
                                <p class="flex place-items-center">
                                    {{ user.name }}
                                    <span class="ml-2 w-2 h-2 bg-blue-400 rounded-full"></span>
                                </p>
                            </li>
                        </ul>
                    </div>

                     <!-- box-message -->
                    <div class="w-9/12 flex flex-col justify-between">

                      <!-- message -->
                    <div class="w-full p-6 flex flex-col overflow-y-scroll">
                          <div class="w-full mb-3 text-right">
                              <p class="inline-block p-2 rounded-md bg-indigo-300" style="max-width: 75%;">
                                  Olá!
                              </p>
                               <span class="block mt-1 text-xs text-gray-500">05/10/2021 11:00</span>
                          </div>
                          <div class="w-full mb-3">
                              <p class="inline-block p-2 rounded-md bg-gray-300" style="max-width: 75%;">
                                  Oi!
                              </p>
                              <span class="block mt-1 text-xs text-gray-500">05/10/2021 11:01</span>
                          </div>

                          <div class="w-full mb-3 text-right">
                              <p class="inline-block p-2 rounded-md bg-indigo-300" style="max-width: 75%;">
                                  Olá!
                              </p>
                               <span class="block mt-1 text-xs text-gray-500">05/10/2021 11:01</span>
                          </div>
                          <div class="w-full mb-3">
                              <p class="inline-block p-2 rounded-md bg-gray-300" style="max-width: 75%;">
                                  Oi!
                              </p>
                              <span class="block mt-1 text-xs text-gray-500">05/10/2021 11:02</span>
                          </div>

                          <div class="w-full mb-3 text-right">
                              <p class="inline-block p-2 rounded-md bg-indigo-300" style="max-width: 75%;">
                                  Olá!
                              </p>
                               <span class="block mt-1 text-xs text-gray-500">05/10/2021 11:03</span>
                          </div>
                          <div class="w-full mb-3">
                              <p class="inline-block p-2 rounded-md bg-gray-300" style="max-width: 75%;">
                                  Oi!
                              </p>
                              <span class="block mt-1 text-xs text-gray-500">05/10/2021 11:04</span>
                          </div>
                    </div>

                       <!-- form -->
                    <div class="w-full bg-gray-200 bg-opacity-25 p-6 border-t border-gray-200">
                        <form>
                           <div class="flex rounded-md overflow-hidden border border-gray-300">
                               <input type="text" class="flex-1 rounded-l px-4 py-2 text-sm focus:outline-none">
                               <button type="submit" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2">Enviar</button>
                           </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script>
    import { defineComponent } from 'vue'
    import AppLayout from '@/Layouts/AppLayout.vue'

    export default defineComponent({
        components: {
            AppLayout,
        },

        data(){
            return{
                users: []
            }
        },

        mounted() {
            axios.get('api/users').then(response => {
                this.users = response.data.users
            })
        },
    })
</script>
