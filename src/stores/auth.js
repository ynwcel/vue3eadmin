import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    let store = reactive({
        nickname:"",
        authtoken:"",
        actions:[],
    })

    let update = function(d){
        for(let k in d){
            if(k in store){
                store[k] = d[k];
            }
        }
    }

    let logout = function(){
        store.nickname = "";
        store.authtoken = "";
        store.actions = [];
    }

    return { store, update, logout }
},{
    persist: {
        storage: localStorage,
    },
})
