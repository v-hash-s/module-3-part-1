/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./api/auth/handler.ts":
/*!*****************************!*\
  !*** ./api/auth/handler.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.generatePolicy = exports.authenticationJWT = void 0;\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n// import UsersModel from \"@models/MongoDB/user.model\";\n// import { Response } from \"@helper/http-api/response\";\nconst environment_1 = __webpack_require__(/*! @helper/environment */ \"./helper/environment.ts\");\n// const UNAUTHORIZED = new Error(\"Unauthorized\");\nconst authenticationJWT = async (event) => {\n    logger_1.log(event);\n    const token = event.authorizationToken.split(\" \")[1];\n    try {\n        let user = jwt.verify(token, environment_1.getEnv(\"TOKEN_KEY\"));\n        return generatePolicy(\"user\", \"Allow\", \"*\", {\n            //@ts-ignore\n            user: event.email,\n            body: event.body,\n        });\n    }\n    catch (err) {\n        return generatePolicy(\"user\", \"Deny\", \"*\", {});\n    }\n};\nexports.authenticationJWT = authenticationJWT;\nfunction generatePolicy(principalId, effect, resource, context) {\n    const authResponse = {\n        principalId,\n        policyDocument: {\n            Version: \"2012-10-17\",\n            Statement: [\n                {\n                    Action: \"execute-api:Invoke\",\n                    Effect: effect,\n                    Resource: resource,\n                },\n            ],\n        },\n        context,\n    };\n    return authResponse;\n}\nexports.generatePolicy = generatePolicy;\n// // Remove example\n// import { log } from '@helper/logger';\n// import {\n//   APIGatewayAuthorizerSimpleResult,\n//   APIGatewayRequestAuthorizerHttpApiPayloadV2Event,\n// } from '@interfaces/api-gateway-authorizer';\n// import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerWithContextHandler } from 'aws-lambda';\n// import { Handler } from 'aws-lambda/handler';\n// const UNAUTHORIZED = new Error('Unauthorized');\n// // Authorizer with simple response\n// // See: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html#http-api-lambda-authorizer.v2\n// export const httpApiSimple: Handler<\n//   APIGatewayRequestAuthorizerHttpApiPayloadV2Event,\n//   APIGatewayAuthorizerSimpleResult\n// > = async (event) => {\n//   log(event);\n//   const token = event.identitySource?.[0];\n//   if (token === 'error') {\n//     throw new Error('Internal server error');\n//   }\n//   if (token !== 'token') {\n//     return {\n//       isAuthorized: false,\n//     };\n//   }\n//   return {\n//     isAuthorized: true,\n//     context: {\n//       var1: 'v1',\n//     },\n//   };\n// };\n// // Authorizer with policy response (compatible with REST API)\n// // See: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html#http-api-lambda-authorizer.v2\n// export const httpApiPolicy: APIGatewayTokenAuthorizerWithContextHandler<Record<string, any>> = async (event) => {\n//   log(event);\n//   if (event.authorizationToken === 'error') {\n//     throw new Error('Internal server error');\n//   }\n//   if (event.authorizationToken !== 'token') {\n//     throw UNAUTHORIZED;\n//   }\n//   return generatePolicy('user', 'Allow', '*', {});\n// };\n// // REST API authorizer\n// // See: https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html\n// export const restApi: APIGatewayTokenAuthorizerWithContextHandler<Record<string, any>> = async (event) => {\n//   log(event);\n//   if (event.authorizationToken === 'error') {\n//     throw new Error('Internal server error');\n//   }\n//   if (event.authorizationToken !== 'token') {\n//     throw UNAUTHORIZED;\n//   }\n//   return generatePolicy('user', 'Allow', '*', {});\n// };\n// export function generatePolicy<C extends APIGatewayAuthorizerResult['context']>(\n//   principalId: string,\n//   effect: 'Allow' | 'Deny',\n//   resource: string,\n//   context: C\n// ): APIGatewayAuthorizerResult & { context: C } {\n//   const authResponse: APIGatewayAuthorizerResult & { context: C } = {\n//     principalId,\n//     policyDocument: {\n//       Version: '2012-10-17',\n//       Statement: [\n//         {\n//           Action: 'execute-api:Invoke',\n//           Effect: effect,\n//           Resource: resource,\n//         },\n//       ],\n//     },\n//     context,\n//   };\n//   return authResponse;\n// }\n\n\n//# sourceURL=webpack://template-aws-sls/./api/auth/handler.ts?");

/***/ }),

/***/ "./errors/runtime/runtime-error.ts":
/*!*****************************************!*\
  !*** ./errors/runtime/runtime-error.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RuntimeError = void 0;\nclass RuntimeError extends Error {\n    constructor(message, details) {\n        super(message);\n        this.details = details;\n        this.name = this.constructor.name;\n    }\n}\nexports.RuntimeError = RuntimeError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/runtime/runtime-error.ts?");

/***/ }),

/***/ "./helper/environment.ts":
/*!*******************************!*\
  !*** ./helper/environment.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getEnv = exports.isStage = exports.getStage = void 0;\nconst runtime_error_1 = __webpack_require__(/*! @errors/runtime/runtime-error */ \"./errors/runtime/runtime-error.ts\");\n/**\n * Extract substitutable envs, because we use webpack-dotenv plugin\n * which have these limitations https://github.com/mrsteele/dotenv-webpack#limitations\n */\nconst envs = {\n    STAGE: process.env.STAGE,\n    REGION: process.env.REGION,\n    PROFILE: process.env.PROFILE,\n    CLIENT: process.env.CLIENT,\n    IS_OFFLINE: process.env.IS_OFFLINE,\n    OFFLINE_API_BASE_URL: process.env.OFFLINE_API_BASE_URL,\n    CI: process.env.CI,\n    HIDE_LOGS: process.env.HIDE_LOGS,\n    USERS_TABLE_NAME: process.env.USERS_TABLE_NAME,\n    JOBS_TABLE_NAME: process.env.JOBS_TABLE_NAME,\n};\nfunction getStage() {\n    return getEnv('STAGE');\n}\nexports.getStage = getStage;\nfunction isStage(stage) {\n    return getStage() === stage;\n}\nexports.isStage = isStage;\nfunction getEnv(name, required = true) {\n    const v = envs[name] || process.env[name];\n    if (required && !v) {\n        throw new runtime_error_1.RuntimeError(`Missing environment variable ${name}`);\n    }\n    return v;\n}\nexports.getEnv = getEnv;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/environment.ts?");

/***/ }),

/***/ "./helper/logger.ts":
/*!**************************!*\
  !*** ./helper/logger.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.log = void 0;\nconst environment_1 = __webpack_require__(/*! @helper/environment */ \"./helper/environment.ts\");\nconst format_axios_error_1 = __webpack_require__(/*! @redtea/format-axios-error */ \"@redtea/format-axios-error\");\nfunction log(...args) {\n    /**\n     * Don't show the logs in CI for faster testing\n     * Sometimes we turn off the logs in production environment for better performance\n     */\n    if (environment_1.getEnv('CI', false) === 'true' || environment_1.getEnv('HIDE_LOGS', false) === 'true') {\n        return;\n    }\n    if (environment_1.getEnv('IS_OFFLINE', false) === 'true') {\n        args.forEach((i) => console.dir(i));\n    }\n    else {\n        console.log(...args.map((arg) => {\n            /**\n             * Axios error has complicated structure that doesn't allow debugging it easily\n             */\n            if (arg.isAxiosError) {\n                return JSON.stringify(format_axios_error_1.format(arg));\n            }\n            return JSON.stringify(arg);\n        }));\n    }\n}\nexports.log = log;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/logger.ts?");

/***/ }),

/***/ "./source-map-install.js":
/*!*******************************!*\
  !*** ./source-map-install.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! source-map-support */ \"source-map-support\").install();\n\n\n//# sourceURL=webpack://template-aws-sls/./source-map-install.js?");

/***/ }),

/***/ "@redtea/format-axios-error":
/*!*********************************************!*\
  !*** external "@redtea/format-axios-error" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@redtea/format-axios-error");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("source-map-support");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./source-map-install.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./api/auth/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;