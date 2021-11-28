export async function getFeatured({ instance }) {
    return await instance.get("/featured")
}

export async function getCarouselSlides({ instance }) {
    return await instance.get("/getCarouselSlides")
}

export async function getSpecialDeals({ instance }) {
    return await instance.get("/getSpecialDeals")
}

export async function getMainPageItems({instance}) {
    return await instance.get("/getMainPageItems")
}

export async function getProductPreviewDetails({instance}, payload) {
    return await instance.post("/getProductPreviewDetails", payload)
}

// export async function getFeaturedImages({ instance }) {
//     return await instance.get("https://gist.githubusercontent.com/dogkansaracedu/3404bc75157ab08c61336c0a0a0e9487/raw/631c0b9344ffa19f50876c2c23668d88baac5db0/test.json")
// }

// export async function getSpecialDeals({ instance }) {
//     return await instance.get("https://gist.githubusercontent.com/dogkansaracedu/ffe0ae6cf3791cd99dfd533b4e3f5118/raw/a8638d88445a8b16848ed061a26462eefd03a6a7/SpecialDeals.json")
// }

export async function getCategories({ instance }) {
    return await instance.get("/categories")
}

