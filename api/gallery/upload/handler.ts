import { log } from "@helper/logger";
import * as multipartParser from "lambda-multipart-parser";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { UploadService } from "./upload.service";
import { UploadManager } from "./upload.manager";
import * as path from "path";

export const uploadImage = async (event) => {
  const payload = await multipartParser.parse(event);
  //   log(payload);
  const content = payload.files[0].content;
  const filename = payload.files[0].filename;
  log(content);
  //   log(event);
  const pathToImages = path.resolve(
    path.join(__dirname, "../../../../../images")
  );
  const manager = new UploadManager();
  const service = new UploadService();
  await service.saveImageLocally(filename, content);
  const stats = await manager.getMetadata(path.join(pathToImages, filename));
  log(stats);
  const token = await event.multiValueHeaders.Authorization.toString().replace(
    "Bearer ",
    ""
  );
  const email = await manager.getEmailFromToken(token);
  log("STATS: ", stats);
  log("EMAIL: ", email);
  await service.saveImageInDB(filename, stats, email);
};
