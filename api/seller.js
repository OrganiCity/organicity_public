export async function getStoreProducts({ instance }, payload) {
  return await instance.post("/get-store-products", payload)
}

export async function deleteMyProduct({ instance }, payload) {
  return await instance.post("/delete-my-product", payload)
}