import { log } from "@helper/logger";
import * as multipartParser from "lambda-multipart-parser";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { UploadService } from "./upload.service";
import { UploadManager } from "./upload.manager";
import * as path from "path";
import { createResponse } from "@helper/http-api/response";

export const upload = async (event) => {
  const payload = await multipartParser.parse(event);
  // const content = payload.files[0].content;
  // const filename = payload.files[0].filename;
  const token = await event.multiValueHeaders.Authorization.toString().replace(
    "Bearer ",
    ""
  );
  const manager = new UploadManager(payload, token);
  // const service = new UploadService();
  if (await manager.isExist(payload.files[0].filename)) {
    const response = {
      statusCode: 309,
      content: "Image already exists",
    };
    return createResponse(response.statusCode, response.content);
  }

  // await service.saveImageLocally(filename, content);
  // const stats = await manager.getMetadata(path.join(pathToImages, filename));
  // const token = await event.multiValueHeaders.Authorization.toString().replace(
  //   "Bearer ",
  //   ""
  // );
  // const email = await manager.getEmailFromToken(token);
  // await service.saveImageInDB(filename, stats, email);
  // const result = await manager.returnResponse(manager.isExist(filename));
  const result = await manager.saveImages();
  return createResponse(result.statusCode, result.content);
};
