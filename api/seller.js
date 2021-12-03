export async function getStoreProducts({ instance }, payload) {
  return await instance.post("/get-store-products", payload)
}

export async function deleteMyProduct({ instance }, payload) {
  return await instance.post("/delete-my-product", payload)
}

export async function getCertificates({ instance }) {
  return await instance.get("/certificates")
}
export async function getStoreProductsByID({ instance }, payload) {
  return await instance.get("/services/store/" + payload)
}