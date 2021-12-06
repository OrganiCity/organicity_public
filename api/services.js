export async function translate({ instance }, payload) {
    return await instance.post("/services/translate", payload)
}

export async function getProductByID({ instance }, payload) {
    return await instance.get("/services/product/" + payload)
}

export async function getCartProducts({ instance }, payload) {
    return await instance.get("/services/cart-product/", {
        params: { ids: payload }
    })
}

export async function isFavorited({ instance }, payload) {
    return await instance.post("/services/is-favorited", payload)
}

export async function addToFavorites({ instance }, payload) {
    return await instance.post("/services/add-to-favorites", payload)
}
export async function deleteFromFavorites({ instance }, payload) {
    return await instance.post("/services/delete-from-favorites", payload)
}


export async function submitForm({ instance }, payload) {
    return await instance.post("/submitForm", payload)
}
