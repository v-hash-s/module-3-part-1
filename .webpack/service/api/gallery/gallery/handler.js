/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./api/gallery/gallery/gallery.manager.ts":
      /*!************************************************!*\
  !*** ./api/gallery/gallery/gallery.manager.ts ***!
  \************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.GalleryManager = void 0;\nconst gallery_service_1 = __webpack_require__(/*! ./gallery.service */ "./api/gallery/gallery/gallery.service.ts");\nconst image_model_1 = __webpack_require__(/*! @models/MongoDB/image.model */ "./models/MongoDB/image.model.ts");\nconst environment_1 = __webpack_require__(/*! @helper/environment */ "./helper/environment.ts");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ "./helper/logger.ts");\nclass GalleryManager {\n    constructor() {\n        this.service = new gallery_service_1.GalleryService();\n        // this.limit = queryParameters.limit\n    }\n    async sendUsersImage(queryParameters, email) {\n        let filter;\n        if (queryParameters.filter == null) {\n            filter = false;\n            return this.service.sendGalleryObject(queryParameters);\n        }\n        else {\n            logger_1.log("EMAIL: ", email);\n            const objects = await image_model_1.default.find({ owner: await email }, { path: 1, _id: 0 }).exec();\n            logger_1.log(objects);\n            const images = objects.map((img) => {\n                return img.path;\n            });\n            logger_1.log(images);\n            const galleryResponse = {\n                objects: images,\n            };\n            logger_1.log(galleryResponse);\n            return galleryResponse;\n        }\n    }\n    async getEmailFromToken(token) {\n        const email = jwt.verify(token, environment_1.getEnv("TOKEN_KEY"));\n        // @ts-ignore\n        return email.email;\n    }\n}\nexports.GalleryManager = GalleryManager;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/gallery/gallery.manager.ts?'
        );

        /***/
      },

    /***/ "./api/gallery/gallery/gallery.service.ts":
      /*!************************************************!*\
  !*** ./api/gallery/gallery/gallery.service.ts ***!
  \************************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.GalleryService = void 0;\nconst image_model_1 = __webpack_require__(/*! @models/MongoDB/image.model */ "./models/MongoDB/image.model.ts");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ "./helper/logger.ts");\nclass GalleryService {\n    async sendGalleryObject(queryParameters) {\n        console.log("QUERY: ", queryParameters);\n        const galleryResponse = {\n            objects: await this.getPhotosArray(queryParameters.page, queryParameters.limit),\n            total: await this.getPagesNumber(queryParameters),\n        };\n        logger_1.log("GALLERY Response: ", galleryResponse);\n        return galleryResponse;\n    }\n    async getPagesNumber(queryParameters) {\n        let limit = Number(queryParameters.limit);\n        // if (limit == null) {\n        //   limit = 10;\n        // }\n        const counts = await image_model_1.default.count();\n        const finalResult = Math.ceil(counts / limit);\n        return finalResult;\n    }\n    async getTotal(queryParameters) {\n        const total = await this.getPagesNumber(queryParameters);\n        return total;\n    }\n    async getPhotosArray(pageNumber, limit) {\n        logger_1.log("Page num: ", pageNumber);\n        logger_1.log("limit: ", limit);\n        const arr = await this.getValue();\n        const photos = [];\n        limit = Number(limit);\n        pageNumber = Number(pageNumber);\n        for (let i = (pageNumber - 1) * limit; i < limit + (pageNumber - 1) * limit && i < arr.length; i++) {\n            photos.push(arr[i].path);\n            logger_1.log(arr[i] + " : " + i);\n        }\n        return photos;\n    }\n    async getValue() {\n        const arr = await image_model_1.default.find({}, { path: 1, _id: 0 }).exec();\n        return arr;\n    }\n}\nexports.GalleryService = GalleryService;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/gallery/gallery.service.ts?'
        );

        /***/
      },

    /***/ "./api/gallery/gallery/handler.ts":
      /*!****************************************!*\
  !*** ./api/gallery/gallery/handler.ts ***!
  \****************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getGalleryPage = void 0;\nconst gallery_manager_1 = __webpack_require__(/*! ./gallery.manager */ "./api/gallery/gallery/gallery.manager.ts");\nconst logger_1 = __webpack_require__(/*! @helper/logger */ "./helper/logger.ts");\nconst db_connection_1 = __webpack_require__(/*! @services/db_connection */ "./services/db_connection.ts");\nconst getGalleryPage = async (event) => {\n    await db_connection_1.connectDB;\n    const queryParameters = event.queryStringParameters;\n    const token = event.multiValueHeaders.Authorization.toString().replace("Bearer ", "");\n    logger_1.log(token);\n    const manager = new gallery_manager_1.GalleryManager();\n    const email = await manager.getEmailFromToken(token);\n    manager.sendUsersImage(queryParameters, email);\n};\nexports.getGalleryPage = getGalleryPage;\n\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/gallery/handler.ts?'
        );

        /***/
      },

    /***/ "./errors/runtime/runtime-error.ts":
      /*!*****************************************!*\
  !*** ./errors/runtime/runtime-error.ts ***!
  \*****************************************/
      /***/ (__unused_webpack_module, exports) => {
        "use strict";
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.RuntimeError = void 0;\nclass RuntimeError extends Error {\n    constructor(message, details) {\n        super(message);\n        this.details = details;\n        this.name = this.constructor.name;\n    }\n}\nexports.RuntimeError = RuntimeError;\n\n\n//# sourceURL=webpack://template-aws-sls/./errors/runtime/runtime-error.ts?'
        );

        /***/
      },

    /***/ "./helper/environment.ts":
      /*!*******************************!*\
  !*** ./helper/environment.ts ***!
  \*******************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.getEnv = exports.isStage = exports.getStage = void 0;\nconst runtime_error_1 = __webpack_require__(/*! @errors/runtime/runtime-error */ "./errors/runtime/runtime-error.ts");\n/**\n * Extract substitutable envs, because we use webpack-dotenv plugin\n * which have these limitations https://github.com/mrsteele/dotenv-webpack#limitations\n */\nconst envs = {\n    STAGE: process.env.STAGE,\n    REGION: process.env.REGION,\n    PROFILE: process.env.PROFILE,\n    CLIENT: process.env.CLIENT,\n    IS_OFFLINE: process.env.IS_OFFLINE,\n    OFFLINE_API_BASE_URL: process.env.OFFLINE_API_BASE_URL,\n    CI: process.env.CI,\n    HIDE_LOGS: process.env.HIDE_LOGS,\n    USERS_TABLE_NAME: process.env.USERS_TABLE_NAME,\n    JOBS_TABLE_NAME: process.env.JOBS_TABLE_NAME,\n};\nfunction getStage() {\n    return getEnv(\'STAGE\');\n}\nexports.getStage = getStage;\nfunction isStage(stage) {\n    return getStage() === stage;\n}\nexports.isStage = isStage;\nfunction getEnv(name, required = true) {\n    const v = envs[name] || process.env[name];\n    if (required && !v) {\n        throw new runtime_error_1.RuntimeError(`Missing environment variable ${name}`);\n    }\n    return v;\n}\nexports.getEnv = getEnv;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/environment.ts?'
        );

        /***/
      },

    /***/ "./helper/logger.ts":
      /*!**************************!*\
  !*** ./helper/logger.ts ***!
  \**************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        eval(
          "\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.log = void 0;\nconst environment_1 = __webpack_require__(/*! @helper/environment */ \"./helper/environment.ts\");\nconst format_axios_error_1 = __webpack_require__(/*! @redtea/format-axios-error */ \"@redtea/format-axios-error\");\nfunction log(...args) {\n    /**\n     * Don't show the logs in CI for faster testing\n     * Sometimes we turn off the logs in production environment for better performance\n     */\n    if (environment_1.getEnv('CI', false) === 'true' || environment_1.getEnv('HIDE_LOGS', false) === 'true') {\n        return;\n    }\n    if (environment_1.getEnv('IS_OFFLINE', false) === 'true') {\n        args.forEach((i) => console.dir(i));\n    }\n    else {\n        console.log(...args.map((arg) => {\n            /**\n             * Axios error has complicated structure that doesn't allow debugging it easily\n             */\n            if (arg.isAxiosError) {\n                return JSON.stringify(format_axios_error_1.format(arg));\n            }\n            return JSON.stringify(arg);\n        }));\n    }\n}\nexports.log = log;\n\n\n//# sourceURL=webpack://template-aws-sls/./helper/logger.ts?"
        );

        /***/
      },

    /***/ "./models/MongoDB/image.model.ts":
      /*!***************************************!*\
  !*** ./models/MongoDB/image.model.ts ***!
  \***************************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nconst mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst Schema = mongoose.Schema;\nconst imageSchema = new Schema({\n    path: String,\n    metadata: Object,\n    owner: String,\n});\nconst ImageModel = mongoose.model("images", imageSchema);\nexports.default = ImageModel;\n\n\n//# sourceURL=webpack://template-aws-sls/./models/MongoDB/image.model.ts?'
        );

        /***/
      },

    /***/ "./services/db_connection.ts":
      /*!***********************************!*\
  !*** ./services/db_connection.ts ***!
  \***********************************/
      /***/ (__unused_webpack_module, exports, __webpack_require__) => {
        "use strict";
        eval(
          '\nObject.defineProperty(exports, "__esModule", ({ value: true }));\nexports.connectDB = void 0;\nconst logger_1 = __webpack_require__(/*! @helper/logger */ "./helper/logger.ts");\nconst mongoose = __webpack_require__(/*! mongoose */ "mongoose");\nconst environment_1 = __webpack_require__(/*! ../helper/environment */ "./helper/environment.ts");\nmongoose.connect(environment_1.getEnv("MONGODB_URI"));\nexports.connectDB = new Promise((res, rej) => {\n    mongoose.connection.on("error", (error) => {\n        logger_1.log(error);\n        rej(error);\n    });\n    mongoose.connection.on("open", () => {\n        logger_1.log("DB connection established");\n    });\n    res(mongoose.connection);\n});\n\n\n//# sourceURL=webpack://template-aws-sls/./services/db_connection.ts?'
        );

        /***/
      },

    /***/ "./source-map-install.js":
      /*!*******************************!*\
  !*** ./source-map-install.js ***!
  \*******************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__(/*! source-map-support */ "source-map-support").install();\n\n\n//# sourceURL=webpack://template-aws-sls/./source-map-install.js?'
        );

        /***/
      },

    /***/ "@redtea/format-axios-error":
      /*!*********************************************!*\
  !*** external "@redtea/format-axios-error" ***!
  \*********************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("@redtea/format-axios-error");

        /***/
      },

    /***/ jsonwebtoken:
      /*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("jsonwebtoken");

        /***/
      },

    /***/ mongoose:
      /*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("mongoose");

        /***/
      },

    /***/ "source-map-support":
      /*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
      /***/ (module) => {
        "use strict";
        module.exports = require("source-map-support");

        /***/
      },

    /******/
  }; // The module cache
  /************************************************************************/
  /******/ /******/ var __webpack_module_cache__ = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    ); // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // startup // Load entry module and return exports // This entry module can't be inlined because the eval devtool is used.
  /******/
  /************************************************************************/
  /******/
  /******/ /******/ /******/ /******/ __webpack_require__(
    "./source-map-install.js"
  );
  /******/ var __webpack_exports__ = __webpack_require__(
    "./api/gallery/gallery/handler.ts"
  );
  /******/ var __webpack_export_target__ = exports;
  /******/ for (var i in __webpack_exports__)
    __webpack_export_target__[i] = __webpack_exports__[i];
  /******/ if (__webpack_exports__.__esModule)
    Object.defineProperty(__webpack_export_target__, "__esModule", {
      value: true,
    });
  /******/
  /******/
})();
