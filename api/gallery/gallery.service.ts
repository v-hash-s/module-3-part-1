import { connectDB } from "@services/db_connection";
import ImageModel from "@models/MongoDB/image.model";
import { log } from "@helper/logger";

export class GalleryService {
  async sendGalleryObject(queryParameters) {
    console.log("QUERY: ", queryParameters);

    const galleryResponse = {
      objects: await this.getPhotosArray(
        queryParameters.page,
        queryParameters.limit
      ),
      total: await this.getPagesNumber(queryParameters),
    };

    log("GALLERY Response: ", galleryResponse);

    return galleryResponse;
  }

  async getPagesNumber(queryParameters) {
    let limit = Number(queryParameters.limit);
    const counts = await ImageModel.count();
    const finalResult = Math.ceil(counts / limit);

    return finalResult;
  }

  async getTotal(queryParameters) {
    const total = await this.getPagesNumber(queryParameters);
    return total;
  }

  async getPhotosArray(pageNumber: number, limit: number) {
    log("Page num: ", pageNumber);
    log("limit: ", limit);
    const arr = await this.getValue();
    const photos: string[] = [];
    limit = Number(limit);
    pageNumber = Number(pageNumber);

    for (
      let i = (pageNumber - 1) * limit;
      i < limit + (pageNumber - 1) * limit && i < arr.length;
      i++
    ) {
      photos.push(arr[i].path);
      log(arr[i] + " : " + i);
    }

    return photos;
  }

  async getValue() {
    const arr = await ImageModel.find({}, { path: 1, _id: 0 }).exec();
    return arr;
  }
}
