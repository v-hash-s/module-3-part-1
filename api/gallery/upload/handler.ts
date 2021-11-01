import { log } from "@helper/logger";
import * as multipartParser from "lambda-multipart-parser";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { UploadService } from "./upload.service";
import { UploadManager } from "./upload.manager";
import * as path from "path";
import { createResponse } from "@helper/http-api/response";

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
  if (await manager.isExist(filename)) {
    const response = {
      statusCode: 309,
      content: "Image already exists",
    };
    return createResponse(response.statusCode, response.content);
  }
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
  const result = await manager.returnResponse(manager.isExist(filename));
  return createResponse(result.statusCode, result.content);
};
