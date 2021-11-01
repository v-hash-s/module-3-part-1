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

/***/ "./api/gallery/gallery/gallery.manager.ts":
/*!************************************************!*\
  !*** ./api/gallery/gallery/gallery.manager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GalleryManager = void 0;\nconst gallery_service_1 = __webpack_require__(/*! ./gallery.service */ \"./api/gallery/gallery/gallery.service.ts\");\nconst image_model_1 = __webpack_require__(/*! @models/MongoDB/image.model */ \"./models/MongoDB/image.model.ts\");\nconst environment_1 = __webpack_require__(/*! @helper/environment */ \"./helper/environment.ts\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\nclass GalleryManager {\n    constructor() {\n        this.service = new gallery_service_1.GalleryService();\n        // this.limit = queryParameters.limit\n    }\n    async sendUsersImage(queryParameters, email) {\n        let filter;\n        if (queryParameters.filter == null) {\n            filter = false;\n            const galleryResponse = await this.service.sendGalleryObject(queryParameters);\n            return this.returnGalleryResponse(galleryResponse);\n        }\n        else {\n            logger_1.log(\"EMAIL: \", email);\n            const objects = await image_model_1.default.find({ owner: await email }, { path: 1, _id: 0 }).exec();\n            logger_1.log(objects);\n            const images = objects.map((img) => {\n                return img.path;\n            });\n            logger_1.log(images);\n            const galleryResponse = {\n                objects: images,\n            };\n            logger_1.log(galleryResponse);\n            return this.returnGalleryResponse(galleryResponse);\n        }\n    }\n    async getEmailFromToken(token) {\n        const email = jwt.verify(token, environment_1.getEnv(\"TOKEN_KEY\"));\n        // @ts-ignore\n        return email.email;\n    }\n    async returnGalleryResponse(galleryResponse) {\n        if (galleryResponse) {\n            return {\n                statusCode: 200,\n                content: galleryResponse,\n            };\n        }\n        else {\n            return {\n                statusCode: 404,\n                content: { errorMessage: \"Images not found\" },\n            };\n        }\n    }\n}\nexports.GalleryManager = GalleryManager;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/gallery/gallery.manager.ts?");

/***/ }),

/***/ "./api/gallery/gallery/gallery.service.ts":
/*!************************************************!*\
  !*** ./api/gallery/gallery/gallery.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GalleryService = void 0;\nconst image_model_1 = __webpack_require__(/*! @models/MongoDB/image.model */ \"./models/MongoDB/image.model.ts\");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\nclass GalleryService {\n    async sendGalleryObject(queryParameters) {\n        console.log(\"QUERY: \", queryParameters);\n        const galleryResponse = {\n            objects: await this.getPhotosArray(queryParameters.page, queryParameters.limit),\n            total: await this.getPagesNumber(queryParameters),\n        };\n        logger_1.log(\"GALLERY Response: \", galleryResponse);\n        return galleryResponse;\n    }\n    async getPagesNumber(queryParameters) {\n        let limit = Number(queryParameters.limit);\n        // if (limit == null) {\n        //   limit = 10;\n        // }\n        const counts = await image_model_1.default.count();\n        const finalResult = Math.ceil(counts / limit);\n        return finalResult;\n    }\n    async getTotal(queryParameters) {\n        const total = await this.getPagesNumber(queryParameters);\n        return total;\n    }\n    async getPhotosArray(pageNumber, limit) {\n        logger_1.log(\"Page num: \", pageNumber);\n        logger_1.log(\"limit: \", limit);\n        const arr = await this.getValue();\n        const photos = [];\n        limit = Number(limit);\n        pageNumber = Number(pageNumber);\n        for (let i = (pageNumber - 1) * limit; i < limit + (pageNumber - 1) * limit && i < arr.length; i++) {\n            photos.push(arr[i].path);\n            logger_1.log(arr[i] + \" : \" + i);\n        }\n        return photos;\n    }\n    async getValue() {\n        const arr = await image_model_1.default.find({}, { path: 1, _id: 0 }).exec();\n        return arr;\n    }\n}\nexports.GalleryService = GalleryService;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/gallery/gallery.service.ts?");

/***/ }),

/***/ "./api/gallery/gallery/handler.ts":
/*!****************************************!*\
  !*** ./api/gallery/gallery/handler.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getGalleryPage = void 0;\nconst gallery_manager_1 = __webpack_require__(/*! ./gallery.manager */ \"./api/gallery/gallery/gallery.manager.ts\");\nconst response_1 = __webpack_require__(/*! @helper/http-api/response */ \"./helper/http-api/response.ts\");\nconst error_handler_1 = __webpack_require__(/*! @helper/http-api/error-handler */ \"./helper/http-api/error-handler.ts\");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\nconst db_connection_1 = __webpack_require__(/*! @services/db_connection */ \"./services/db_connection.ts\");\nconst getGalleryPage = async (event) => {\n    try {\n        await db_connection_1.connectDB;\n        const queryParameters = event.queryStringParameters;\n        const token = event.multiValueHeaders.Authorization.toString().replace(\"Bearer \", \"\");\n        logger_1.log(token);\n        const manager = new gallery_manager_1.GalleryManager();\n        const email = await manager.getEmailFromToken(token);\n        const result = await manager.sendUsersImage(queryParameters, email);\n        logger_1.log(result);\n        return response_1.createResponse(result.statusCode, result.content);\n    }\n    catch (err) {\n        return error_handler_1.errorHandler(err);\n    }\n};\nexports.getGalleryPage = getGalleryPage;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/gallery/handler.ts?");

/***/ }),

/***/ "./errors/http/http-bad-gateway-error.ts":
/*!***********************************************!*\
  !*** ./errors/http/http-bad-gateway-error.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpBadGatewayError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpBadGatewayError extends http_error_1.HttpError {\n    constructor(message = 'Bad Gateway', details) {\n        super(502, 'Bad Gateway', message, details);\n    }\n}\nexports.HttpBadGatewayError = HttpBadGatewayError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-bad-gateway-error.ts?");

/***/ }),

/***/ "./errors/http/http-bad-request-error.ts":
/*!***********************************************!*\
  !*** ./errors/http/http-bad-request-error.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpBadRequestError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpBadRequestError extends http_error_1.HttpError {\n    constructor(message = 'Bad Request', details) {\n        super(400, 'Bad request', message, details);\n    }\n}\nexports.HttpBadRequestError = HttpBadRequestError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-bad-request-error.ts?");

/***/ }),

/***/ "./errors/http/http-conflict-error.ts":
/*!********************************************!*\
  !*** ./errors/http/http-conflict-error.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpConflictError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpConflictError extends http_error_1.HttpError {\n    constructor(message = 'Conflict', details) {\n        super(409, 'Conflict', message, details);\n    }\n}\nexports.HttpConflictError = HttpConflictError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-conflict-error.ts?");

/***/ }),

/***/ "./errors/http/http-error.ts":
/*!***********************************!*\
  !*** ./errors/http/http-error.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpError = void 0;\nclass HttpError extends Error {\n    constructor(statusCode, name, message, details) {\n        super(message);\n        this.statusCode = statusCode;\n        this.name = name;\n        this.details = details;\n    }\n}\nexports.HttpError = HttpError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-error.ts?");

/***/ }),

/***/ "./errors/http/http-forbidden-error.ts":
/*!*********************************************!*\
  !*** ./errors/http/http-forbidden-error.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpForbiddenError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpForbiddenError extends http_error_1.HttpError {\n    constructor(message = 'Forbidden', details) {\n        super(403, 'Forbidden', message, details);\n    }\n}\nexports.HttpForbiddenError = HttpForbiddenError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-forbidden-error.ts?");

/***/ }),

/***/ "./errors/http/http-gateway-timeout-error.ts":
/*!***************************************************!*\
  !*** ./errors/http/http-gateway-timeout-error.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpGatewayTimeoutError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpGatewayTimeoutError extends http_error_1.HttpError {\n    constructor(message = 'Gateway Timeout', details) {\n        super(504, 'Gateway Timeout', message, details);\n    }\n}\nexports.HttpGatewayTimeoutError = HttpGatewayTimeoutError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-gateway-timeout-error.ts?");

/***/ }),

/***/ "./errors/http/http-internal-server-error.ts":
/*!***************************************************!*\
  !*** ./errors/http/http-internal-server-error.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpInternalServerError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpInternalServerError extends http_error_1.HttpError {\n    constructor(message = 'Internal Server Error', details) {\n        super(500, 'Internal Server Error', message, details);\n    }\n}\nexports.HttpInternalServerError = HttpInternalServerError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-internal-server-error.ts?");

/***/ }),

/***/ "./errors/http/http-not-found-error.ts":
/*!*********************************************!*\
  !*** ./errors/http/http-not-found-error.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpNotFoundError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpNotFoundError extends http_error_1.HttpError {\n    constructor(message = 'Not Found', details) {\n        super(404, 'Not Found', message, details);\n    }\n}\nexports.HttpNotFoundError = HttpNotFoundError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-not-found-error.ts?");

/***/ }),

/***/ "./errors/http/http-service-unavailable-error.ts":
/*!*******************************************************!*\
  !*** ./errors/http/http-service-unavailable-error.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpServiceUnavailableError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpServiceUnavailableError extends http_error_1.HttpError {\n    constructor(message = 'Service Unavailable', details) {\n        super(503, 'Service Unavailable', message, details);\n    }\n}\nexports.HttpServiceUnavailableError = HttpServiceUnavailableError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-service-unavailable-error.ts?");

/***/ }),

/***/ "./errors/http/http-too-many-requests-error.ts":
/*!*****************************************************!*\
  !*** ./errors/http/http-too-many-requests-error.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpTooManyRequestsError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpTooManyRequestsError extends http_error_1.HttpError {\n    constructor(message = 'Too Many Requests', details) {\n        super(429, 'Too Many Requests', message, details);\n    }\n}\nexports.HttpTooManyRequestsError = HttpTooManyRequestsError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-too-many-requests-error.ts?");

/***/ }),

/***/ "./errors/http/http-unauthorized-error.ts":
/*!************************************************!*\
  !*** ./errors/http/http-unauthorized-error.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpUnauthorizedError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpUnauthorizedError extends http_error_1.HttpError {\n    constructor(message = 'Unauthorized', details) {\n        super(401, 'Unauthorized', message, details);\n    }\n}\nexports.HttpUnauthorizedError = HttpUnauthorizedError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-unauthorized-error.ts?");

/***/ }),

/***/ "./errors/http/http-unprocessable-entity-error.ts":
/*!********************************************************!*\
  !*** ./errors/http/http-unprocessable-entity-error.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpUnprocessableEntityError = void 0;\nconst http_error_1 = __webpack_require__(/*! ./http-error */ \"./errors/http/http-error.ts\");\nclass HttpUnprocessableEntityError extends http_error_1.HttpError {\n    constructor(message = 'Unprocessable Entity', details) {\n        super(422, 'Unprocessable Entity', message, details);\n    }\n}\nexports.HttpUnprocessableEntityError = HttpUnprocessableEntityError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/http-unprocessable-entity-error.ts?");

/***/ }),

/***/ "./errors/http/index.ts":
/*!******************************!*\
  !*** ./errors/http/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HttpUnprocessableEntityError = exports.HttpUnauthorizedError = exports.HttpTooManyRequestsError = exports.HttpServiceUnavailableError = exports.HttpNotFoundError = exports.HttpInternalServerError = exports.HttpGatewayTimeoutError = exports.HttpForbiddenError = exports.HttpConflictError = exports.HttpBadRequestError = exports.HttpBadGatewayError = void 0;\nvar http_bad_gateway_error_1 = __webpack_require__(/*! ./http-bad-gateway-error */ \"./errors/http/http-bad-gateway-error.ts\");\nObject.defineProperty(exports, \"HttpBadGatewayError\", ({ enumerable: true, get: function () { return http_bad_gateway_error_1.HttpBadGatewayError; } }));\nvar http_bad_request_error_1 = __webpack_require__(/*! ./http-bad-request-error */ \"./errors/http/http-bad-request-error.ts\");\nObject.defineProperty(exports, \"HttpBadRequestError\", ({ enumerable: true, get: function () { return http_bad_request_error_1.HttpBadRequestError; } }));\nvar http_conflict_error_1 = __webpack_require__(/*! ./http-conflict-error */ \"./errors/http/http-conflict-error.ts\");\nObject.defineProperty(exports, \"HttpConflictError\", ({ enumerable: true, get: function () { return http_conflict_error_1.HttpConflictError; } }));\nvar http_forbidden_error_1 = __webpack_require__(/*! ./http-forbidden-error */ \"./errors/http/http-forbidden-error.ts\");\nObject.defineProperty(exports, \"HttpForbiddenError\", ({ enumerable: true, get: function () { return http_forbidden_error_1.HttpForbiddenError; } }));\nvar http_gateway_timeout_error_1 = __webpack_require__(/*! ./http-gateway-timeout-error */ \"./errors/http/http-gateway-timeout-error.ts\");\nObject.defineProperty(exports, \"HttpGatewayTimeoutError\", ({ enumerable: true, get: function () { return http_gateway_timeout_error_1.HttpGatewayTimeoutError; } }));\nvar http_internal_server_error_1 = __webpack_require__(/*! ./http-internal-server-error */ \"./errors/http/http-internal-server-error.ts\");\nObject.defineProperty(exports, \"HttpInternalServerError\", ({ enumerable: true, get: function () { return http_internal_server_error_1.HttpInternalServerError; } }));\nvar http_not_found_error_1 = __webpack_require__(/*! ./http-not-found-error */ \"./errors/http/http-not-found-error.ts\");\nObject.defineProperty(exports, \"HttpNotFoundError\", ({ enumerable: true, get: function () { return http_not_found_error_1.HttpNotFoundError; } }));\nvar http_service_unavailable_error_1 = __webpack_require__(/*! ./http-service-unavailable-error */ \"./errors/http/http-service-unavailable-error.ts\");\nObject.defineProperty(exports, \"HttpServiceUnavailableError\", ({ enumerable: true, get: function () { return http_service_unavailable_error_1.HttpServiceUnavailableError; } }));\nvar http_too_many_requests_error_1 = __webpack_require__(/*! ./http-too-many-requests-error */ \"./errors/http/http-too-many-requests-error.ts\");\nObject.defineProperty(exports, \"HttpTooManyRequestsError\", ({ enumerable: true, get: function () { return http_too_many_requests_error_1.HttpTooManyRequestsError; } }));\nvar http_unauthorized_error_1 = __webpack_require__(/*! ./http-unauthorized-error */ \"./errors/http/http-unauthorized-error.ts\");\nObject.defineProperty(exports, \"HttpUnauthorizedError\", ({ enumerable: true, get: function () { return http_unauthorized_error_1.HttpUnauthorizedError; } }));\nvar http_unprocessable_entity_error_1 = __webpack_require__(/*! ./http-unprocessable-entity-error */ \"./errors/http/http-unprocessable-entity-error.ts\");\nObject.defineProperty(exports, \"HttpUnprocessableEntityError\", ({ enumerable: true, get: function () { return http_unprocessable_entity_error_1.HttpUnprocessableEntityError; } }));\n/**\n * Example of usage:\n * if (!mediaInfoUrl.url)\n      throw new HttpBadRequestError(\"The param 'url' is required.\");\n * */\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/http/index.ts?");

/***/ }),

/***/ "./errors/runtime/index.ts":
/*!*********************************!*\
  !*** ./errors/runtime/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.InputValidationError = void 0;\nvar input_validation_error_1 = __webpack_require__(/*! ./input-validation-error */ \"./errors/runtime/input-validation-error.ts\");\nObject.defineProperty(exports, \"InputValidationError\", ({ enumerable: true, get: function () { return input_validation_error_1.InputValidationError; } }));\n/**\n * Example of usage:\n * if (!mediaInfoUrl.url)\n *    throw new InputValidationError(\"The param 'url' is required.\");\n * */\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/runtime/index.ts?");

/***/ }),

/***/ "./errors/runtime/input-validation-error.ts":
/*!**************************************************!*\
  !*** ./errors/runtime/input-validation-error.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.InputValidationError = void 0;\nconst runtime_error_1 = __webpack_require__(/*! ./runtime-error */ \"./errors/runtime/runtime-error.ts\");\nclass InputValidationError extends runtime_error_1.RuntimeError {\n}\nexports.InputValidationError = InputValidationError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/runtime/input-validation-error.ts?");

/***/ }),

/***/ "./errors/runtime/runtime-error.ts":
/*!*****************************************!*\
  !*** ./errors/runtime/runtime-error.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RuntimeError = void 0;\nclass RuntimeError extends Error {\n    constructor(message, details) {\n        super(message);\n        this.details = details;\n        this.name = this.constructor.name;\n    }\n}\nexports.RuntimeError = RuntimeError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/runtime/runtime-error.ts?");

/***/ }),

/***/ "./errors/util.ts":
/*!************************!*\
  !*** ./errors/util.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.convertToHttpError = void 0;\nconst http_1 = __webpack_require__(/*! @errors/http */ \"./errors/http/index.ts\");\nconst http_error_1 = __webpack_require__(/*! @errors/http/http-error */ \"./errors/http/http-error.ts\");\nconst runtime_1 = __webpack_require__(/*! @errors/runtime */ \"./errors/runtime/index.ts\");\nconst runtime_error_1 = __webpack_require__(/*! @errors/runtime/runtime-error */ \"./errors/runtime/runtime-error.ts\");\nconst format_axios_error_1 = __webpack_require__(/*! @redtea/format-axios-error */ \"@redtea/format-axios-error\");\n/**\n * Convert input error to corresponding instance of HttpError\n *\n * @param {Error | AxiosError | RuntimeError} error Input error\n * @returns {HttpError}\n */\nfunction convertToHttpError(error) {\n    var _a, _b;\n    const axiosError = error.isAxiosError && format_axios_error_1.format(error);\n    if (error instanceof runtime_1.InputValidationError) {\n        return new http_1.HttpBadRequestError(error.message, { text: 'Instance InputValidationError' });\n    }\n    if (error instanceof runtime_error_1.RuntimeError) {\n        return new http_1.HttpInternalServerError(error.message, { text: 'Instance RuntimeError' });\n    }\n    if (axiosError) {\n        return new http_error_1.HttpError((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status, ((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.statusText) || 'Internal Server Error', axiosError.message);\n    }\n    return new http_1.HttpInternalServerError(error.message, { text: 'Unknown error' });\n}\nexports.convertToHttpError = convertToHttpError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/util.ts?");

/***/ }),

/***/ "./helper/base-error-handler.ts":
/*!**************************************!*\
  !*** ./helper/base-error-handler.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.baseErrorHandler = void 0;\nconst http_error_1 = __webpack_require__(/*! @errors/http/http-error */ \"./errors/http/http-error.ts\");\nconst util_1 = __webpack_require__(/*! @errors/util */ \"./errors/util.ts\");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\n/**\n * Base error handler. Convert any error to an HttpError.\n *\n * @param {Error | HttpError | AxiosError | RuntimeError} caughtError\n * @returns {HttpError}\n */\nfunction baseErrorHandler(caughtError) {\n    logger_1.log('caught error ', caughtError);\n    if (!(caughtError instanceof http_error_1.HttpError)) {\n        /**\n         * It means that error was unexpected and can have unpredictable structure\n         * For example, Axios errors have different structure\n         * Also, we can send all unexpected errors to Sentry here\n         */\n        logger_1.log('This error was not generated by us. We should extract the statusCode, name and message here');\n        return util_1.convertToHttpError(caughtError);\n    }\n    return caughtError;\n}\nexports.baseErrorHandler = baseErrorHandler;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/base-error-handler.ts?");

/***/ }),

/***/ "./helper/environment.ts":
/*!*******************************!*\
  !*** ./helper/environment.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getEnv = exports.isStage = exports.getStage = void 0;\nconst runtime_error_1 = __webpack_require__(/*! @errors/runtime/runtime-error */ \"./errors/runtime/runtime-error.ts\");\n/**\n * Extract substitutable envs, because we use webpack-dotenv plugin\n * which have these limitations https://github.com/mrsteele/dotenv-webpack#limitations\n */\nconst envs = {\n    STAGE: process.env.STAGE,\n    REGION: process.env.REGION,\n    PROFILE: process.env.PROFILE,\n    CLIENT: process.env.CLIENT,\n    IS_OFFLINE: process.env.IS_OFFLINE,\n    OFFLINE_API_BASE_URL: process.env.OFFLINE_API_BASE_URL,\n    CI: process.env.CI,\n    HIDE_LOGS: process.env.HIDE_LOGS,\n    USERS_TABLE_NAME: process.env.USERS_TABLE_NAME,\n    JOBS_TABLE_NAME: process.env.JOBS_TABLE_NAME,\n};\nfunction getStage() {\n    return getEnv('STAGE');\n}\nexports.getStage = getStage;\nfunction isStage(stage) {\n    return getStage() === stage;\n}\nexports.isStage = isStage;\nfunction getEnv(name, required = true) {\n    const v = envs[name] || process.env[name];\n    if (required && !v) {\n        throw new runtime_error_1.RuntimeError(`Missing environment variable ${name}`);\n    }\n    return v;\n}\nexports.getEnv = getEnv;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/environment.ts?");

/***/ }),

/***/ "./helper/http-api/error-handler.ts":
/*!******************************************!*\
  !*** ./helper/http-api/error-handler.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorHandler = void 0;\nconst base_error_handler_1 = __webpack_require__(/*! ../base-error-handler */ \"./helper/base-error-handler.ts\");\nconst response_1 = __webpack_require__(/*! ./response */ \"./helper/http-api/response.ts\");\n/**\n * HTTP API error handler\n *\n * @param {Error | HttpError | AxiosError | RuntimeError} caughtError\n * @param {Response} httpApiResponse\n * @returns {APIGatewayProxyResult}\n */\nfunction errorHandler(caughtError, httpApiResponse = response_1.defaultResponse) {\n    const httpError = base_error_handler_1.baseErrorHandler(caughtError);\n    return httpApiResponse.error(httpError.statusCode, httpError.message, httpError.details);\n}\nexports.errorHandler = errorHandler;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/http-api/error-handler.ts?");

/***/ }),

/***/ "./helper/http-api/response.ts":
/*!*************************************!*\
  !*** ./helper/http-api/response.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorResponse = exports.createResponse = exports.defaultResponse = exports.Response = void 0;\nconst defaultHeaders = {\n    'Access-Control-Allow-Origin': '*',\n    'Access-Control-Allow-Credentials': false,\n    'Content-Type': 'application/json',\n};\n/**\n * HTTP API response factory\n */\nclass Response {\n    /**\n     * Constructor\n     *\n     * @param headers Default headers. Provide null to disable default headers.\n     */\n    constructor(headers = defaultHeaders) {\n        this.setHeaders(headers);\n    }\n    /**\n     * Set default headers for response\n     *\n     * @param {Headers | null} headers Default headers. Provide null to disable default headers.\n     */\n    setHeaders(headers) {\n        this.headers = headers === null ? undefined : headers;\n    }\n    /**\n     * Create HTTP API response\n     *\n     * @param {number} httpStatus HTTP status\n     * @param body Response body\n     * @param {Headers} headers Custom headers\n     * @returns {APIGatewayProxyResult}\n     */\n    create(httpStatus, body, headers) {\n        return {\n            statusCode: httpStatus,\n            headers: Object.assign(Object.assign({}, this.headers), headers),\n            body: body !== undefined ? JSON.stringify(body) : '',\n        };\n    }\n    /**\n     * Create HTTP API error response\n     *\n     * @param {number} httpStatus HTTP status\n     * @param {string} message Error message\n     * @param {Record<string, any>} details Error details\n     * @param {Headers} headers Custom headers\n     * @returns {APIGatewayProxyResult}\n     */\n    error(httpStatus, message, details, headers) {\n        const body = {\n            status: httpStatus,\n            message,\n            details,\n        };\n        return this.create(httpStatus, body, headers);\n    }\n}\nexports.Response = Response;\n/**\n * Default HTTP API response factory instance.\n *\n * Set custom default headers:\n * ```\n * defaultResponse.setHeaders({...headers})\n * ```\n * @type {Response}\n */\nexports.defaultResponse = new Response();\n/**\n * Create HTTP API response. The same as defaultResponse.create.\n *\n * @param {number} httpStatus HTTP status\n * @param body Response body\n * @param {Headers} headers Custom headers\n * @returns {APIGatewayProxyResult}\n */\nfunction createResponse(httpStatus, body, headers) {\n    return exports.defaultResponse.create(httpStatus, body, headers);\n}\nexports.createResponse = createResponse;\n/**\n * Create HTTP API error response. The same as defaultResponse.error.\n *\n * @param {number} httpStatus HTTP status\n * @param {string} message Error message\n * @param {Record<string, any>} details Error details\n * @param {Headers} headers Custom headers\n * @returns {APIGatewayProxyResult}\n */\nfunction errorResponse(httpStatus, message, details, headers) {\n    return exports.defaultResponse.error(httpStatus, message, details, headers);\n}\nexports.errorResponse = errorResponse;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/http-api/response.ts?");

/***/ }),

/***/ "./helper/logger.ts":
/*!**************************!*\
  !*** ./helper/logger.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.log = void 0;\nconst environment_1 = __webpack_require__(/*! @helper/environment */ \"./helper/environment.ts\");\nconst format_axios_error_1 = __webpack_require__(/*! @redtea/format-axios-error */ \"@redtea/format-axios-error\");\nfunction log(...args) {\n    /**\n     * Don't show the logs in CI for faster testing\n     * Sometimes we turn off the logs in production environment for better performance\n     */\n    if (environment_1.getEnv('CI', false) === 'true' || environment_1.getEnv('HIDE_LOGS', false) === 'true') {\n        return;\n    }\n    if (environment_1.getEnv('IS_OFFLINE', false) === 'true') {\n        args.forEach((i) => console.dir(i));\n    }\n    else {\n        console.log(...args.map((arg) => {\n            /**\n             * Axios error has complicated structure that doesn't allow debugging it easily\n             */\n            if (arg.isAxiosError) {\n                return JSON.stringify(format_axios_error_1.format(arg));\n            }\n            return JSON.stringify(arg);\n        }));\n    }\n}\nexports.log = log;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/logger.ts?");

/***/ }),

/***/ "./models/MongoDB/image.model.ts":
/*!***************************************!*\
  !*** ./models/MongoDB/image.model.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Schema = mongoose.Schema;\nconst imageSchema = new Schema({\n    path: String,\n    metadata: Object,\n    owner: String,\n});\nconst ImageModel = mongoose.model(\"images\", imageSchema);\nexports.default = ImageModel;\n\n\n//# sourceURL=webpack://template-aws-sls/./models/MongoDB/image.model.ts?");

/***/ }),

/***/ "./services/db_connection.ts":
/*!***********************************!*\
  !*** ./services/db_connection.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.connectDB = void 0;\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst environment_1 = __webpack_require__(/*! ../helper/environment */ \"./helper/environment.ts\");\nmongoose.connect(environment_1.getEnv(\"MONGODB_URI\"));\nexports.connectDB = new Promise((res, rej) => {\n    mongoose.connection.on(\"error\", (error) => {\n        logger_1.log(error);\n        rej(error);\n    });\n    mongoose.connection.on(\"open\", () => {\n        logger_1.log(\"DB connection established\");\n    });\n    res(mongoose.connection);\n});\n\n\n//# sourceURL=webpack://template-aws-sls/./services/db_connection.ts?");

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

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./api/gallery/gallery/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;