/******/
(function(modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {}
            /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/
    __webpack_require__.d = function(exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
            /******/
        }
        /******/
    };
    /******/
    /******/ // define __esModule on exports
    /******/
    __webpack_require__.r = function(exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            });
            /******/
        }
        /******/
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
        /******/
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/
    __webpack_require__.t = function(value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/
        if (mode & 8) return value;
        /******/
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        /******/
        var ns = Object.create(null);
        /******/
        __webpack_require__.r(ns);
        /******/
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        /******/
        if (mode & 2 && typeof value != 'string')
            for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
        /******/
        return ns;
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function(module) {
        /******/
        var getter = module && module.__esModule ?
            /******/
            function getDefault() {
                return module['default'];
            } :
            /******/
            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "/assets/";
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 58);
    /******/
})
/************************************************************************/
/******/
({

    /***/
    "./src/assets/scripts/modules/hv2-faqs.js":
        /*!************************************************!*\
          !*** ./src/assets/scripts/modules/hv2-faqs.js ***!
          \************************************************/
        /*! no static exports found */
        /***/
        (function(module, exports, __webpack_require__) {

            "use strict";


            document.addEventListener('DOMContentLoaded', function() {
                const accordionItems = document.querySelectorAll('.hv2-faqs .hv2-faqs__accordion-item');
                const accordionButton = document.querySelector('.hv2-faqs .hv2-faqs__accordion-button');
                if (accordionItems.length > 0 && accordionButton) {
                    const accordion = document.querySelector('.hv2-faqs .hv2-faqs__accordion');
                    const accordionCount = accordion.getAttribute('accordion-count');
                    const maxItemsToShow = accordionCount;
                    if (accordionItems.length > maxItemsToShow) {
                        for (var i = maxItemsToShow; i < accordionItems.length; i++) {
                            accordionItems[i].classList.add('hide');
                        }
                        accordionButton.style.display = 'block';
                    }
                    accordionButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        for (var i = maxItemsToShow; i < accordionItems.length; i++) {
                            accordionItems[i].classList.remove('hide');
                        }
                        accordionButton.style.display = 'none';
                    });
                }
                if (accordionItems.length > 0) {
                    const accordionHeadings = document.querySelectorAll('.hv2-faqs .hv2-faqs__accordion-heading');
                    const accordionItems = document.querySelectorAll('.hv2-faqs__accordion-item');
                    accordionHeadings.forEach(function(heading) {
                        heading.addEventListener('click', function() {
                            const accordionItem = this.closest('.hv2-faqs__accordion-item');
                            accordionItems.forEach(function(item) {
                                let accordionContent = item.querySelector('.hv2-faqs__accordion-content');
                                if (item !== accordionItem && item.classList.contains('active')) {
                                    item.classList.remove('active');
                                    accordionContent.style.maxHeight = null;
                                }
                            });
                            accordionItem.classList.toggle('active');
                            let accordionContent = accordionItem.querySelector('.hv2-faqs__accordion-content');
                            if (accordionContent.style.maxHeight) {
                                accordionContent.style.maxHeight = null;
                            } else {
                                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                            }
                        });
                    });
                }
            });

            /***/
        }),

    /***/
    "./src/assets/styles/modules/hv2-faqs.scss":
        /*!*************************************************!*\
          !*** ./src/assets/styles/modules/hv2-faqs.scss ***!
          \*************************************************/
        /*! no static exports found */
        /***/
        (function(module, exports, __webpack_require__) {

            // extracted by mini-css-extract-plugin

            /***/
        }),

    /***/
    58:
        /*!************************************************************************************************!*\
          !*** multi ./src/assets/styles/modules/hv2-faqs.scss ./src/assets/scripts/modules/hv2-faqs.js ***!
          \************************************************************************************************/
        /*! no static exports found */
        /***/
        (function(module, exports, __webpack_require__) {

            __webpack_require__( /*! D:\www\website-www\src\assets\styles\modules\hv2-faqs.scss */ "./src/assets/styles/modules/hv2-faqs.scss");
            module.exports = __webpack_require__( /*! D:\www\website-www\src\assets\scripts\modules\hv2-faqs.js */ "./src/assets/scripts/modules/hv2-faqs.js");


            /***/
        })

    /******/
});
//# sourceMappingURL=hv2_faqs.js.map