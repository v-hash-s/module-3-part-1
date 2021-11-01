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

/***/ "./api/gallery/upload/handler.ts":
/*!***************************************!*\
  !*** ./api/gallery/upload/handler.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.uploadImage = void 0;\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\nconst multipartParser = __webpack_require__(/*! lambda-multipart-parser */ \"lambda-multipart-parser\");\nconst upload_service_1 = __webpack_require__(/*! ./upload.service */ \"./api/gallery/upload/upload.service.ts\");\nconst upload_manager_1 = __webpack_require__(/*! ./upload.manager */ \"./api/gallery/upload/upload.manager.ts\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst response_1 = __webpack_require__(/*! @helper/http-api/response */ \"./helper/http-api/response.ts\");\nconst uploadImage = async (event) => {\n    const payload = await multipartParser.parse(event);\n    //   log(payload);\n    const content = payload.files[0].content;\n    const filename = payload.files[0].filename;\n    logger_1.log(content);\n    //   log(event);\n    const pathToImages = path.resolve(path.join(__dirname, \"../../../../../images\"));\n    const manager = new upload_manager_1.UploadManager();\n    const service = new upload_service_1.UploadService();\n    if (await manager.isExist(filename)) {\n        const response = {\n            statusCode: 309,\n            content: \"Image already exists\",\n        };\n        return response_1.createResponse(response.statusCode, response.content);\n    }\n    await service.saveImageLocally(filename, content);\n    const stats = await manager.getMetadata(path.join(pathToImages, filename));\n    logger_1.log(stats);\n    const token = await event.multiValueHeaders.Authorization.toString().replace(\"Bearer \", \"\");\n    const email = await manager.getEmailFromToken(token);\n    logger_1.log(\"STATS: \", stats);\n    logger_1.log(\"EMAIL: \", email);\n    await service.saveImageInDB(filename, stats, email);\n    const result = await manager.returnResponse(manager.isExist(filename));\n    return response_1.createResponse(result.statusCode, result.content);\n};\nexports.uploadImage = uploadImage;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/upload/handler.ts?");

/***/ }),

/***/ "./api/gallery/upload/upload.manager.ts":
/*!**********************************************!*\
  !*** ./api/gallery/upload/upload.manager.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UploadManager = void 0;\nconst upload_service_1 = __webpack_require__(/*! ./upload.service */ \"./api/gallery/upload/upload.service.ts\");\nconst db_connection_1 = __webpack_require__(/*! @services/db_connection */ \"./services/db_connection.ts\");\nconst image_model_1 = __webpack_require__(/*! @models/MongoDB/image.model */ \"./models/MongoDB/image.model.ts\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst environment_1 = __webpack_require__(/*! @helper/environment */ \"./helper/environment.ts\");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ \"./helper/logger.ts\");\nconst util = __webpack_require__(/*! util */ \"util\");\nconst stat = util.promisify(fs.stat);\nclass UploadManager {\n    constructor() {\n        this.service = new upload_service_1.UploadService();\n    }\n    async isExist(image) {\n        await db_connection_1.connectDB;\n        const exist = await image_model_1.default.findOne({ path: image }, { path: 1 }).then(function (data) {\n            if (data) {\n                return true;\n            }\n            else {\n                return false;\n            }\n        });\n        return exist;\n    }\n    async getMetadata(image) {\n        logger_1.log(image);\n        const stats = await stat(image);\n        logger_1.log(stats);\n        return stats;\n    }\n    async getEmailFromToken(token) {\n        const email = jwt.verify(token, environment_1.getEnv(\"TOKEN_KEY\"));\n        // @ts-ignore\n        return email.email;\n    }\n    async returnResponse(isImageUploaded) {\n        if (isImageUploaded) {\n            return {\n                content: \"Image is successfully uploaded\",\n                statusCode: 200,\n            };\n        }\n        return {\n            content: \"Error occured\",\n            statusCode: 500,\n        };\n    }\n}\nexports.UploadManager = UploadManager;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/upload/upload.manager.ts?");

/***/ }),

/***/ "./api/gallery/upload/upload.service.ts":
/*!**********************************************!*\
  !*** ./api/gallery/upload/upload.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UploadService = void 0;\nconst image_model_1 = __webpack_require__(/*! @models/MongoDB/image.model */ \"./models/MongoDB/image.model.ts\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst util = __webpack_require__(/*! util */ \"util\");\nconst stat = util.promisify(fs.stat);\nclass UploadService {\n    constructor() {\n        this.FOLDER_PATH = path.resolve(path.join(__dirname, \"../../../../../images\"));\n    }\n    async saveImageInDB(uploadedImage, stats, user) {\n        const image = new image_model_1.default({\n            path: uploadedImage,\n            metadata: stats,\n            owner: user,\n        });\n        await image.save().then((result) => console.log(result));\n    }\n    async saveImageLocally(uploadedImage, uploadedContent) {\n        fs.writeFile(path.join(this.FOLDER_PATH, uploadedImage), uploadedContent, { encoding: null }, (err) => {\n            if (err)\n                console.error(err);\n        });\n    }\n}\nexports.UploadService = UploadService;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/upload/upload.service.ts?");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lambda-multipart-parser":
/*!******************************************!*\
  !*** external "lambda-multipart-parser" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("lambda-multipart-parser");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("source-map-support");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./api/gallery/upload/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;