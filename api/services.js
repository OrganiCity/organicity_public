export async function getProductByID({ instance }, payload) {
    return await instance.get("/services/product/" + payload)
}

export async function submitForm({ instance }, payload) {
    return await instance.post("/submitForm", payload)
}
