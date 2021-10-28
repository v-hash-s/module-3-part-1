import { connectDB } from "@services/db_connection";
import { GalleryRequestParams, GalleryResponse } from "./gallery.interfaces";
import ImageModel from "@models/MongoDB/image.model";

export class GalleryService {
  async getImages(galleryQuery: GalleryRequestParams) {
    console.log(JSON.stringify(ImageModel));
  }
}
