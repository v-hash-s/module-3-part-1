import { AWSPartitial } from "../types";

export const examplesConfig: AWSPartitial = {
  provider: {
    httpApi: {
      authorizers: {
        jwtauth: {
          type: "request",
          enableSimpleResponses: true,
          functionName: "jwtauth",
          identitySource: "$request.header.Authorization",
        },
      },
    },
  },

  functions: {
    loginGetResponse: {
      handler: "api/gallery/login/handler.loginGetRequestHandler",
      memorySize: 128,
      events: [
        {
          http: {
            path: "/",
            method: "get",
            cors: true,
          },
        },
      ],
    },

    loginPostResponse: {
      handler: "api/gallery/login/handler.loginPostRequestHandler",
      memorySize: 128,
      events: [
        {
          http: {
            path: "/",
            method: "post",
          },
        },
      ],
    },

    signUp: {
      handler: "api/gallery/signUp/handler.signUp",
      memorySize: 128,
      events: [
        {
          http: {
            path: "/signup",
            method: "post",
            cors: true,
            response: {
              headers: {
                "Access-Control-Allow-Credentials": "*",
              },
            },
          },
        },
      ],
    },

    jwtauth: {
      handler: "api/auth/handler.authenticationJWT",
      memorySize: 128,
    },

    galleryGetResponse: {
      handler: "api/gallery/gallery/handler.getGalleryPage",
      memorySize: 128,
      events: [
        {
          http: {
            path: "/gallery",
            method: "get",
            authorizer: "jwtauth",
            cors: true,
          },
        },
      ],
    },
  },
};
