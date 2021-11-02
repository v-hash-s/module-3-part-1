import { createResponse } from "@helper/http-api/response";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { LoginManager } from "./login.manager";
import { LoginService } from "./login.service";
import { errorHandler } from "@helper/http-api/error-handler";
import { HttpBadRequestError } from "@errors/http";
import { log } from "@helper/logger";

// export const login: APIGatewayProxyHandlerV2 = async (event) => {
//   try {
//     return createResponse(200, { message: "login GET request" });
//   } catch (e) {
//     return errorHandler(e);
//   }
// };

export const login: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const user = JSON.parse(event.body!);
    const manager = new LoginManager();
    const result = await manager.sendResponseToUser(user);
    return createResponse(result.statusCode, result.content);
  } catch (err) {
    return errorHandler(err);
  }
};
