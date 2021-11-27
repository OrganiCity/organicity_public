//Main Carousel
export async function addCarouselSlide({ instance }, data) {
  return await instance.post("/admin/addCarouselSlide", data)
}

export async function removeCarouselSlide({ instance }, data) {
  return await instance.post("/admin/removeCarouselSlide", data)
}
//Special Deals
