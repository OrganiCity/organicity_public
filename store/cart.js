export const state = () => ({
    items: { '1': { id: 1, name: 'oley', count: 2, price: 12.35 },'2': { id: 1, name: 'oley2', count: 2, price: 1.25 } },
})

export const mutations = {
    addToCart(state, payload) { state.items[payload.id] = payload },
    removeFromCart(state, payload) { delete state.items[payload] },
    updateCart(state, payload) { state.items = JSON.parse(JSON.stringify(payload)) },
    clearCart(state) { state.items = {} },
}

export const getters = {
    items: (state) => state.items,
    totalPrice: (state) => Object.values(state.items).reduce((p, c) => p + c.price * c.count, 0)
}