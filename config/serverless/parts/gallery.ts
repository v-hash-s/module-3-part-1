import { AWSPartitial } from "../types";

export const galleryConfig: AWSPartitial = {
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
    // loginGetResponse: {
    //   handler: "api/gallery/login/handler.loginGetRequestHandler",
    //   memorySize: 128,
    //   events: [
    //     {
    //       http: {
    //         path: "/",
    //         method: "get",
    //         cors: true,
    //       },
    //     },
    //   ],
    // },

    jwtauth: {
      handler: "api/auth/handler.authenticationJWT",
      memorySize: 128,
    },

    getGallery: {
      handler: "api/gallery/handler.getGallery",
      memorySize: 128,
      events: [
        {
          http: {
            path: "/gallery",
            method: "get",
            // authorizer: "authenticationJWT",
            cors: true,
          },
        },
      ],
    },

    // upload: {
    //   handler: "api/gallery/upload/handler.upload",
    //   memorySize: 128,
    //   events: [
    //     {
    //       http: {
    //         path: "/upload",
    //         method: "post",
    //       },
    //     },
    //   ],
    // },
  },
};
