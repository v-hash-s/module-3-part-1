import { connectDB } from "@services/db_connection";
import ImageModel from "@models/MongoDB/image.model";
import * as fs from "fs";
import * as path from "path";
import * as util from "util";

export class UploadService {
  private readonly FOLDER_PATH: string = path.resolve(
    path.join(__dirname, "../../../../../images")
  );
  async saveImageInDB(uploadedImage, stats, user) {
    const image = new ImageModel({
      path: uploadedImage,
      metadata: stats,
      owner: user,
    });
    await image.save().then((result: any) => console.log(result));
  }

  async saveImageLocally(uploadedImage, uploadedContent) {
    fs.writeFile(
      path.join(this.FOLDER_PATH, uploadedImage),
      uploadedContent,
      { encoding: null },
      (err: any) => {
        if (err) console.error(err);
      }
    );
  }
}
