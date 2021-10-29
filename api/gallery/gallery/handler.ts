import { GalleryManager } from "./gallery.manager";
import { GalleryService } from "./gallery.service";
import { GalleryRequestParams } from "./gallery.interfaces";
import { createResponse } from "@helper/http-api/response";
import { errorHandler } from "@helper/http-api/error-handler";
import { log } from "@helper/logger";
import ImageModel from "@models/MongoDB/image.model";
import { connectDB } from "@services/db_connection";

export const getGalleryPage = async (event) => {
  await connectDB;
  const queryParameters = event.queryStringParameters;
  log(queryParameters);
  const service = new GalleryService();
  service.sendGalleryObject(queryParameters);
};
