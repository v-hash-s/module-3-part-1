import { UploadService } from "./upload.service";
import { connectDB } from "@services/db_connection";
import ImageModel from "@models/MongoDB/image.model";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import { getEnv } from "@helper/environment";
import { log } from "@helper/logger";
import * as util from "util";
const stat = util.promisify(fs.stat);
import * as path from "path";

export class UploadManager {
  private readonly service: UploadService;
  private readonly PATH_TO_IMAGES = path.resolve(
    path.join(__dirname, "../../../../../images")
  );
  private readonly content;
  private readonly filename;
  private readonly token;

  constructor(payload, token) {
    this.service = new UploadService();
    this.content = payload.files[0].content;
    this.filename = payload.files[0].filename;
    this.token = token;
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
    log(image);
    const stats = await stat(image);
    log(stats);
    return stats;
  }

  async getEmailFromToken(token) {
    const email = jwt.verify(token, getEnv("TOKEN_KEY"));
    // @ts-ignore
    return email.email;
  }

  async returnResponse(isImageUploaded) {
    if (isImageUploaded) {
      return {
        content: "Image is successfully uploaded",
        statusCode: 200,
      };
    }
    return {
      content: "Error occured",
      statusCode: 500,
    };
  }

  async saveImages() {
    await this.service.saveImageLocally(this.filename, this.content);
    const stats = await this.getMetadata(
      path.join(this.PATH_TO_IMAGES, this.filename)
    );
    const email = await this.getEmailFromToken(this.token);
    await this.service.saveImageInDB(this.filename, stats, email);
    return await this.returnResponse(this.isExist(this.filename));
  }
}
