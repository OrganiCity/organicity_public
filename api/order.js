export async function getOrderPreviewsByID({ instance }, payload) {
    return await instance.get("/order/get-order-previews/" + payload)
  }
  