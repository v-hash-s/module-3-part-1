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
    /***/ "./api/gallery/upload/handler.ts":
      /*!***************************************!*\
  !*** ./api/gallery/upload/handler.ts ***!
  \***************************************/
      /***/ () => {
        eval(
          'throw new Error("Module parse failed: \'import\' and \'export\' may only appear at the top level (16:4)\\nFile was processed with these loaders:\\n * ./node_modules/ts-loader/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n|     //   log(payload);\\n|     const filename = payload.files[0].filename;\\n>     export async function fileMetadataAsync(filePath) {\\n|         const { stdout } = await execFileP(\\"mdls\\", [\\"-plist\\", \\"-\\", filePath]);\\n|         return parse(stdout.trim());");\n\n//# sourceURL=webpack://template-aws-sls/./api/gallery/upload/handler.ts?'
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
    "./api/gallery/upload/handler.ts"
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
