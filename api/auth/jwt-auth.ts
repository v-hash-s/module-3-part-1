import { log } from "@helper/logger";
import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerWithContextHandler,
} from "aws-lambda";
import * as JWT from "jsonwebtoken";
import UserModel from "@models/MongoDB/user.model";
import { Response } from "@helper/http-api/response";
import { getEnv } from "@helper/environment";
import * as jwt from "jsonwebtoken";
import { connectDB } from "@services/db_connection";

export const authenticationJWT = async (event) => {
  await connectDB;
  log("AUTHORIZER: ", event);

  const token = event.authorizationToken.toString().replace("Bearer ", "");
  log("TOKEN: ", token);
  try {
    let user = jwt.verify(token, getEnv("TOKEN_KEY"));
    log("USER: ", user);
    if (!(await isPresent(user))) {
      throw new Error("Unauthorized");
    }
    return generatePolicy("user", "Allow", "*", {
      //@ts-ignore
      user: user.email,
      body: event.body,
    });
  } catch (err) {
    return generatePolicy("user", "Deny", "*", {});
  }
};

export function generatePolicy<C extends APIGatewayAuthorizerResult["context"]>(
  principalId: string,
  effect: "Allow" | "Deny",
  resource: string,
  context: C
): APIGatewayAuthorizerResult & { context: C } {
  const authResponse: APIGatewayAuthorizerResult & { context: C } = {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context,
  };

  return authResponse;
}

async function isPresent(jwt_payload) {
  const isPresent = await UserModel.find({ email: jwt_payload.email }).then(
    (user: any) => {
      console.log(user);
      if (!user) {
        return false;
      } else {
        return true;
      }
    }
  );
  log(isPresent);
  return isPresent;
}
