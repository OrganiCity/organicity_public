export async function getFeatured({ instance }) {
    return await instance.get("/featured")
}

export async function getFeaturedImages({ instance }) {
    return await instance.get("https://gist.githubusercontent.com/dogkansaracedu/3404bc75157ab08c61336c0a0a0e9487/raw/631c0b9344ffa19f50876c2c23668d88baac5db0/test.json")
}