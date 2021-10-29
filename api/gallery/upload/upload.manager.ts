import { UploadService } from "./upload.service";
import { connectDB } from "@services/db_connection";
import ImageModel from "@models/MongoDB/image.model";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import { getEnv } from "@helper/environment";

export class UploadManager {
  private readonly service: UploadService;

  constructor() {
    this.service = new UploadService();
  }

  async isExist(image) {
    await connectDB;
    const exist = await ImageModel.findOne({ path: image }, { path: 1 }).then(
      function (data: any) {
        if (data) {
          return true;
        } else {
          return false;
        }
      }
    );
    return exist;
  }
  async getMetadata(image) {
    const stats = fs.statSync(image);
    return stats;
  }

  async getEmailFromToken(token) {
    const email = jwt.verify(token, getEnv("TOKEN_KEY"));
    // @ts-ignore
    return email.email;
  }
}
