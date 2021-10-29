import { log } from "@helper/logger";
import * as multipartParser from "lambda-multipart-parser";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { UploadService } from "./upload.service";
import { UploadManager } from "./upload.manager";
import * as path from "path";

import { promisify } from "util";
import * as childProcess from "child_process";

const execFileP = promisify(childProcess.execFile);

export const uploadImage = async (event) => {
  const payload = await multipartParser.parse(event);
  //   log(payload);
  const filename = payload.files[0].filename;
  log(filename);
  //   log(event);
  log(path.resolve(path.join(__dirname, "../../../../../images")));
  const manager = new UploadManager();
  const service = new UploadService();
  //   const stats = await manager.getMetadata(filename);
  //   const token = await event.multiValueHeaders.Authorization.toString().replace(
  //     "Bearer ",
  //     ""
  //   );
  //   const email = await manager.getEmailFromToken(token);
  //   log("STATS: ", stats);
  //   log("EMAIL: ", email);
  await service.saveImageLocally(filename);
  //   await service.saveImageInDB(filename, stats, email);
};
