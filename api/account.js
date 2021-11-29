
export async function updatePersonalInfo({ instance }, payload) {
    return await instance.put("/update-personal-info", payload)
}


export async function updateContactInfo({ instance }, payload) {
    return await instance.put("/update-contact-info", payload)
}