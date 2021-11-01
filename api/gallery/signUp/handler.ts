import { log } from "@helper/logger";
import { SignUpManager } from "./sign_up.manager";
import { SignUpService } from "./sign_up.service";
import { errorHandler } from "@helper/http-api/error-handler";
import { createResponse } from "@helper/http-api/response";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const signUp = async (event) => {
  try {
    const user = JSON.parse(event.body!);
    const manager = new SignUpManager();
    const result = await manager.signUp(user);

    return createResponse(result.statusCode, result.message);
  } catch (error) {
    return errorHandler(error);
  }
};
