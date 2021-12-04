export async function getUsers({ instance }) {
    return await instance.get("/admin/users")
}

export async function deleteUser({ instance }, id) {
    return await instance.delete("/admin/users/" + id)
}

export async function getSellers({ instance }) {
    return await instance.get("/admin/sellers")
}

export async function getSellerCertificates({ instance }, data) {
    return await instance.get("/admin/seller-certificates", data)
  }

export async function updateCertificateStatus({ instance }, body) {
    return await instance.post("/admin/update-certificate-status", body)
}

export async function deleteSeller({ instance }, id) {
    return await instance.delete("/admin/users/" + id)
}

export async function getOrders({ instance }) {
    return await instance.get("/admin/orders")
}

export async function deleteOrder({ instance }, id) {
    return await instance.delete("/admin/orders/" + id)
}

export async function getShippers({ instance }) {
    return await instance.get("/admin/shippers")
}

export async function deleteShipper({ instance }, id) {
    return await instance.delete("/admin/shippers/" + id)
}

export async function addShipper({ instance }, body) {
    return await instance.post("/admin/shippers", body)
}

