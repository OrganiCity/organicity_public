import axios from "axios"

import * as example from "@/api/example"

const apis = {
    ...example,
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