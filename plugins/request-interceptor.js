import axios from "axios"

import * as example from "@/api/example"
import * as mainPage from "~/api/main-page"
import * as auth from "~/api/auth"
import * as admin from "~/api/admin"
import * as services from "~/api/services"
import * as account from "~/api/account"
import * as seller from "~/api/seller"
import * as adminAdvanced from "~/api/admin-advanced"
import * as order from "~/api/order"

const apis = {
    ...example,
    ...mainPage,
    ...auth,
    ...admin,
    ...services,
    ...account,
    ...seller,
    ...adminAdvanced,
    ...order
}

export default function ({ store }, inject) {
    function api(apiToCall, payload) {
        const token = store.getters['auth/userToken']
        let instance = token ?
            axios.create({
                baseURL: process.env.baseURL,
                headers: {
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json'
                },
            })
            :
            axios.create({
                baseURL: process.env.baseURL,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return apis[apiToCall]({ instance, store }, payload)
    }
    inject('api', api)
}