export async function getProductByID({ instance }, payload) {
    return await instance.get("/services/product/" + payload)
}