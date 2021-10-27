import axios from "axios"

import * as example from "@/api/example"
import * as mainPage from "~/api/main-page"

const apis = {
    ...example,
    ...mainPage
}

export default function ({ store }, inject) {
    function api(apiToCall, payload) {
        const token = store.getters['auth/userToken']
        let instance = token ?
            axios.create({
                baseURL: process.env.baseURL,
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            :
            axios.create({
                baseURL: process.env.baseURL,
            })
        return apis[apiToCall]({ instance, store }, payload)
    }
    inject('api', api)
}