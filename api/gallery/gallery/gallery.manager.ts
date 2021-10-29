import { GalleryRequestParams } from "./gallery.interfaces";
import { GalleryService } from "./gallery.service";
import ImageModel from "@models/MongoDB/image.model";
import { getEnv } from "@helper/environment";
import * as jwt from "jsonwebtoken";
import { log } from "@helper/logger";
export class GalleryManager {
  private readonly service: GalleryService;

  constructor() {
    this.service = new GalleryService();
    // this.limit = queryParameters.limit
  }

  async sendUsersImage(queryParameters, email) {
    let filter;
    if (queryParameters.filter == null) {
      filter = false;
      return this.service.sendGalleryObject(queryParameters);
    } else {
      log("EMAIL: ", email);
      const objects = await ImageModel.find(
        { owner: await email },
        { path: 1, _id: 0 }
      ).exec();
      log(objects);
      const images = objects.map((img: any) => {
        return img.path;
      });
      log(images);

      const galleryResponse = {
        objects: images,
      };
      log(galleryResponse);
      return galleryResponse;
    }
  }

  async getEmailFromToken(token: string) {
    const email = jwt.verify(token, getEnv("TOKEN_KEY"));
    // @ts-ignore
    return email.email;
  }
}
