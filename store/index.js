export const state = () => ({
    loadingQueue: 0,
})

export const mutations = {
    addLoading(state) { state.loadingQueue++ },
    removeLoading(state) { state.loadingQueue-- },
    clearLoading(state) { state.loadingQueue = 0 },
}

export const getters = {
    isLoading: (state) => { return (state.loadingQueue === 0 ? false : true) },
}