import { log } from "@helper/logger";
import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerWithContextHandler,
} from "aws-lambda";
import * as JWT from "jsonwebtoken";
// import UsersModel from "@models/MongoDB/user.model";
// import { Response } from "@helper/http-api/response";
import { getEnv } from "@helper/environment";

// const UNAUTHORIZED = new Error("Unauthorized");

export const authenticationJWT = async (event: any) => {
  log(event);

  const token = event.authorizationToken.split(" ")[1];
  try {
    let user = JWT.verify(token, getEnv("TOKEN_KEY"));
    return generatePolicy("user", "Allow", "*", {
      //@ts-ignore
      user: event.email,
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

// // Remove example

// import { log } from '@helper/logger';
// import {
//   APIGatewayAuthorizerSimpleResult,
//   APIGatewayRequestAuthorizerHttpApiPayloadV2Event,
// } from '@interfaces/api-gateway-authorizer';
// import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerWithContextHandler } from 'aws-lambda';
// import { Handler } from 'aws-lambda/handler';

// const UNAUTHORIZED = new Error('Unauthorized');

// // Authorizer with simple response
// // See: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html#http-api-lambda-authorizer.v2
// export const httpApiSimple: Handler<
//   APIGatewayRequestAuthorizerHttpApiPayloadV2Event,
//   APIGatewayAuthorizerSimpleResult
// > = async (event) => {
//   log(event);

//   const token = event.identitySource?.[0];

//   if (token === 'error') {
//     throw new Error('Internal server error');
//   }

//   if (token !== 'token') {
//     return {
//       isAuthorized: false,
//     };
//   }

//   return {
//     isAuthorized: true,
//     context: {
//       var1: 'v1',
//     },
//   };
// };

// // Authorizer with policy response (compatible with REST API)
// // See: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html#http-api-lambda-authorizer.v2
// export const httpApiPolicy: APIGatewayTokenAuthorizerWithContextHandler<Record<string, any>> = async (event) => {
//   log(event);

//   if (event.authorizationToken === 'error') {
//     throw new Error('Internal server error');
//   }

//   if (event.authorizationToken !== 'token') {
//     throw UNAUTHORIZED;
//   }

//   return generatePolicy('user', 'Allow', '*', {});
// };

// // REST API authorizer
// // See: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html
// export const restApi: APIGatewayTokenAuthorizerWithContextHandler<Record<string, any>> = async (event) => {
//   log(event);

//   if (event.authorizationToken === 'error') {
//     throw new Error('Internal server error');
//   }

//   if (event.authorizationToken !== 'token') {
//     throw UNAUTHORIZED;
//   }

//   return generatePolicy('user', 'Allow', '*', {});
// };

// export function generatePolicy<C extends APIGatewayAuthorizerResult['context']>(
//   principalId: string,
//   effect: 'Allow' | 'Deny',
//   resource: string,
//   context: C
// ): APIGatewayAuthorizerResult & { context: C } {
//   const authResponse: APIGatewayAuthorizerResult & { context: C } = {
//     principalId,
//     policyDocument: {
//       Version: '2012-10-17',
//       Statement: [
//         {
//           Action: 'execute-api:Invoke',
//           Effect: effect,
//           Resource: resource,
//         },
//       ],
//     },
//     context,
//   };

//   return authResponse;
// }
