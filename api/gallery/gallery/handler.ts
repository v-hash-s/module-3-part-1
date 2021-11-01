import { GalleryManager } from "./gallery.manager";
import { GalleryService } from "./gallery.service";
import { GalleryRequestParams } from "./gallery.interfaces";
import { createResponse } from "@helper/http-api/response";
import { errorHandler } from "@helper/http-api/error-handler";
import { log } from "@helper/logger";
import ImageModel from "@models/MongoDB/image.model";
import { connectDB } from "@services/db_connection";
import { AuditManager } from "aws-sdk";

export const getGalleryPage = async (event) => {
  try {
    await connectDB;
    const queryParameters = event.queryStringParameters;
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
