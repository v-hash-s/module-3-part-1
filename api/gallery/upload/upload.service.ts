import { connectDB } from "@services/db_connection";
import ImageModel from "@models/MongoDB/image.model";
import * as fs from "fs";
import * as path from "path";
import * as util from "util";
const stat = util.promisify(fs.stat);

export class UploadService {
  private readonly FOLDER_PATH: string = "../../../../images";
  async saveImageInDB(uploadedImage, stats, user) {
    const image = new ImageModel({
      path: uploadedImage,
      metadata: stats,
      owner: user,
    });
    await image.save().then((result: any) => console.log(result));
  }

  async saveImageLocally(uploadedImage) {
    fs.writeFile(
      path.join(__dirname, `${this.FOLDER_PATH}/${uploadedImage}`),
      uploadedImage,
      (err: any) => {
        if (err) console.error(err);
      }
    );
  }
}
