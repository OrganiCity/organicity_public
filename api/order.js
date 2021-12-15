export async function getOrderPreviewsByID({ instance }, payload) {
  return await instance.get("/order/get-order-previews/" + payload)
}

export async function getOrderDetailsByOrderNumber({ instance }, payload) {
  return await instance.get("/order/get-order-details/" + payload)
}

export async function createNewOrder({ instance }, payload) {
  return await instance.post("/order/new-order", payload)
}
