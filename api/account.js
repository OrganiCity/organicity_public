
export async function updatePersonalInfo({ instance }, payload) {
    return await instance.put("/update-personal-info", payload)
}


export async function updateContactInfo({ instance }, payload) {
    return await instance.put("/update-contact-info", payload)
}

export async function getFavoriteProducts({ instance }, payload) {
    return await instance.post("/get-favorite-products", payload)
}

export async function newSeller({ instance }, payload) {
    return await instance.post("/new-seller", payload);
}

export async function getAddresses({ instance }, payload) {
    return await instance.post("/get-addresses", payload);
}

export async function newAddress({ instance }, payload) {
    return await instance.post("/new-address", payload);
}

export async function removeAddress({ instance }, payload) {
    return await instance.put("/remove-address", payload);
}

export async function updateAddress({ instance }, payload) {
    return await instance.put("/update-address", payload);
}
