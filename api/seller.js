export async function getStoreProducts({ instance }, payload) {
  return await instance.post("/get-store-products", payload)
}