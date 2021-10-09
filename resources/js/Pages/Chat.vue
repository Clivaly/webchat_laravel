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
                            @click="() => {loadMessage(user.id)}"
                            :class="(userActive && userActive.id == user.id) ? 'bg-indigo-200 bg-opacity-50' : ''"
                            class="p-6 text-lg text-gray-600 leading-7 font-semibold border-b border-indigo-200 hover:bg-indigo-200 hover:opacity-50  hover:cursor-pointer">
                                <p class="flex place-items-center">
                                    {{ user.name }}
                                    <span v-if="user.notification" class="ml-2 w-2 h-2 bg-blue-400 rounded-full"></span>
                                </p>
                            </li>
                        </ul>
                    </div>

                     <!-- box-message -->
                    <div class="w-9/12 flex flex-col justify-between">

                      <!-- message -->
                    <div class="w-full p-6 flex flex-col overflow-y-scroll">
                          <div
                              v-for="message in messages" :key="message.id"
                              :class="(message.from == $page.props.user.id) ? 'text-right' : ''"
                              class="w-full mb-3 ">
                              <p
                                :class="(message.from == $page.props.user.id) ? 'messageFromMe' : 'messageToMe'"
                                class="inline-block p-2 rounded-md bg-indigo-300" style="max-width: 75%;">
                                {{ message.content }}
                             </p>
                               <span class="block mt-1 text-xs text-gray-500">{{ message.created_at }}</span>
                          </div>
                    </div>

                       <!-- form -->
                    <div v-if="userActive" class="w-full bg-gray-200 bg-opacity-25 p-6 border-t border-gray-200">
                        <form v-on:submit.prevent="sendMessage">
                           <div class="flex rounded-md overflow-hidden border border-gray-300">
                            <input v-model="message" type="text" class="flex-1 rounded-l px-4 py-2 text-sm focus:outline-none">
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
    import Vue, { defineComponent } from 'vue'
    import AppLayout from '@/Layouts/AppLayout.vue'

    import createStore from '../store'

    export default defineComponent({
        components: {
            AppLayout,
        },

        data(){
            return{
                users: [],
                messages: [],
                userActive: null,
                message: ''
            }
        },

        computed: {
            user() {
                return createStore.state.user
            }
        },
        methods: {
            scrollToBottom: function() {
                if(this.message.length){
                    document.querySelectorAll('.message:last-child')[1].scrollIntoView()
                }
            },


            loadMessage: async function(userId) {

                axios.get(`api/users/${userId}`).then(response => {
                    this.userActive = response.data.user
                })

                await axios.get(`api/messages/${userId}`).then(response => {
                    this.messages = response.data.messages
                })

                this.scrollToBottom()
            },

            sendMessage: async function() {

                await axios.post('api/messages/store', {
                    'content': this.message,
                    'to': this.userActive.id,
                }).then(response => {

                    this.messages.push({
                        'from': this.user.id,
                        'to': this.userActive.id,
                        'content': this.message,
                        'created_at': new Date().toISOString(),
                        'updated_at': new Date().toISOString()
                    })

                    this.message = ''
                })

                this.scrollToBottom()

            }
        },

        mounted() {
            axios.get('api/users').then(response => {
                this.users = response.data.users
            })

            Echo.private(`user.${this.user.id}`).listen('.SendMessage', async (e) => {

                if(this.userActive && this.userActive.id == e.message.from) {
                    await this.messages.push(e.message)
                    this.scrollToBottom()
                } else {
                    const user =  this.users.filter((user) => {
                        if(user.id === e.message.from) {
                            return user
                        }
                    })

                    if(user) {
                        // user.notification = true [deveria ser reativo mas não irá funcionar... então...]
                        Vue.useAttrs(user[0], notification, true)
                    }
                }
            })
        }
    })
</script>


