import { GalleryService } from "./gallery.service";
import ImageModel from "@models/MongoDB/image.model";
import { getEnv } from "@helper/environment";
import * as jwt from "jsonwebtoken";
import { log } from "@helper/logger";

export class GalleryManager {
  private readonly service: GalleryService;

  constructor() {
    this.service = new GalleryService();
  }

  async sendUsersImage(queryParameters, email) {
    let filter;
    if (queryParameters.filter == null) {
      filter = false;
      const galleryResponse = await this.service.sendGalleryObject(
        queryParameters
      );
      return this.returnGalleryResponse(galleryResponse);
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
      return this.returnGalleryResponse(galleryResponse);
    }
  }
  async getEmailFromToken(token: string) {
    const email = jwt.verify(token, getEnv("TOKEN_KEY"));
    // @ts-ignore
    return email.email;
  }

  async returnGalleryResponse(galleryResponse) {
    if (galleryResponse) {
      return {
        statusCode: 200,
        content: galleryResponse,
      };
    } else {
      return {
        statusCode: 404,
        content: { errorMessage: "Images not found" },
      };
    }
  }
}
