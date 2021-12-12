export async function getSearchResults({ instance }, payload) {
    return await instance.get("/search", { params: payload })
}

export async function getAllChildCategories({ instance }, payload) {
    return await instance.get("/get-all-child-categories/" + (payload || ""))
}