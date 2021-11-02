import { GalleryManager } from "./gallery.manager";
import { createResponse } from "@helper/http-api/response";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { errorHandler } from "@helper/http-api/error-handler";
import { log } from "@helper/logger";
import { connectDB } from "@services/db_connection";
import * as multipartParser from "lambda-multipart-parser";

export const getGallery: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    await connectDB;
    const queryParameters = event.queryStringParameters;
    //@ts-ignore
    const token = event.multiValueHeaders.Authorization.toString().replace(
      "Bearer ",
      ""
    );
    log(token);
    const manager = new GalleryManager();
    const email = await manager.getEmailFromToken(token);
    const result = await manager.sendUsersImage(queryParameters, email);
    log(result);
    return createResponse(result.statusCode, result.content);
  } catch (err) {
    return errorHandler(err);
  }
};

export const upload: APIGatewayProxyHandlerV2 = async (event) => {
  //@ts-ignore
  const payload = await multipartParser.parse(event);
  //@ts-ignore
  const token = await event.multiValueHeaders.Authorization.toString().replace(
    "Bearer ",
    ""
  );
  const manager = new GalleryManager(payload, token);
  if (await manager.isExist(payload.files[0].filename)) {
    const response = {
      statusCode: 309,
      content: "Image already exists",
    };
    return createResponse(response.statusCode, response.content);
  }
  const result = await manager.saveImages();
  return createResponse(result.statusCode, result.content);
};
