import { log } from "@helper/logger";
import * as multipartParser from "lambda-multipart-parser";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { UploadService } from "./upload.service";
import { UploadManager } from "./upload.manager";

export const uploadImage = async (event) => {
  log(event);
  const payload = await multipartParser.parse(event);
  const filename = payload.files[0].filename;
  console.log(payload.files[0].filename);
  const manager = new UploadManager();
  const service = new UploadService();
  const stats = await manager.getMetadata(filename);
  const token = await event.multiValueHeaders.Authorization.toString().replace(
    "Bearer ",
    ""
  );
  const email = await manager.getEmailFromToken(token);
  log("STATS: ", stats);
  log("EMAIL: ", email);

  await service.saveImageInDB(filename, stats, email);
};
