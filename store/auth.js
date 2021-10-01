export const state = () => ({
    loggedIn: false,
    userInfo: null,
    userToken: null,
})

export const mutations = {
    setUserInfo(state, payload) { state.userInfo = payload },
    setUserToken(state, payload) { state.userToken = payload },
    setLoggedIn(state, payload) { state.loggedIn = payload },
    logout(state) {
        state.userToken = null
        state.userInfo = null
        state.loggedIn = false
    }
}

export const getters = {
    userInfo: (state) => { return state.userInfo },
    userToken: (state) => { return state.userToken },
}