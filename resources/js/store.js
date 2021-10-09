import axios from 'axios';
import Vuex, { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'



export default createStore({
    state: {
        user: {}
    },

    mutations: {
        setUserState: (state, value) => state.user = value
    },

    actions: {
        userStateAction: () => {
            axios.get('api/user/me').then(response => {
                const userResponse = response.data.user
                commit('setUserState', userResponse)
                console.log(response)
            })
        }
    },
})

