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