export async function getSearchResults({ instance }, payload) {
    return await instance.get("/search", { params: payload })
}