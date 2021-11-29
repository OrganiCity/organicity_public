export const state = () => ({
    items: {},
})

export const mutations = {
    addToCart(state, payload) {
        if (state.items[payload] !== undefined) state.items[payload]++
        else state.items[payload] = 1
    },
    removeFromCart(state, payload) {
        if (state.items[payload] !== undefined) state.items[payload]--
        else delete state.items[payload]
    },
    setCount(state, payload) {
        // state.items[payload.id] = payload.count
        this._vm.$set(state.items, payload.id, payload.count)
        if (payload.count <= 0) this._vm.$delete(state.items, payload.id)
    },
    updateCart(state, payload) { state.items = JSON.parse(JSON.stringify(payload)) },
    clearCart(state) { state.items = {} },
}

export const getters = {
    items: (state) => state.items,
    // totalPrice: (state) => Object.values(state.items).reduce((p, c) => p + c.price * c.count, 0)
}