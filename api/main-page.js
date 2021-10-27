export async function getFeatured({ instance }) {
    return await instance.get("/featured")
}