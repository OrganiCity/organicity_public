export async function getStoreProducts({ instance }, payload) {
  return await instance.post("/get-store-products", payload)
}

export async function deleteMyProduct({ instance }, payload) {
  return await instance.post("/delete-my-product", payload)
}

export async function getCertificates({ instance }) {
  return await instance.get("/services/certificates")
}
export async function getCertificatesBySellerID({ instance }, payload) {
  return await instance.get("/services/certificates/" + payload)
}
export async function getAvailableCertificatesBySellerID({ instance }, payload) {
  return await instance.get("/services/available-certificates/" + payload)
}
export async function sendCertificateApprovalRequest({ instance }, payload) {
  return await instance.post("/certificate-approval-request", payload)
}

export async function deleteCertificate({ instance }, payload) {
  return await instance.post("/services/delete-certificate", payload)
}

export async function getStoreProductsByID({ instance }, payload) {
  return await instance.get("/services/store/" + payload)
}