//Main Carousel
export async function addCarouselSlide({ instance }, data) {
  return await instance.post("/admin/addCarouselSlide", data)
}

export async function removeCarouselSlide({ instance }, data) {
  return await instance.post("/admin/removeCarouselSlide", data)
}
//Special Deals
export async function addSpecialDeal({ instance }, data) {
  return await instance.post("/admin/addSpecialDeal", data)
}

export async function removeSpecialDeal({ instance }, data) {
  return await instance.post("/admin/removeSpecialDeal", data)
}

// Categories
// Add
export async function addCategoryToTop({ instance }, data) {
  return await instance.post("/admin/add-category-to-top", data)
}
export async function addCategoryBelow({ instance }, data) {
  return await instance.post("/admin/add-category-below", data)
}

export async function addSubCategory({ instance }, data) {
  return await instance.post("/admin/add-sub-category", data)
}

// Update & Delete
export async function updateCategory({ instance }, data) {
  return await instance.put("/admin/add-sub-category", data)
}

export async function deleteCategory({ instance }, data) {
  return await instance.delete("/admin/add-sub-category", data)
}