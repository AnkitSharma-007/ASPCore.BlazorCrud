/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MonoPlatform_1 = __webpack_require__(7);
exports.platform = MonoPlatform_1.monoPlatform;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InternalRegisteredFunction_1 = __webpack_require__(8);
var registeredFunctions = {};
function registerFunction(identifier, implementation) {
    if (InternalRegisteredFunction_1.internalRegisteredFunctions.hasOwnProperty(identifier)) {
        throw new Error("The function identifier '" + identifier + "' is reserved and cannot be registered.");
    }
    if (registeredFunctions.hasOwnProperty(identifier)) {
        throw new Error("A function with the identifier '" + identifier + "' has already been registered.");
    }
    registeredFunctions[identifier] = implementation;
}
exports.registerFunction = registerFunction;
function getRegisteredFunction(identifier) {
    // By prioritising the internal ones, we ensure you can't override them
    var result = InternalRegisteredFunction_1.internalRegisteredFunctions[identifier] || registeredFunctions[identifier];
    if (result) {
        return result;
    }
    else {
        throw new Error("Could not find registered function with name '" + identifier + "'.");
    }
}
exports.getRegisteredFunction = getRegisteredFunction;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getAssemblyNameFromUrl(url) {
    var lastSegment = url.substring(url.lastIndexOf('/') + 1);
    var queryStringStartPos = lastSegment.indexOf('?');
    var filename = queryStringStartPos < 0 ? lastSegment : lastSegment.substring(0, queryStringStartPos);
    return filename.replace(/\.dll$/, '');
}
exports.getAssemblyNameFromUrl = getAssemblyNameFromUrl;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function applyCaptureIdToElement(element, referenceCaptureId) {
    element.setAttribute(getCaptureIdAttributeName(referenceCaptureId), '');
}
exports.applyCaptureIdToElement = applyCaptureIdToElement;
function getElementByCaptureId(referenceCaptureId) {
    var selector = "[" + getCaptureIdAttributeName(referenceCaptureId) + "]";
    return document.querySelector(selector);
}
exports.getElementByCaptureId = getElementByCaptureId;
function getCaptureIdAttributeName(referenceCaptureId) {
    return "_bl_" + referenceCaptureId;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RenderBatch_1 = __webpack_require__(10);
var BrowserRenderer_1 = __webpack_require__(11);
var browserRenderers = {};
function attachRootComponentToElement(browserRendererId, elementSelector, componentId) {
    var elementSelectorJs = Environment_1.platform.toJavaScriptString(elementSelector);
    var element = document.querySelector(elementSelectorJs);
    if (!element) {
        throw new Error("Could not find any element matching selector '" + elementSelectorJs + "'.");
    }
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        browserRenderer = browserRenderers[browserRendererId] = new BrowserRenderer_1.BrowserRenderer(browserRendererId);
    }
    clearElement(element);
    browserRenderer.attachRootComponentToElement(componentId, element);
}
exports.attachRootComponentToElement = attachRootComponentToElement;
function renderBatch(browserRendererId, batch) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        throw new Error("There is no browser renderer with ID " + browserRendererId + ".");
    }
    var updatedComponents = RenderBatch_1.renderBatch.updatedComponents(batch);
    var updatedComponentsLength = RenderBatch_1.arrayRange.count(updatedComponents);
    var updatedComponentsArray = RenderBatch_1.arrayRange.array(updatedComponents);
    var referenceFramesStruct = RenderBatch_1.renderBatch.referenceFrames(batch);
    var referenceFrames = RenderBatch_1.arrayRange.array(referenceFramesStruct);
    for (var i = 0; i < updatedComponentsLength; i++) {
        var diff = Environment_1.platform.getArrayEntryPtr(updatedComponentsArray, i, RenderBatch_1.renderTreeDiffStructLength);
        var componentId = RenderBatch_1.renderTreeDiff.componentId(diff);
        var editsArraySegment = RenderBatch_1.renderTreeDiff.edits(diff);
        var edits = RenderBatch_1.arraySegment.array(editsArraySegment);
        var editsOffset = RenderBatch_1.arraySegment.offset(editsArraySegment);
        var editsLength = RenderBatch_1.arraySegment.count(editsArraySegment);
        browserRenderer.updateComponent(componentId, edits, editsOffset, editsLength, referenceFrames);
    }
    var disposedComponentIds = RenderBatch_1.renderBatch.disposedComponentIds(batch);
    var disposedComponentIdsLength = RenderBatch_1.arrayRange.count(disposedComponentIds);
    var disposedComponentIdsArray = RenderBatch_1.arrayRange.array(disposedComponentIds);
    for (var i = 0; i < disposedComponentIdsLength; i++) {
        var componentIdPtr = Environment_1.platform.getArrayEntryPtr(disposedComponentIdsArray, i, 4);
        var componentId = Environment_1.platform.readInt32Field(componentIdPtr);
        browserRenderer.disposeComponent(componentId);
    }
    var disposedEventHandlerIds = RenderBatch_1.renderBatch.disposedEventHandlerIds(batch);
    var disposedEventHandlerIdsLength = RenderBatch_1.arrayRange.count(disposedEventHandlerIds);
    var disposedEventHandlerIdsArray = RenderBatch_1.arrayRange.array(disposedEventHandlerIds);
    for (var i = 0; i < disposedEventHandlerIdsLength; i++) {
        var eventHandlerIdPtr = Environment_1.platform.getArrayEntryPtr(disposedEventHandlerIdsArray, i, 4);
        var eventHandlerId = Environment_1.platform.readInt32Field(eventHandlerIdPtr);
        browserRenderer.disposeEventHandler(eventHandlerId);
    }
}
exports.renderBatch = renderBatch;
function clearElement(element) {
    var childNode;
    while (childNode = element.firstChild) {
        element.removeChild(childNode);
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RegisteredFunction_1 = __webpack_require__(1);
var Environment_1 = __webpack_require__(0);
var registeredFunctionPrefix = 'Microsoft.AspNetCore.Blazor.Browser.Services.BrowserUriHelper';
var notifyLocationChangedMethod;
var hasRegisteredEventListeners = false;
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".getLocationHref", function () { return Environment_1.platform.toDotNetString(location.href); });
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".getBaseURI", function () { return document.baseURI ? Environment_1.platform.toDotNetString(document.baseURI) : null; });
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".enableNavigationInterception", function () {
    if (hasRegisteredEventListeners) {
        return;
    }
    hasRegisteredEventListeners = true;
    document.addEventListener('click', function (event) {
        // Intercept clicks on all <a> elements where the href is within the <base href> URI space
        var anchorTarget = findClosestAncestor(event.target, 'A');
        if (anchorTarget) {
            var href = anchorTarget.getAttribute('href');
            if (isWithinBaseUriSpace(toAbsoluteUri(href))) {
                event.preventDefault();
                performInternalNavigation(href);
            }
        }
    });
    window.addEventListener('popstate', handleInternalNavigation);
});
RegisteredFunction_1.registerFunction(registeredFunctionPrefix + ".navigateTo", function (uriDotNetString) {
    navigateTo(Environment_1.platform.toJavaScriptString(uriDotNetString));
});
function navigateTo(uri) {
    if (isWithinBaseUriSpace(toAbsoluteUri(uri))) {
        performInternalNavigation(uri);
    }
    else {
        location.href = uri;
    }
}
exports.navigateTo = navigateTo;
function performInternalNavigation(href) {
    history.pushState(null, /* ignored title */ '', href);
    handleInternalNavigation();
}
function handleInternalNavigation() {
    if (!notifyLocationChangedMethod) {
        notifyLocationChangedMethod = Environment_1.platform.findMethod('Microsoft.AspNetCore.Blazor.Browser', 'Microsoft.AspNetCore.Blazor.Browser.Services', 'BrowserUriHelper', 'NotifyLocationChanged');
    }
    Environment_1.platform.callMethod(notifyLocationChangedMethod, null, [
        Environment_1.platform.toDotNetString(location.href)
    ]);
}
var testAnchor;
function toAbsoluteUri(relativeUri) {
    testAnchor = testAnchor || document.createElement('a');
    testAnchor.href = relativeUri;
    return testAnchor.href;
}
function findClosestAncestor(element, tagName) {
    return !element
        ? null
        : element.tagName === tagName
            ? element
            : findClosestAncestor(element.parentElement, tagName);
}
function isWithinBaseUriSpace(href) {
    var baseUriPrefixWithTrailingSlash = toBaseUriPrefixWithTrailingSlash(document.baseURI); // TODO: Might baseURI really be null?
    return href.startsWith(baseUriPrefixWithTrailingSlash);
}
function toBaseUriPrefixWithTrailingSlash(baseUri) {
    return baseUri.substr(0, baseUri.lastIndexOf('/') + 1);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var DotNet_1 = __webpack_require__(2);
__webpack_require__(4);
__webpack_require__(17);
__webpack_require__(5);
__webpack_require__(18);
function boot() {
    return __awaiter(this, void 0, void 0, function () {
        var allScriptElems, thisScriptElem, isLinkerEnabled, entryPointDll, entryPointMethod, entryPointAssemblyName, referenceAssembliesCommaSeparated, referenceAssemblies, loadAssemblyUrls, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allScriptElems = document.getElementsByTagName('script');
                    thisScriptElem = (document.currentScript || allScriptElems[allScriptElems.length - 1]);
                    isLinkerEnabled = thisScriptElem.getAttribute('linker-enabled') === 'true';
                    entryPointDll = getRequiredBootScriptAttribute(thisScriptElem, 'main');
                    entryPointMethod = getRequiredBootScriptAttribute(thisScriptElem, 'entrypoint');
                    entryPointAssemblyName = DotNet_1.getAssemblyNameFromUrl(entryPointDll);
                    referenceAssembliesCommaSeparated = thisScriptElem.getAttribute('references') || '';
                    referenceAssemblies = referenceAssembliesCommaSeparated
                        .split(',')
                        .map(function (s) { return s.trim(); })
                        .filter(function (s) { return !!s; });
                    if (!isLinkerEnabled) {
                        console.info('Blazor is running in dev mode without IL stripping. To make the bundle size significantly smaller, publish the application or see https://go.microsoft.com/fwlink/?linkid=870414');
                    }
                    loadAssemblyUrls = [entryPointDll]
                        .concat(referenceAssemblies)
                        .map(function (filename) { return "_framework/_bin/" + filename; });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Environment_1.platform.start(loadAssemblyUrls)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ex_1 = _a.sent();
                    throw new Error("Failed to start platform. Reason: " + ex_1);
                case 4:
                    // Start up the application
                    Environment_1.platform.callEntryPoint(entryPointAssemblyName, entryPointMethod, []);
                    return [2 /*return*/];
            }
        });
    });
}
function getRequiredBootScriptAttribute(elem, attributeName) {
    var result = elem.getAttribute(attributeName);
    if (!result) {
        throw new Error("Missing \"" + attributeName + "\" attribute on Blazor script tag.");
    }
    return result;
}
boot();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DotNet_1 = __webpack_require__(2);
var RegisteredFunction_1 = __webpack_require__(1);
var assemblyHandleCache = {};
var typeHandleCache = {};
var methodHandleCache = {};
var assembly_load;
var find_class;
var find_method;
var invoke_method;
var mono_string_get_utf8;
var mono_string;
exports.monoPlatform = {
    start: function start(loadAssemblyUrls) {
        return new Promise(function (resolve, reject) {
            // mono.js assumes the existence of this
            window['Browser'] = {
                init: function () { },
                asyncLoad: asyncLoad
            };
            // Emscripten works by expecting the module config to be a global
            window['Module'] = createEmscriptenModuleInstance(loadAssemblyUrls, resolve, reject);
            addScriptTagsToDocument();
        });
    },
    findMethod: findMethod,
    callEntryPoint: function callEntryPoint(assemblyName, entrypointMethod, args) {
        // Parse the entrypointMethod, which is of the form MyApp.MyNamespace.MyTypeName::MyMethodName
        // Note that we don't support specifying a method overload, so it has to be unique
        var entrypointSegments = entrypointMethod.split('::');
        if (entrypointSegments.length != 2) {
            throw new Error('Malformed entry point method name; could not resolve class name and method name.');
        }
        var typeFullName = entrypointSegments[0];
        var methodName = entrypointSegments[1];
        var lastDot = typeFullName.lastIndexOf('.');
        var namespace = lastDot > -1 ? typeFullName.substring(0, lastDot) : '';
        var typeShortName = lastDot > -1 ? typeFullName.substring(lastDot + 1) : typeFullName;
        var entryPointMethodHandle = exports.monoPlatform.findMethod(assemblyName, namespace, typeShortName, methodName);
        exports.monoPlatform.callMethod(entryPointMethodHandle, null, args);
    },
    callMethod: function callMethod(method, target, args) {
        if (args.length > 4) {
            // Hopefully this restriction can be eased soon, but for now make it clear what's going on
            throw new Error("Currently, MonoPlatform supports passing a maximum of 4 arguments from JS to .NET. You tried to pass " + args.length + ".");
        }
        var stack = Module.stackSave();
        try {
            var argsBuffer = Module.stackAlloc(args.length);
            var exceptionFlagManagedInt = Module.stackAlloc(4);
            for (var i = 0; i < args.length; ++i) {
                Module.setValue(argsBuffer + i * 4, args[i], 'i32');
            }
            Module.setValue(exceptionFlagManagedInt, 0, 'i32');
            var res = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);
            if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {
                // If the exception flag is set, the returned value is exception.ToString()
                throw new Error(exports.monoPlatform.toJavaScriptString(res));
            }
            return res;
        }
        finally {
            Module.stackRestore(stack);
        }
    },
    toJavaScriptString: function toJavaScriptString(managedString) {
        // Comments from original Mono sample:
        //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
        //FIXME this is unsafe, cuz raw objects could be GC'd.
        var utf8 = mono_string_get_utf8(managedString);
        var res = Module.UTF8ToString(utf8);
        Module._free(utf8);
        return res;
    },
    toDotNetString: function toDotNetString(jsString) {
        return mono_string(jsString);
    },
    getArrayLength: function getArrayLength(array) {
        return Module.getValue(getArrayDataPointer(array), 'i32');
    },
    getArrayEntryPtr: function getArrayEntryPtr(array, index, itemSize) {
        // First byte is array length, followed by entries
        var address = getArrayDataPointer(array) + 4 + index * itemSize;
        return address;
    },
    getObjectFieldsBaseAddress: function getObjectFieldsBaseAddress(referenceTypedObject) {
        // The first two int32 values are internal Mono data
        return (referenceTypedObject + 8);
    },
    readInt32Field: function readHeapInt32(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readObjectField: function readHeapObject(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readStringField: function readHeapObject(baseAddress, fieldOffset) {
        var fieldValue = Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
        return fieldValue === 0 ? null : exports.monoPlatform.toJavaScriptString(fieldValue);
    },
    readStructField: function readStructField(baseAddress, fieldOffset) {
        return (baseAddress + (fieldOffset || 0));
    },
};
// Bypass normal type checking to add this extra function. It's only intended to be called from
// the JS code in Mono's driver.c. It's never intended to be called from TypeScript.
exports.monoPlatform.monoGetRegisteredFunction = RegisteredFunction_1.getRegisteredFunction;
function findAssembly(assemblyName) {
    var assemblyHandle = assemblyHandleCache[assemblyName];
    if (!assemblyHandle) {
        assemblyHandle = assembly_load(assemblyName);
        if (!assemblyHandle) {
            throw new Error("Could not find assembly \"" + assemblyName + "\"");
        }
        assemblyHandleCache[assemblyName] = assemblyHandle;
    }
    return assemblyHandle;
}
function findType(assemblyName, namespace, className) {
    var fullyQualifiedTypeName = "[" + assemblyName + "]" + namespace + "." + className;
    var typeHandle = typeHandleCache[fullyQualifiedTypeName];
    if (!typeHandle) {
        typeHandle = find_class(findAssembly(assemblyName), namespace, className);
        if (!typeHandle) {
            throw new Error("Could not find type \"" + className + "\" in namespace \"" + namespace + "\" in assembly \"" + assemblyName + "\"");
        }
        typeHandleCache[fullyQualifiedTypeName] = typeHandle;
    }
    return typeHandle;
}
function findMethod(assemblyName, namespace, className, methodName) {
    var fullyQualifiedMethodName = "[" + assemblyName + "]" + namespace + "." + className + "::" + methodName;
    var methodHandle = methodHandleCache[fullyQualifiedMethodName];
    if (!methodHandle) {
        methodHandle = find_method(findType(assemblyName, namespace, className), methodName, -1);
        if (!methodHandle) {
            throw new Error("Could not find method \"" + methodName + "\" on type \"" + namespace + "." + className + "\"");
        }
        methodHandleCache[fullyQualifiedMethodName] = methodHandle;
    }
    return methodHandle;
}
function addScriptTagsToDocument() {
    // Load either the wasm or asm.js version of the Mono runtime
    var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
    var monoRuntimeUrlBase = '_framework/' + (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');
    var monoRuntimeScriptUrl = monoRuntimeUrlBase + "/mono.js";
    if (!browserSupportsNativeWebAssembly) {
        // In the asmjs case, the initial memory structure is in a separate file we need to download
        var meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
        meminitXHR.open('GET', monoRuntimeUrlBase + "/mono.js.mem");
        meminitXHR.responseType = 'arraybuffer';
        meminitXHR.send(null);
    }
    document.write("<script defer src=\"" + monoRuntimeScriptUrl + "\"></script>");
}
function createEmscriptenModuleInstance(loadAssemblyUrls, onReady, onError) {
    var module = {};
    var wasmBinaryFile = '_framework/wasm/mono.wasm';
    var asmjsCodeFile = '_framework/asmjs/mono.asm.js';
    module.print = function (line) { return console.log("WASM: " + line); };
    module.printErr = function (line) { return console.error("WASM: " + line); };
    module.preRun = [];
    module.postRun = [];
    module.preloadPlugins = [];
    module.locateFile = function (fileName) {
        switch (fileName) {
            case 'mono.wasm': return wasmBinaryFile;
            case 'mono.asm.js': return asmjsCodeFile;
            default: return fileName;
        }
    };
    module.preRun.push(function () {
        // By now, emscripten should be initialised enough that we can capture these methods for later use
        assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);
        find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);
        find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);
        invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);
        mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);
        mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);
        Module.FS_createPath('/', 'appBinDir', true, true);
        loadAssemblyUrls.forEach(function (url) {
            return FS.createPreloadedFile('appBinDir', DotNet_1.getAssemblyNameFromUrl(url) + ".dll", url, true, false, undefined, onError);
        });
    });
    module.postRun.push(function () {
        var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string']);
        load_runtime('appBinDir');
        onReady();
    });
    return module;
}
function asyncLoad(url, onload, onerror) {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', url, /* async: */ true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
            var asm = new Uint8Array(xhr.response);
            onload(asm);
        }
        else {
            onerror(xhr);
        }
    };
    xhr.onerror = onerror;
    xhr.send(null);
}
function getArrayDataPointer(array) {
    return array + 12; // First byte from here is length, then following bytes are entries
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InvokeWithJsonMarshalling_1 = __webpack_require__(9);
var Renderer_1 = __webpack_require__(4);
/**
 * The definitive list of internal functions invokable from .NET code.
 * These function names are treated as 'reserved' and cannot be passed to registerFunction.
 */
exports.internalRegisteredFunctions = {
    attachRootComponentToElement: Renderer_1.attachRootComponentToElement,
    invokeWithJsonMarshalling: InvokeWithJsonMarshalling_1.invokeWithJsonMarshalling,
    renderBatch: Renderer_1.renderBatch,
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RegisteredFunction_1 = __webpack_require__(1);
var ElementReferenceCapture_1 = __webpack_require__(3);
var elementRefKey = '_blazorElementRef'; // Keep in sync with ElementRef.cs
function invokeWithJsonMarshalling(identifier) {
    var argsJson = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        argsJson[_i - 1] = arguments[_i];
    }
    var identifierJsString = Environment_1.platform.toJavaScriptString(identifier);
    var funcInstance = RegisteredFunction_1.getRegisteredFunction(identifierJsString);
    var args = argsJson.map(function (json) { return JSON.parse(Environment_1.platform.toJavaScriptString(json), jsonReviver); });
    var result = funcInstance.apply(null, args);
    if (result !== null && result !== undefined) {
        var resultJson = JSON.stringify(result);
        return Environment_1.platform.toDotNetString(resultJson);
    }
    else {
        return null;
    }
}
exports.invokeWithJsonMarshalling = invokeWithJsonMarshalling;
function jsonReviver(key, value) {
    if (value && typeof value === 'object' && value.hasOwnProperty(elementRefKey) && typeof value[elementRefKey] === 'number') {
        return ElementReferenceCapture_1.getElementByCaptureId(value[elementRefKey]);
    }
    return value;
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
// Keep in sync with the structs in .NET code
exports.renderBatch = {
    updatedComponents: function (obj) { return Environment_1.platform.readStructField(obj, 0); },
    referenceFrames: function (obj) { return Environment_1.platform.readStructField(obj, arrayRangeStructLength); },
    disposedComponentIds: function (obj) { return Environment_1.platform.readStructField(obj, arrayRangeStructLength + arrayRangeStructLength); },
    disposedEventHandlerIds: function (obj) { return Environment_1.platform.readStructField(obj, arrayRangeStructLength + arrayRangeStructLength + arrayRangeStructLength); },
};
var arrayRangeStructLength = 8;
exports.arrayRange = {
    array: function (obj) { return Environment_1.platform.readObjectField(obj, 0); },
    count: function (obj) { return Environment_1.platform.readInt32Field(obj, 4); },
};
var arraySegmentStructLength = 12;
exports.arraySegment = {
    array: function (obj) { return Environment_1.platform.readObjectField(obj, 0); },
    offset: function (obj) { return Environment_1.platform.readInt32Field(obj, 4); },
    count: function (obj) { return Environment_1.platform.readInt32Field(obj, 8); },
};
exports.renderTreeDiffStructLength = 4 + arraySegmentStructLength;
exports.renderTreeDiff = {
    componentId: function (obj) { return Environment_1.platform.readInt32Field(obj, 0); },
    edits: function (obj) { return Environment_1.platform.readStructField(obj, 4); },
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RenderTreeEdit_1 = __webpack_require__(12);
var RenderTreeFrame_1 = __webpack_require__(13);
var Environment_1 = __webpack_require__(0);
var EventDelegator_1 = __webpack_require__(14);
var LogicalElements_1 = __webpack_require__(16);
var ElementReferenceCapture_1 = __webpack_require__(3);
var selectValuePropname = '_blazorSelectValue';
var raiseEventMethod;
var renderComponentMethod;
var BrowserRenderer = /** @class */ (function () {
    function BrowserRenderer(browserRendererId) {
        var _this = this;
        this.browserRendererId = browserRendererId;
        this.childComponentLocations = {};
        this.eventDelegator = new EventDelegator_1.EventDelegator(function (event, componentId, eventHandlerId, eventArgs) {
            raiseEvent(event, _this.browserRendererId, componentId, eventHandlerId, eventArgs);
        });
    }
    BrowserRenderer.prototype.attachRootComponentToElement = function (componentId, element) {
        this.attachComponentToElement(componentId, LogicalElements_1.toLogicalElement(element));
    };
    BrowserRenderer.prototype.updateComponent = function (componentId, edits, editsOffset, editsLength, referenceFrames) {
        var element = this.childComponentLocations[componentId];
        if (!element) {
            throw new Error("No element is currently associated with component " + componentId);
        }
        this.applyEdits(componentId, element, 0, edits, editsOffset, editsLength, referenceFrames);
    };
    BrowserRenderer.prototype.disposeComponent = function (componentId) {
        delete this.childComponentLocations[componentId];
    };
    BrowserRenderer.prototype.disposeEventHandler = function (eventHandlerId) {
        this.eventDelegator.removeListener(eventHandlerId);
    };
    BrowserRenderer.prototype.attachComponentToElement = function (componentId, element) {
        this.childComponentLocations[componentId] = element;
    };
    BrowserRenderer.prototype.applyEdits = function (componentId, parent, childIndex, edits, editsOffset, editsLength, referenceFrames) {
        var currentDepth = 0;
        var childIndexAtCurrentDepth = childIndex;
        var maxEditIndexExcl = editsOffset + editsLength;
        for (var editIndex = editsOffset; editIndex < maxEditIndexExcl; editIndex++) {
            var edit = RenderTreeEdit_1.getRenderTreeEditPtr(edits, editIndex);
            var editType = RenderTreeEdit_1.renderTreeEdit.type(edit);
            switch (editType) {
                case RenderTreeEdit_1.EditType.prependFrame: {
                    var frameIndex = RenderTreeEdit_1.renderTreeEdit.newTreeIndex(edit);
                    var frame = RenderTreeFrame_1.getTreeFramePtr(referenceFrames, frameIndex);
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    this.insertFrame(componentId, parent, childIndexAtCurrentDepth + siblingIndex, referenceFrames, frame, frameIndex);
                    break;
                }
                case RenderTreeEdit_1.EditType.removeFrame: {
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    LogicalElements_1.removeLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    break;
                }
                case RenderTreeEdit_1.EditType.setAttribute: {
                    var frameIndex = RenderTreeEdit_1.renderTreeEdit.newTreeIndex(edit);
                    var frame = RenderTreeFrame_1.getTreeFramePtr(referenceFrames, frameIndex);
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof HTMLElement) {
                        this.applyAttribute(componentId, element, frame);
                    }
                    else {
                        throw new Error("Cannot set attribute on non-element child");
                    }
                    break;
                }
                case RenderTreeEdit_1.EditType.removeAttribute: {
                    // Note that we don't have to dispose the info we track about event handlers here, because the
                    // disposed event handler IDs are delivered separately (in the 'disposedEventHandlerIds' array)
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    var element = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof HTMLElement) {
                        var attributeName = RenderTreeEdit_1.renderTreeEdit.removedAttributeName(edit);
                        // First try to remove any special property we use for this attribute
                        if (!this.tryApplySpecialProperty(element, attributeName, null)) {
                            // If that's not applicable, it's a regular DOM attribute so remove that
                            element.removeAttribute(attributeName);
                        }
                    }
                    else {
                        throw new Error("Cannot remove attribute from non-element child");
                    }
                    break;
                }
                case RenderTreeEdit_1.EditType.updateText: {
                    var frameIndex = RenderTreeEdit_1.renderTreeEdit.newTreeIndex(edit);
                    var frame = RenderTreeFrame_1.getTreeFramePtr(referenceFrames, frameIndex);
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    var textNode = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    if (textNode instanceof Text) {
                        textNode.textContent = RenderTreeFrame_1.renderTreeFrame.textContent(frame);
                    }
                    else {
                        throw new Error("Cannot set text content on non-text child");
                    }
                    break;
                }
                case RenderTreeEdit_1.EditType.stepIn: {
                    var siblingIndex = RenderTreeEdit_1.renderTreeEdit.siblingIndex(edit);
                    parent = LogicalElements_1.getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    currentDepth++;
                    childIndexAtCurrentDepth = 0;
                    break;
                }
                case RenderTreeEdit_1.EditType.stepOut: {
                    parent = LogicalElements_1.getLogicalParent(parent);
                    currentDepth--;
                    childIndexAtCurrentDepth = currentDepth === 0 ? childIndex : 0; // The childIndex is only ever nonzero at zero depth
                    break;
                }
                default: {
                    var unknownType = editType; // Compile-time verification that the switch was exhaustive
                    throw new Error("Unknown edit type: " + unknownType);
                }
            }
        }
    };
    BrowserRenderer.prototype.insertFrame = function (componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameType = RenderTreeFrame_1.renderTreeFrame.frameType(frame);
        switch (frameType) {
            case RenderTreeFrame_1.FrameType.element:
                this.insertElement(componentId, parent, childIndex, frames, frame, frameIndex);
                return 1;
            case RenderTreeFrame_1.FrameType.text:
                this.insertText(parent, childIndex, frame);
                return 1;
            case RenderTreeFrame_1.FrameType.attribute:
                throw new Error('Attribute frames should only be present as leading children of element frames.');
            case RenderTreeFrame_1.FrameType.component:
                this.insertComponent(parent, childIndex, frame);
                return 1;
            case RenderTreeFrame_1.FrameType.region:
                return this.insertFrameRange(componentId, parent, childIndex, frames, frameIndex + 1, frameIndex + RenderTreeFrame_1.renderTreeFrame.subtreeLength(frame));
            case RenderTreeFrame_1.FrameType.elementReferenceCapture:
                if (parent instanceof Element) {
                    ElementReferenceCapture_1.applyCaptureIdToElement(parent, RenderTreeFrame_1.renderTreeFrame.elementReferenceCaptureId(frame));
                    return 0; // A "capture" is a child in the diff, but has no node in the DOM
                }
                else {
                    throw new Error('Reference capture frames can only be children of element frames.');
                }
            default:
                var unknownType = frameType; // Compile-time verification that the switch was exhaustive
                throw new Error("Unknown frame type: " + unknownType);
        }
    };
    BrowserRenderer.prototype.insertElement = function (componentId, parent, childIndex, frames, frame, frameIndex) {
        var tagName = RenderTreeFrame_1.renderTreeFrame.elementName(frame);
        var newDomElementRaw = tagName === 'svg' || LogicalElements_1.isSvgElement(parent) ?
            document.createElementNS('http://www.w3.org/2000/svg', tagName) :
            document.createElement(tagName);
        var newElement = LogicalElements_1.toLogicalElement(newDomElementRaw);
        LogicalElements_1.insertLogicalChild(newDomElementRaw, parent, childIndex);
        // Apply attributes
        var descendantsEndIndexExcl = frameIndex + RenderTreeFrame_1.renderTreeFrame.subtreeLength(frame);
        for (var descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
            var descendantFrame = RenderTreeFrame_1.getTreeFramePtr(frames, descendantIndex);
            if (RenderTreeFrame_1.renderTreeFrame.frameType(descendantFrame) === RenderTreeFrame_1.FrameType.attribute) {
                this.applyAttribute(componentId, newDomElementRaw, descendantFrame);
            }
            else {
                // As soon as we see a non-attribute child, all the subsequent child frames are
                // not attributes, so bail out and insert the remnants recursively
                this.insertFrameRange(componentId, newElement, 0, frames, descendantIndex, descendantsEndIndexExcl);
                break;
            }
        }
    };
    BrowserRenderer.prototype.insertComponent = function (parent, childIndex, frame) {
        var containerElement = LogicalElements_1.createAndInsertLogicalContainer(parent, childIndex);
        // All we have to do is associate the child component ID with its location. We don't actually
        // do any rendering here, because the diff for the child will appear later in the render batch.
        var childComponentId = RenderTreeFrame_1.renderTreeFrame.componentId(frame);
        this.attachComponentToElement(childComponentId, containerElement);
    };
    BrowserRenderer.prototype.insertText = function (parent, childIndex, textFrame) {
        var textContent = RenderTreeFrame_1.renderTreeFrame.textContent(textFrame);
        var newTextNode = document.createTextNode(textContent);
        LogicalElements_1.insertLogicalChild(newTextNode, parent, childIndex);
    };
    BrowserRenderer.prototype.applyAttribute = function (componentId, toDomElement, attributeFrame) {
        var attributeName = RenderTreeFrame_1.renderTreeFrame.attributeName(attributeFrame);
        var browserRendererId = this.browserRendererId;
        var eventHandlerId = RenderTreeFrame_1.renderTreeFrame.attributeEventHandlerId(attributeFrame);
        if (eventHandlerId) {
            var firstTwoChars = attributeName.substring(0, 2);
            var eventName = attributeName.substring(2);
            if (firstTwoChars !== 'on' || !eventName) {
                throw new Error("Attribute has nonzero event handler ID, but attribute name '" + attributeName + "' does not start with 'on'.");
            }
            this.eventDelegator.setListener(toDomElement, eventName, componentId, eventHandlerId);
            return;
        }
        // First see if we have special handling for this attribute
        if (!this.tryApplySpecialProperty(toDomElement, attributeName, attributeFrame)) {
            // If not, treat it as a regular string-valued attribute
            toDomElement.setAttribute(attributeName, RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame));
        }
    };
    BrowserRenderer.prototype.tryApplySpecialProperty = function (element, attributeName, attributeFrame) {
        switch (attributeName) {
            case 'value':
                return this.tryApplyValueProperty(element, attributeFrame);
            case 'checked':
                return this.tryApplyCheckedProperty(element, attributeFrame);
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyValueProperty = function (element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'value' property
        switch (element.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA': {
                var value = attributeFrame ? RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame) : null;
                element.value = value;
                if (element.tagName === 'SELECT') {
                    // <select> is special, in that anything we write to .value will be lost if there
                    // isn't yet a matching <option>. To maintain the expected behavior no matter the
                    // element insertion/update order, preserve the desired value separately so
                    // we can recover it when inserting any matching <option>.
                    element[selectValuePropname] = value;
                }
                return true;
            }
            case 'OPTION': {
                var value = attributeFrame ? RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame) : null;
                if (value) {
                    element.setAttribute('value', value);
                }
                else {
                    element.removeAttribute('value');
                }
                // See above for why we have this special handling for <select>/<option>
                var parentElement = element.parentElement;
                if (parentElement && (selectValuePropname in parentElement) && parentElement[selectValuePropname] === value) {
                    this.tryApplyValueProperty(parentElement, attributeFrame);
                    delete parentElement[selectValuePropname];
                }
                return true;
            }
            default:
                return false;
        }
    };
    BrowserRenderer.prototype.tryApplyCheckedProperty = function (element, attributeFrame) {
        // Certain elements have built-in behaviour for their 'checked' property
        if (element.tagName === 'INPUT') {
            var value = attributeFrame ? RenderTreeFrame_1.renderTreeFrame.attributeValue(attributeFrame) : null;
            element.checked = value !== null;
            return true;
        }
        else {
            return false;
        }
    };
    BrowserRenderer.prototype.insertFrameRange = function (componentId, parent, childIndex, frames, startIndex, endIndexExcl) {
        var origChildIndex = childIndex;
        for (var index = startIndex; index < endIndexExcl; index++) {
            var frame = RenderTreeFrame_1.getTreeFramePtr(frames, index);
            var numChildrenInserted = this.insertFrame(componentId, parent, childIndex, frames, frame, index);
            childIndex += numChildrenInserted;
            // Skip over any descendants, since they are already dealt with recursively
            index += countDescendantFrames(frame);
        }
        return (childIndex - origChildIndex); // Total number of children inserted
    };
    return BrowserRenderer;
}());
exports.BrowserRenderer = BrowserRenderer;
function countDescendantFrames(frame) {
    switch (RenderTreeFrame_1.renderTreeFrame.frameType(frame)) {
        // The following frame types have a subtree length. Other frames may use that memory slot
        // to mean something else, so we must not read it. We should consider having nominal subtypes
        // of RenderTreeFramePointer that prevent access to non-applicable fields.
        case RenderTreeFrame_1.FrameType.component:
        case RenderTreeFrame_1.FrameType.element:
        case RenderTreeFrame_1.FrameType.region:
            return RenderTreeFrame_1.renderTreeFrame.subtreeLength(frame) - 1;
        default:
            return 0;
    }
}
function raiseEvent(event, browserRendererId, componentId, eventHandlerId, eventArgs) {
    event.preventDefault();
    if (!raiseEventMethod) {
        raiseEventMethod = Environment_1.platform.findMethod('Microsoft.AspNetCore.Blazor.Browser', 'Microsoft.AspNetCore.Blazor.Browser.Rendering', 'BrowserRendererEventDispatcher', 'DispatchEvent');
    }
    var eventDescriptor = {
        BrowserRendererId: browserRendererId,
        ComponentId: componentId,
        EventHandlerId: eventHandlerId,
        EventArgsType: eventArgs.type
    };
    Environment_1.platform.callMethod(raiseEventMethod, null, [
        Environment_1.platform.toDotNetString(JSON.stringify(eventDescriptor)),
        Environment_1.platform.toDotNetString(JSON.stringify(eventArgs.data))
    ]);
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var renderTreeEditStructLength = 16;
function getRenderTreeEditPtr(renderTreeEdits, index) {
    return Environment_1.platform.getArrayEntryPtr(renderTreeEdits, index, renderTreeEditStructLength);
}
exports.getRenderTreeEditPtr = getRenderTreeEditPtr;
exports.renderTreeEdit = {
    // The properties and memory layout must be kept in sync with the .NET equivalent in RenderTreeEdit.cs
    type: function (edit) { return Environment_1.platform.readInt32Field(edit, 0); },
    siblingIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 4); },
    newTreeIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 8); },
    removedAttributeName: function (edit) { return Environment_1.platform.readStringField(edit, 12); },
};
var EditType;
(function (EditType) {
    EditType[EditType["prependFrame"] = 1] = "prependFrame";
    EditType[EditType["removeFrame"] = 2] = "removeFrame";
    EditType[EditType["setAttribute"] = 3] = "setAttribute";
    EditType[EditType["removeAttribute"] = 4] = "removeAttribute";
    EditType[EditType["updateText"] = 5] = "updateText";
    EditType[EditType["stepIn"] = 6] = "stepIn";
    EditType[EditType["stepOut"] = 7] = "stepOut";
})(EditType = exports.EditType || (exports.EditType = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var renderTreeFrameStructLength = 28;
// To minimise GC pressure, instead of instantiating a JS object to represent each tree frame,
// we work in terms of pointers to the structs on the .NET heap, and use static functions that
// know how to read property values from those structs.
function getTreeFramePtr(renderTreeEntries, index) {
    return Environment_1.platform.getArrayEntryPtr(renderTreeEntries, index, renderTreeFrameStructLength);
}
exports.getTreeFramePtr = getTreeFramePtr;
exports.renderTreeFrame = {
    // The properties and memory layout must be kept in sync with the .NET equivalent in RenderTreeFrame.cs
    frameType: function (frame) { return Environment_1.platform.readInt32Field(frame, 4); },
    subtreeLength: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    elementReferenceCaptureId: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    componentId: function (frame) { return Environment_1.platform.readInt32Field(frame, 12); },
    elementName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    textContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeValue: function (frame) { return Environment_1.platform.readStringField(frame, 24); },
    attributeEventHandlerId: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
};
var FrameType;
(function (FrameType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeFrameType.cs
    FrameType[FrameType["element"] = 1] = "element";
    FrameType[FrameType["text"] = 2] = "text";
    FrameType[FrameType["attribute"] = 3] = "attribute";
    FrameType[FrameType["component"] = 4] = "component";
    FrameType[FrameType["region"] = 5] = "region";
    FrameType[FrameType["elementReferenceCapture"] = 6] = "elementReferenceCapture";
})(FrameType = exports.FrameType || (exports.FrameType = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet_1 = __webpack_require__(15);
var nonBubblingEvents = toLookup([
    'abort', 'blur', 'change', 'error', 'focus', 'load', 'loadend', 'loadstart', 'mouseenter', 'mouseleave',
    'progress', 'reset', 'scroll', 'submit', 'unload', 'DOMNodeInsertedIntoDocument', 'DOMNodeRemovedFromDocument'
]);
// Responsible for adding/removing the eventInfo on an expando property on DOM elements, and
// calling an EventInfoStore that deals with registering/unregistering the underlying delegated
// event listeners as required (and also maps actual events back to the given callback).
var EventDelegator = /** @class */ (function () {
    function EventDelegator(onEvent) {
        this.onEvent = onEvent;
        var eventDelegatorId = ++EventDelegator.nextEventDelegatorId;
        this.eventsCollectionKey = "_blazorEvents_" + eventDelegatorId;
        this.eventInfoStore = new EventInfoStore(this.onGlobalEvent.bind(this));
    }
    EventDelegator.prototype.setListener = function (element, eventName, componentId, eventHandlerId) {
        // Ensure we have a place to store event info for this element
        var infoForElement = element[this.eventsCollectionKey];
        if (!infoForElement) {
            infoForElement = element[this.eventsCollectionKey] = {};
        }
        if (infoForElement.hasOwnProperty(eventName)) {
            // We can cheaply update the info on the existing object and don't need any other housekeeping
            var oldInfo = infoForElement[eventName];
            this.eventInfoStore.update(oldInfo.eventHandlerId, eventHandlerId);
        }
        else {
            // Go through the whole flow which might involve registering a new global handler
            var newInfo = { element: element, eventName: eventName, componentId: componentId, eventHandlerId: eventHandlerId };
            this.eventInfoStore.add(newInfo);
            infoForElement[eventName] = newInfo;
        }
    };
    EventDelegator.prototype.removeListener = function (eventHandlerId) {
        // This method gets called whenever the .NET-side code reports that a certain event handler
        // has been disposed. However we will already have disposed the info about that handler if
        // the eventHandlerId for the (element,eventName) pair was replaced during diff application.
        var info = this.eventInfoStore.remove(eventHandlerId);
        if (info) {
            // Looks like this event handler wasn't already disposed
            // Remove the associated data from the DOM element
            var element = info.element;
            if (element.hasOwnProperty(this.eventsCollectionKey)) {
                var elementEventInfos = element[this.eventsCollectionKey];
                delete elementEventInfos[info.eventName];
                if (Object.getOwnPropertyNames(elementEventInfos).length === 0) {
                    delete element[this.eventsCollectionKey];
                }
            }
        }
    };
    EventDelegator.prototype.onGlobalEvent = function (evt) {
        if (!(evt.target instanceof Element)) {
            return;
        }
        // Scan up the element hierarchy, looking for any matching registered event handlers
        var candidateElement = evt.target;
        var eventArgs = null; // Populate lazily
        var eventIsNonBubbling = nonBubblingEvents.hasOwnProperty(evt.type);
        while (candidateElement) {
            if (candidateElement.hasOwnProperty(this.eventsCollectionKey)) {
                var handlerInfos = candidateElement[this.eventsCollectionKey];
                if (handlerInfos.hasOwnProperty(evt.type)) {
                    // We are going to raise an event for this element, so prepare info needed by the .NET code
                    if (!eventArgs) {
                        eventArgs = EventForDotNet_1.EventForDotNet.fromDOMEvent(evt);
                    }
                    var handlerInfo = handlerInfos[evt.type];
                    this.onEvent(evt, handlerInfo.componentId, handlerInfo.eventHandlerId, eventArgs);
                }
            }
            candidateElement = eventIsNonBubbling ? null : candidateElement.parentElement;
        }
    };
    EventDelegator.nextEventDelegatorId = 0;
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
// Responsible for adding and removing the global listener when the number of listeners
// for a given event name changes between zero and nonzero
var EventInfoStore = /** @class */ (function () {
    function EventInfoStore(globalListener) {
        this.globalListener = globalListener;
        this.infosByEventHandlerId = {};
        this.countByEventName = {};
    }
    EventInfoStore.prototype.add = function (info) {
        if (this.infosByEventHandlerId[info.eventHandlerId]) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + info.eventHandlerId + " is already tracked");
        }
        this.infosByEventHandlerId[info.eventHandlerId] = info;
        var eventName = info.eventName;
        if (this.countByEventName.hasOwnProperty(eventName)) {
            this.countByEventName[eventName]++;
        }
        else {
            this.countByEventName[eventName] = 1;
            // To make delegation work with non-bubbling events, register a 'capture' listener.
            // We preserve the non-bubbling behavior by only dispatching such events to the targeted element.
            var useCapture = nonBubblingEvents.hasOwnProperty(eventName);
            document.addEventListener(eventName, this.globalListener, useCapture);
        }
    };
    EventInfoStore.prototype.update = function (oldEventHandlerId, newEventHandlerId) {
        if (this.infosByEventHandlerId.hasOwnProperty(newEventHandlerId)) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + newEventHandlerId + " is already tracked");
        }
        // Since we're just updating the event handler ID, there's no need to update the global counts
        var info = this.infosByEventHandlerId[oldEventHandlerId];
        delete this.infosByEventHandlerId[oldEventHandlerId];
        info.eventHandlerId = newEventHandlerId;
        this.infosByEventHandlerId[newEventHandlerId] = info;
    };
    EventInfoStore.prototype.remove = function (eventHandlerId) {
        var info = this.infosByEventHandlerId[eventHandlerId];
        if (info) {
            delete this.infosByEventHandlerId[eventHandlerId];
            var eventName = info.eventName;
            if (--this.countByEventName[eventName] === 0) {
                delete this.countByEventName[eventName];
                document.removeEventListener(eventName, this.globalListener);
            }
        }
        return info;
    };
    return EventInfoStore;
}());
function toLookup(items) {
    var result = {};
    items.forEach(function (value) { result[value] = true; });
    return result;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet = /** @class */ (function () {
    function EventForDotNet(type, data) {
        this.type = type;
        this.data = data;
    }
    EventForDotNet.fromDOMEvent = function (event) {
        var element = event.target;
        switch (event.type) {
            case 'change': {
                var targetIsCheckbox = isCheckbox(element);
                var newValue = targetIsCheckbox ? !!element['checked'] : element['value'];
                return new EventForDotNet('change', { Type: event.type, Value: newValue });
            }
            case 'copy':
            case 'cut':
            case 'paste':
                return new EventForDotNet('clipboard', { Type: event.type });
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
                return new EventForDotNet('drag', { Type: event.type });
            case 'error':
                return new EventForDotNet('error', { Type: event.type });
            case 'focus':
            case 'blur':
            case 'focusin':
            case 'focusout':
                return new EventForDotNet('focus', { Type: event.type });
            case 'keydown':
            case 'keyup':
            case 'keypress':
                return new EventForDotNet('keyboard', { Type: event.type, Key: event.key });
            case 'click':
            case 'mouseover':
            case 'mouseout':
            case 'mousemove':
            case 'mousedown':
            case 'mouseup':
            case 'dblclick':
                return new EventForDotNet('mouse', { Type: event.type });
            case 'contextmenu':
                return new EventForDotNet('pointer', { Type: event.type });
            case 'progress':
                return new EventForDotNet('progress', { Type: event.type });
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
                return new EventForDotNet('touch', { Type: event.type });
            case 'mousewheel':
                return new EventForDotNet('wheel', { Type: event.type });
            default:
                return new EventForDotNet('unknown', { Type: event.type });
        }
    };
    return EventForDotNet;
}());
exports.EventForDotNet = EventForDotNet;
function isCheckbox(element) {
    return element && element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  A LogicalElement plays the same role as an Element instance from the point of view of the
  API consumer. Inserting and removing logical elements updates the browser DOM just the same.

  The difference is that, unlike regular DOM mutation APIs, the LogicalElement APIs don't use
  the underlying DOM structure as the data storage for the element hierarchy. Instead, the
  LogicalElement APIs take care of tracking hierarchical relationships separately. The point
  of this is to permit a logical tree structure in which parent/child relationships don't
  have to be materialized in terms of DOM element parent/child relationships. And the reason
  why we want that is so that hierarchies of Blazor components can be tracked even when those
  components' render output need not be a single literal DOM element.

  Consumers of the API don't need to know about the implementation, but how it's done is:
  - Each LogicalElement is materialized in the DOM as either:
    - A Node instance, for actual Node instances inserted using 'insertLogicalChild' or
      for Element instances promoted to LogicalElement via 'toLogicalElement'
    - A Comment instance, for 'logical container' instances inserted using 'createAndInsertLogicalContainer'
  - Then, on that instance (i.e., the Node or Comment), we store an array of 'logical children'
    instances, e.g.,
      [firstChild, secondChild, thirdChild, ...]
    ... plus we store a reference to the 'logical parent' (if any)
  - The 'logical children' array means we can look up in O(1):
    - The number of logical children (not currently implemented because not required, but trivial)
    - The logical child at any given index
  - Whenever a logical child is added or removed, we update the parent's array of logical children
*/
Object.defineProperty(exports, "__esModule", { value: true });
var logicalChildrenPropname = createSymbolOrFallback('_blazorLogicalChildren');
var logicalParentPropname = createSymbolOrFallback('_blazorLogicalParent');
function toLogicalElement(element) {
    if (element.childNodes.length > 0) {
        throw new Error('New logical elements must start empty');
    }
    element[logicalChildrenPropname] = [];
    return element;
}
exports.toLogicalElement = toLogicalElement;
function createAndInsertLogicalContainer(parent, childIndex) {
    var containerElement = document.createComment('!');
    insertLogicalChild(containerElement, parent, childIndex);
    return containerElement;
}
exports.createAndInsertLogicalContainer = createAndInsertLogicalContainer;
function insertLogicalChild(child, parent, childIndex) {
    var childAsLogicalElement = child;
    if (child instanceof Comment) {
        var existingGrandchildren = getLogicalChildrenArray(childAsLogicalElement);
        if (existingGrandchildren && getLogicalChildrenArray(childAsLogicalElement).length > 0) {
            // There's nothing to stop us implementing support for this scenario, and it's not difficult
            // (after inserting 'child' itself, also iterate through its logical children and physically
            // put them as following-siblings in the DOM). However there's no scenario that requires it
            // presently, so if we did implement it there'd be no good way to have tests for it.
            throw new Error('Not implemented: inserting non-empty logical container');
        }
    }
    if (getLogicalParent(childAsLogicalElement)) {
        // Likewise, we could easily support this scenario too (in this 'if' block, just splice
        // out 'child' from the logical children array of its previous logical parent by using
        // Array.prototype.indexOf to determine its previous sibling index).
        // But again, since there's not currently any scenario that would use it, we would not
        // have any test coverage for such an implementation.
        throw new Error('Not implemented: moving existing logical children');
    }
    var newSiblings = getLogicalChildrenArray(parent);
    if (childIndex < newSiblings.length) {
        // Insert
        var nextSibling = newSiblings[childIndex];
        nextSibling.parentNode.insertBefore(child, nextSibling);
        newSiblings.splice(childIndex, 0, childAsLogicalElement);
    }
    else {
        // Append
        appendDomNode(child, parent);
        newSiblings.push(childAsLogicalElement);
    }
    childAsLogicalElement[logicalParentPropname] = parent;
    if (!(logicalChildrenPropname in childAsLogicalElement)) {
        childAsLogicalElement[logicalChildrenPropname] = [];
    }
}
exports.insertLogicalChild = insertLogicalChild;
function removeLogicalChild(parent, childIndex) {
    var childrenArray = getLogicalChildrenArray(parent);
    var childToRemove = childrenArray.splice(childIndex, 1)[0];
    // If it's a logical container, also remove its descendants
    if (childToRemove instanceof Comment) {
        var grandchildrenArray = getLogicalChildrenArray(childToRemove);
        while (grandchildrenArray.length > 0) {
            removeLogicalChild(childToRemove, 0);
        }
    }
    // Finally, remove the node itself
    var domNodeToRemove = childToRemove;
    domNodeToRemove.parentNode.removeChild(domNodeToRemove);
}
exports.removeLogicalChild = removeLogicalChild;
function getLogicalParent(element) {
    return element[logicalParentPropname] || null;
}
exports.getLogicalParent = getLogicalParent;
function getLogicalChild(parent, childIndex) {
    return getLogicalChildrenArray(parent)[childIndex];
}
exports.getLogicalChild = getLogicalChild;
function isSvgElement(element) {
    return getClosestDomElement(element).namespaceURI === 'http://www.w3.org/2000/svg';
}
exports.isSvgElement = isSvgElement;
function getLogicalChildrenArray(element) {
    return element[logicalChildrenPropname];
}
function getLogicalNextSibling(element) {
    var siblings = getLogicalChildrenArray(getLogicalParent(element));
    var siblingIndex = Array.prototype.indexOf.call(siblings, element);
    return siblings[siblingIndex + 1] || null;
}
function getClosestDomElement(logicalElement) {
    if (logicalElement instanceof Element) {
        return logicalElement;
    }
    else if (logicalElement instanceof Comment) {
        return logicalElement.parentNode;
    }
    else {
        throw new Error('Not a valid logical element');
    }
}
function appendDomNode(child, parent) {
    // This function only puts 'child' into the DOM in the right place relative to 'parent'
    // It does not update the logical children array of anything
    if (parent instanceof Element) {
        parent.appendChild(child);
    }
    else if (parent instanceof Comment) {
        var parentLogicalNextSibling = getLogicalNextSibling(parent);
        if (parentLogicalNextSibling) {
            // Since the parent has a logical next-sibling, its appended child goes right before that
            parentLogicalNextSibling.parentNode.insertBefore(child, parentLogicalNextSibling);
        }
        else {
            // Since the parent has no logical next-sibling, keep recursing upwards until we find
            // a logical ancestor that does have a next-sibling or is a physical element.
            appendDomNode(child, getLogicalParent(parent));
        }
    }
    else {
        // Should never happen
        throw new Error("Cannot append node because the parent is not a valid logical element. Parent: " + parent);
    }
}
function createSymbolOrFallback(fallback) {
    return typeof Symbol === 'function' ? Symbol() : fallback;
}
;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var RegisteredFunction_1 = __webpack_require__(1);
var Environment_1 = __webpack_require__(0);
var httpClientAssembly = 'Microsoft.AspNetCore.Blazor.Browser';
var httpClientNamespace = httpClientAssembly + ".Http";
var httpClientTypeName = 'BrowserHttpMessageHandler';
var httpClientFullTypeName = httpClientNamespace + "." + httpClientTypeName;
var receiveResponseMethod;
RegisteredFunction_1.registerFunction(httpClientFullTypeName + ".Send", function (id, method, requestUri, body, headersJson, fetchArgs) {
    sendAsync(id, method, requestUri, body, headersJson, fetchArgs);
});
function sendAsync(id, method, requestUri, body, headersJson, fetchArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseText, requestInit, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestInit = fetchArgs || {};
                    requestInit.method = method;
                    requestInit.body = body || undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    requestInit.headers = headersJson ? JSON.parse(headersJson) : undefined;
                    return [4 /*yield*/, fetch(requestUri, requestInit)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    responseText = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _a.sent();
                    dispatchErrorResponse(id, ex_1.toString());
                    return [2 /*return*/];
                case 5:
                    dispatchSuccessResponse(id, response, responseText);
                    return [2 /*return*/];
            }
        });
    });
}
function dispatchSuccessResponse(id, response, responseText) {
    var responseDescriptor = {
        StatusCode: response.status,
        Headers: []
    };
    response.headers.forEach(function (value, name) {
        responseDescriptor.Headers.push([name, value]);
    });
    dispatchResponse(id, Environment_1.platform.toDotNetString(JSON.stringify(responseDescriptor)), Environment_1.platform.toDotNetString(responseText), // TODO: Consider how to handle non-string responses
    /* errorMessage */ null);
}
function dispatchErrorResponse(id, errorMessage) {
    dispatchResponse(id, 
    /* responseDescriptor */ null, 
    /* responseText */ null, Environment_1.platform.toDotNetString(errorMessage));
}
function dispatchResponse(id, responseDescriptor, responseText, errorMessage) {
    if (!receiveResponseMethod) {
        receiveResponseMethod = Environment_1.platform.findMethod(httpClientAssembly, httpClientNamespace, httpClientTypeName, 'ReceiveResponse');
    }
    Environment_1.platform.callMethod(receiveResponseMethod, null, [
        Environment_1.platform.toDotNetString(id.toString()),
        responseDescriptor,
        responseText,
        errorMessage,
    ]);
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(0);
var RegisteredFunction_1 = __webpack_require__(1);
var UriHelper_1 = __webpack_require__(5);
if (typeof window !== 'undefined') {
    // When the library is loaded in a browser via a <script> element, make the
    // following APIs available in global scope for invocation from JS
    window['Blazor'] = {
        platform: Environment_1.platform,
        registerFunction: RegisteredFunction_1.registerFunction,
        navigateTo: UriHelper_1.navigateTo,
    };
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTU5NGY2ZGM4NTZhMzBhZGQ2ZWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Vudmlyb25tZW50LnRzIiwid2VicGFjazovLy8uL3NyYy9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUGxhdGZvcm0vRG90TmV0LnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvRWxlbWVudFJlZmVyZW5jZUNhcHR1cmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2VydmljZXMvVXJpSGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9Cb290LnRzIiwid2VicGFjazovLy8uL3NyYy9QbGF0Zm9ybS9Nb25vL01vbm9QbGF0Zm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSW50ZXJvcC9JbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvSW50ZXJvcC9JbnZva2VXaXRoSnNvbk1hcnNoYWxsaW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyQmF0Y2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9Ccm93c2VyUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9SZW5kZXJUcmVlRWRpdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL1JlbmRlclRyZWVGcmFtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyaW5nL0V2ZW50RGVsZWdhdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9SZW5kZXJpbmcvRXZlbnRGb3JEb3ROZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmluZy9Mb2dpY2FsRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlcnZpY2VzL0h0dHAudHMiLCJ3ZWJwYWNrOi8v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QkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFDM0IscUJBQXFCLEdBQUcsc0JBQVEsQ0FBQyxVQUFVLENBQ3pDLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLGlCQUFpQixDQUNsQixDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRTtRQUMvQyxzQkFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsa0JBQWtCO1FBQ2xCLFlBQVk7UUFDWixZQUFZO0tBQ2IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQzs7Ozs7Ozs7OztBQzVFRCwyQ0FBd0M7QUFDeEMsa0RBQWdFO0FBQ2hFLHlDQUFrRDtBQUVsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLDJFQUEyRTtJQUMzRSxrRUFBa0U7SUFDbEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1FBQ2pCLFFBQVE7UUFDUixnQkFBZ0I7UUFDaEIsVUFBVTtLQUNYLENBQUM7QUFDSixDQUFDIiwiZmlsZSI6ImJsYXpvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU1OTRmNmRjODU2YTMwYWRkNmViIiwiLy8gRXhwb3NlIGFuIGV4cG9ydCBjYWxsZWQgJ3BsYXRmb3JtJyBvZiB0aGUgaW50ZXJmYWNlIHR5cGUgJ1BsYXRmb3JtJyxcclxuLy8gc28gdGhhdCBjb25zdW1lcnMgY2FuIGJlIGFnbm9zdGljIGFib3V0IHdoaWNoIGltcGxlbWVudGF0aW9uIHRoZXkgdXNlLlxyXG4vLyBCYXNpYyBhbHRlcm5hdGl2ZSB0byBoYXZpbmcgYW4gYWN0dWFsIERJIGNvbnRhaW5lci5cclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgbW9ub1BsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybS9Nb25vL01vbm9QbGF0Zm9ybSc7XHJcbmV4cG9ydCBjb25zdCBwbGF0Zm9ybTogUGxhdGZvcm0gPSBtb25vUGxhdGZvcm07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9FbnZpcm9ubWVudC50cyIsImltcG9ydCB7IGludGVybmFsUmVnaXN0ZXJlZEZ1bmN0aW9ucyB9IGZyb20gJy4vSW50ZXJuYWxSZWdpc3RlcmVkRnVuY3Rpb24nO1xyXG5cclxuY29uc3QgcmVnaXN0ZXJlZEZ1bmN0aW9uczogeyBbaWRlbnRpZmllcjogc3RyaW5nXTogRnVuY3Rpb24gfCB1bmRlZmluZWQgfSA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRnVuY3Rpb24oaWRlbnRpZmllcjogc3RyaW5nLCBpbXBsZW1lbnRhdGlvbjogRnVuY3Rpb24pIHtcclxuICBpZiAoaW50ZXJuYWxSZWdpc3RlcmVkRnVuY3Rpb25zLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBmdW5jdGlvbiBpZGVudGlmaWVyICcke2lkZW50aWZpZXJ9JyBpcyByZXNlcnZlZCBhbmQgY2Fubm90IGJlIHJlZ2lzdGVyZWQuYCk7XHJcbiAgfVxyXG5cclxuICBpZiAocmVnaXN0ZXJlZEZ1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBBIGZ1bmN0aW9uIHdpdGggdGhlIGlkZW50aWZpZXIgJyR7aWRlbnRpZmllcn0nIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZC5gKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyZWRGdW5jdGlvbnNbaWRlbnRpZmllcl0gPSBpbXBsZW1lbnRhdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlZ2lzdGVyZWRGdW5jdGlvbihpZGVudGlmaWVyOiBzdHJpbmcpOiBGdW5jdGlvbiB7XHJcbiAgLy8gQnkgcHJpb3JpdGlzaW5nIHRoZSBpbnRlcm5hbCBvbmVzLCB3ZSBlbnN1cmUgeW91IGNhbid0IG92ZXJyaWRlIHRoZW1cclxuICBjb25zdCByZXN1bHQgPSBpbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbnNbaWRlbnRpZmllcl0gfHwgcmVnaXN0ZXJlZEZ1bmN0aW9uc1tpZGVudGlmaWVyXTtcclxuICBpZiAocmVzdWx0KSB7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHJlZ2lzdGVyZWQgZnVuY3Rpb24gd2l0aCBuYW1lICcke2lkZW50aWZpZXJ9Jy5gKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0ludGVyb3AvUmVnaXN0ZXJlZEZ1bmN0aW9uLnRzIiwiZXhwb3J0IGZ1bmN0aW9uIGdldEFzc2VtYmx5TmFtZUZyb21VcmwodXJsOiBzdHJpbmcpIHtcclxuICBjb25zdCBsYXN0U2VnbWVudCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuICBjb25zdCBxdWVyeVN0cmluZ1N0YXJ0UG9zID0gbGFzdFNlZ21lbnQuaW5kZXhPZignPycpO1xyXG4gIGNvbnN0IGZpbGVuYW1lID0gcXVlcnlTdHJpbmdTdGFydFBvcyA8IDAgPyBsYXN0U2VnbWVudCA6IGxhc3RTZWdtZW50LnN1YnN0cmluZygwLCBxdWVyeVN0cmluZ1N0YXJ0UG9zKTtcclxuICByZXR1cm4gZmlsZW5hbWUucmVwbGFjZSgvXFwuZGxsJC8sICcnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUGxhdGZvcm0vRG90TmV0LnRzIiwiZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIHJlZmVyZW5jZUNhcHR1cmVJZDogbnVtYmVyKSB7XHJcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoZ2V0Q2FwdHVyZUlkQXR0cmlidXRlTmFtZShyZWZlcmVuY2VDYXB0dXJlSWQpLCAnJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50QnlDYXB0dXJlSWQocmVmZXJlbmNlQ2FwdHVyZUlkOiBudW1iZXIpIHtcclxuICBjb25zdCBzZWxlY3RvciA9IGBbJHtnZXRDYXB0dXJlSWRBdHRyaWJ1dGVOYW1lKHJlZmVyZW5jZUNhcHR1cmVJZCl9XWA7XHJcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDYXB0dXJlSWRBdHRyaWJ1dGVOYW1lKHJlZmVyZW5jZUNhcHR1cmVJZDogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIGBfYmxfJHtyZWZlcmVuY2VDYXB0dXJlSWR9YDtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvRWxlbWVudFJlZmVyZW5jZUNhcHR1cmUudHMiLCJpbXBvcnQgeyBTeXN0ZW1fT2JqZWN0LCBTeXN0ZW1fU3RyaW5nLCBTeXN0ZW1fQXJyYXksIE1ldGhvZEhhbmRsZSwgUG9pbnRlciB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IHJlbmRlckJhdGNoIGFzIHJlbmRlckJhdGNoU3RydWN0LCBhcnJheVJhbmdlLCBhcnJheVNlZ21lbnQsIHJlbmRlclRyZWVEaWZmU3RydWN0TGVuZ3RoLCByZW5kZXJUcmVlRGlmZiwgUmVuZGVyQmF0Y2hQb2ludGVyLCBSZW5kZXJUcmVlRGlmZlBvaW50ZXIgfSBmcm9tICcuL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgQnJvd3NlclJlbmRlcmVyIH0gZnJvbSAnLi9Ccm93c2VyUmVuZGVyZXInO1xyXG5cclxudHlwZSBCcm93c2VyUmVuZGVyZXJSZWdpc3RyeSA9IHsgW2Jyb3dzZXJSZW5kZXJlcklkOiBudW1iZXJdOiBCcm93c2VyUmVuZGVyZXIgfTtcclxuY29uc3QgYnJvd3NlclJlbmRlcmVyczogQnJvd3NlclJlbmRlcmVyUmVnaXN0cnkgPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsIGVsZW1lbnRTZWxlY3RvcjogU3lzdGVtX1N0cmluZywgY29tcG9uZW50SWQ6IG51bWJlcikge1xyXG4gIGNvbnN0IGVsZW1lbnRTZWxlY3RvckpzID0gcGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKGVsZW1lbnRTZWxlY3Rvcik7XHJcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudFNlbGVjdG9ySnMpO1xyXG4gIGlmICghZWxlbWVudCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhbnkgZWxlbWVudCBtYXRjaGluZyBzZWxlY3RvciAnJHtlbGVtZW50U2VsZWN0b3JKc30nLmApO1xyXG4gIH1cclxuXHJcbiAgbGV0IGJyb3dzZXJSZW5kZXJlciA9IGJyb3dzZXJSZW5kZXJlcnNbYnJvd3NlclJlbmRlcmVySWRdO1xyXG4gIGlmICghYnJvd3NlclJlbmRlcmVyKSB7XHJcbiAgICBicm93c2VyUmVuZGVyZXIgPSBicm93c2VyUmVuZGVyZXJzW2Jyb3dzZXJSZW5kZXJlcklkXSA9IG5ldyBCcm93c2VyUmVuZGVyZXIoYnJvd3NlclJlbmRlcmVySWQpO1xyXG4gIH1cclxuICBjbGVhckVsZW1lbnQoZWxlbWVudCk7XHJcbiAgYnJvd3NlclJlbmRlcmVyLmF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQoY29tcG9uZW50SWQsIGVsZW1lbnQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQmF0Y2goYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlciwgYmF0Y2g6IFJlbmRlckJhdGNoUG9pbnRlcikge1xyXG4gIGNvbnN0IGJyb3dzZXJSZW5kZXJlciA9IGJyb3dzZXJSZW5kZXJlcnNbYnJvd3NlclJlbmRlcmVySWRdO1xyXG4gIGlmICghYnJvd3NlclJlbmRlcmVyKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIGJyb3dzZXIgcmVuZGVyZXIgd2l0aCBJRCAke2Jyb3dzZXJSZW5kZXJlcklkfS5gKTtcclxuICB9XHJcbiAgXHJcbiAgY29uc3QgdXBkYXRlZENvbXBvbmVudHMgPSByZW5kZXJCYXRjaFN0cnVjdC51cGRhdGVkQ29tcG9uZW50cyhiYXRjaCk7XHJcbiAgY29uc3QgdXBkYXRlZENvbXBvbmVudHNMZW5ndGggPSBhcnJheVJhbmdlLmNvdW50KHVwZGF0ZWRDb21wb25lbnRzKTtcclxuICBjb25zdCB1cGRhdGVkQ29tcG9uZW50c0FycmF5ID0gYXJyYXlSYW5nZS5hcnJheSh1cGRhdGVkQ29tcG9uZW50cyk7XHJcbiAgY29uc3QgcmVmZXJlbmNlRnJhbWVzU3RydWN0ID0gcmVuZGVyQmF0Y2hTdHJ1Y3QucmVmZXJlbmNlRnJhbWVzKGJhdGNoKTtcclxuICBjb25zdCByZWZlcmVuY2VGcmFtZXMgPSBhcnJheVJhbmdlLmFycmF5KHJlZmVyZW5jZUZyYW1lc1N0cnVjdCk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZENvbXBvbmVudHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZGlmZiA9IHBsYXRmb3JtLmdldEFycmF5RW50cnlQdHIodXBkYXRlZENvbXBvbmVudHNBcnJheSwgaSwgcmVuZGVyVHJlZURpZmZTdHJ1Y3RMZW5ndGgpO1xyXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSByZW5kZXJUcmVlRGlmZi5jb21wb25lbnRJZChkaWZmKTtcclxuXHJcbiAgICBjb25zdCBlZGl0c0FycmF5U2VnbWVudCA9IHJlbmRlclRyZWVEaWZmLmVkaXRzKGRpZmYpO1xyXG4gICAgY29uc3QgZWRpdHMgPSBhcnJheVNlZ21lbnQuYXJyYXkoZWRpdHNBcnJheVNlZ21lbnQpO1xyXG4gICAgY29uc3QgZWRpdHNPZmZzZXQgPSBhcnJheVNlZ21lbnQub2Zmc2V0KGVkaXRzQXJyYXlTZWdtZW50KTtcclxuICAgIGNvbnN0IGVkaXRzTGVuZ3RoID0gYXJyYXlTZWdtZW50LmNvdW50KGVkaXRzQXJyYXlTZWdtZW50KTtcclxuXHJcbiAgICBicm93c2VyUmVuZGVyZXIudXBkYXRlQ29tcG9uZW50KGNvbXBvbmVudElkLCBlZGl0cywgZWRpdHNPZmZzZXQsIGVkaXRzTGVuZ3RoLCByZWZlcmVuY2VGcmFtZXMpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGlzcG9zZWRDb21wb25lbnRJZHMgPSByZW5kZXJCYXRjaFN0cnVjdC5kaXNwb3NlZENvbXBvbmVudElkcyhiYXRjaCk7XHJcbiAgY29uc3QgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGggPSBhcnJheVJhbmdlLmNvdW50KGRpc3Bvc2VkQ29tcG9uZW50SWRzKTtcclxuICBjb25zdCBkaXNwb3NlZENvbXBvbmVudElkc0FycmF5ID0gYXJyYXlSYW5nZS5hcnJheShkaXNwb3NlZENvbXBvbmVudElkcyk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXNwb3NlZENvbXBvbmVudElkc0xlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBjb21wb25lbnRJZFB0ciA9IHBsYXRmb3JtLmdldEFycmF5RW50cnlQdHIoZGlzcG9zZWRDb21wb25lbnRJZHNBcnJheSwgaSwgNCk7XHJcbiAgICBjb25zdCBjb21wb25lbnRJZCA9IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGNvbXBvbmVudElkUHRyKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlQ29tcG9uZW50KGNvbXBvbmVudElkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzID0gcmVuZGVyQmF0Y2hTdHJ1Y3QuZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMoYmF0Y2gpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzTGVuZ3RoID0gYXJyYXlSYW5nZS5jb3VudChkaXNwb3NlZEV2ZW50SGFuZGxlcklkcyk7XHJcbiAgY29uc3QgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNBcnJheSA9IGFycmF5UmFuZ2UuYXJyYXkoZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVySWRQdHIgPSBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzQXJyYXksIGksIDQpO1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVySWQgPSBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChldmVudEhhbmRsZXJJZFB0cik7XHJcbiAgICBicm93c2VyUmVuZGVyZXIuZGlzcG9zZUV2ZW50SGFuZGxlcihldmVudEhhbmRsZXJJZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xyXG4gIGxldCBjaGlsZE5vZGU6IE5vZGUgfCBudWxsO1xyXG4gIHdoaWxlIChjaGlsZE5vZGUgPSBlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2RlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmluZy9SZW5kZXJlci50cyIsImltcG9ydCB7IHJlZ2lzdGVyRnVuY3Rpb24gfSBmcm9tICcuLi9JbnRlcm9wL1JlZ2lzdGVyZWRGdW5jdGlvbic7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBNZXRob2RIYW5kbGUsIFN5c3RlbV9TdHJpbmcgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmNvbnN0IHJlZ2lzdGVyZWRGdW5jdGlvblByZWZpeCA9ICdNaWNyb3NvZnQuQXNwTmV0Q29yZS5CbGF6b3IuQnJvd3Nlci5TZXJ2aWNlcy5Ccm93c2VyVXJpSGVscGVyJztcclxubGV0IG5vdGlmeUxvY2F0aW9uQ2hhbmdlZE1ldGhvZDogTWV0aG9kSGFuZGxlO1xyXG5sZXQgaGFzUmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXJzID0gZmFsc2U7XHJcblxyXG5yZWdpc3RlckZ1bmN0aW9uKGAke3JlZ2lzdGVyZWRGdW5jdGlvblByZWZpeH0uZ2V0TG9jYXRpb25IcmVmYCxcclxuICAoKSA9PiBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhsb2NhdGlvbi5ocmVmKSk7XHJcblxyXG5yZWdpc3RlckZ1bmN0aW9uKGAke3JlZ2lzdGVyZWRGdW5jdGlvblByZWZpeH0uZ2V0QmFzZVVSSWAsXHJcbiAgKCkgPT4gZG9jdW1lbnQuYmFzZVVSSSA/IHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGRvY3VtZW50LmJhc2VVUkkpIDogbnVsbCk7XHJcblxyXG5yZWdpc3RlckZ1bmN0aW9uKGAke3JlZ2lzdGVyZWRGdW5jdGlvblByZWZpeH0uZW5hYmxlTmF2aWdhdGlvbkludGVyY2VwdGlvbmAsICgpID0+IHtcclxuICBpZiAoaGFzUmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXJzKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGhhc1JlZ2lzdGVyZWRFdmVudExpc3RlbmVycyA9IHRydWU7XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgLy8gSW50ZXJjZXB0IGNsaWNrcyBvbiBhbGwgPGE+IGVsZW1lbnRzIHdoZXJlIHRoZSBocmVmIGlzIHdpdGhpbiB0aGUgPGJhc2UgaHJlZj4gVVJJIHNwYWNlXHJcbiAgICBjb25zdCBhbmNob3JUYXJnZXQgPSBmaW5kQ2xvc2VzdEFuY2VzdG9yKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50IHwgbnVsbCwgJ0EnKTtcclxuICAgIGlmIChhbmNob3JUYXJnZXQpIHtcclxuICAgICAgY29uc3QgaHJlZiA9IGFuY2hvclRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgICAgaWYgKGlzV2l0aGluQmFzZVVyaVNwYWNlKHRvQWJzb2x1dGVVcmkoaHJlZikpKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBwZXJmb3JtSW50ZXJuYWxOYXZpZ2F0aW9uKGhyZWYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGhhbmRsZUludGVybmFsTmF2aWdhdGlvbik7XHJcbn0pO1xyXG5cclxucmVnaXN0ZXJGdW5jdGlvbihgJHtyZWdpc3RlcmVkRnVuY3Rpb25QcmVmaXh9Lm5hdmlnYXRlVG9gLCAodXJpRG90TmV0U3RyaW5nOiBTeXN0ZW1fU3RyaW5nKSA9PiB7XHJcbiAgbmF2aWdhdGVUbyhwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcodXJpRG90TmV0U3RyaW5nKSk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRlVG8odXJpOiBzdHJpbmcpIHtcclxuICBpZiAoaXNXaXRoaW5CYXNlVXJpU3BhY2UodG9BYnNvbHV0ZVVyaSh1cmkpKSkge1xyXG4gICAgcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbih1cmkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gdXJpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihocmVmOiBzdHJpbmcpIHtcclxuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAvKiBpZ25vcmVkIHRpdGxlICovICcnLCBocmVmKTtcclxuICBoYW5kbGVJbnRlcm5hbE5hdmlnYXRpb24oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlSW50ZXJuYWxOYXZpZ2F0aW9uKCkge1xyXG4gIGlmICghbm90aWZ5TG9jYXRpb25DaGFuZ2VkTWV0aG9kKSB7XHJcbiAgICBub3RpZnlMb2NhdGlvbkNoYW5nZWRNZXRob2QgPSBwbGF0Zm9ybS5maW5kTWV0aG9kKFxyXG4gICAgICAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXInLFxyXG4gICAgICAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXIuU2VydmljZXMnLFxyXG4gICAgICAnQnJvd3NlclVyaUhlbHBlcicsXHJcbiAgICAgICdOb3RpZnlMb2NhdGlvbkNoYW5nZWQnXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcGxhdGZvcm0uY2FsbE1ldGhvZChub3RpZnlMb2NhdGlvbkNoYW5nZWRNZXRob2QsIG51bGwsIFtcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGxvY2F0aW9uLmhyZWYpXHJcbiAgXSk7XHJcbn1cclxuXHJcbmxldCB0ZXN0QW5jaG9yOiBIVE1MQW5jaG9yRWxlbWVudDtcclxuZnVuY3Rpb24gdG9BYnNvbHV0ZVVyaShyZWxhdGl2ZVVyaTogc3RyaW5nKSB7XHJcbiAgdGVzdEFuY2hvciA9IHRlc3RBbmNob3IgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gIHRlc3RBbmNob3IuaHJlZiA9IHJlbGF0aXZlVXJpO1xyXG4gIHJldHVybiB0ZXN0QW5jaG9yLmhyZWY7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRDbG9zZXN0QW5jZXN0b3IoZWxlbWVudDogRWxlbWVudCB8IG51bGwsIHRhZ05hbWU6IHN0cmluZykge1xyXG4gIHJldHVybiAhZWxlbWVudFxyXG4gICAgPyBudWxsXHJcbiAgICA6IGVsZW1lbnQudGFnTmFtZSA9PT0gdGFnTmFtZVxyXG4gICAgICA/IGVsZW1lbnRcclxuICAgICAgOiBmaW5kQ2xvc2VzdEFuY2VzdG9yKGVsZW1lbnQucGFyZW50RWxlbWVudCwgdGFnTmFtZSlcclxufVxyXG5cclxuZnVuY3Rpb24gaXNXaXRoaW5CYXNlVXJpU3BhY2UoaHJlZjogc3RyaW5nKSB7XHJcbiAgY29uc3QgYmFzZVVyaVByZWZpeFdpdGhUcmFpbGluZ1NsYXNoID0gdG9CYXNlVXJpUHJlZml4V2l0aFRyYWlsaW5nU2xhc2goZG9jdW1lbnQuYmFzZVVSSSEpOyAvLyBUT0RPOiBNaWdodCBiYXNlVVJJIHJlYWxseSBiZSBudWxsP1xyXG4gIHJldHVybiBocmVmLnN0YXJ0c1dpdGgoYmFzZVVyaVByZWZpeFdpdGhUcmFpbGluZ1NsYXNoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9CYXNlVXJpUHJlZml4V2l0aFRyYWlsaW5nU2xhc2goYmFzZVVyaTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIGJhc2VVcmkuc3Vic3RyKDAsIGJhc2VVcmkubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TZXJ2aWNlcy9VcmlIZWxwZXIudHMiLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBnZXRBc3NlbWJseU5hbWVGcm9tVXJsIH0gZnJvbSAnLi9QbGF0Zm9ybS9Eb3ROZXQnO1xyXG5pbXBvcnQgJy4vUmVuZGVyaW5nL1JlbmRlcmVyJztcclxuaW1wb3J0ICcuL1NlcnZpY2VzL0h0dHAnO1xyXG5pbXBvcnQgJy4vU2VydmljZXMvVXJpSGVscGVyJztcclxuaW1wb3J0ICcuL0dsb2JhbEV4cG9ydHMnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gYm9vdCgpIHtcclxuICAvLyBSZWFkIHN0YXJ0dXAgY29uZmlnIGZyb20gdGhlIDxzY3JpcHQ+IGVsZW1lbnQgdGhhdCdzIGltcG9ydGluZyB0aGlzIGZpbGVcclxuICBjb25zdCBhbGxTY3JpcHRFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcclxuICBjb25zdCB0aGlzU2NyaXB0RWxlbSA9IChkb2N1bWVudC5jdXJyZW50U2NyaXB0IHx8IGFsbFNjcmlwdEVsZW1zW2FsbFNjcmlwdEVsZW1zLmxlbmd0aCAtIDFdKSBhcyBIVE1MU2NyaXB0RWxlbWVudDtcclxuICBjb25zdCBpc0xpbmtlckVuYWJsZWQgPSB0aGlzU2NyaXB0RWxlbS5nZXRBdHRyaWJ1dGUoJ2xpbmtlci1lbmFibGVkJykgPT09ICd0cnVlJztcclxuICBjb25zdCBlbnRyeVBvaW50RGxsID0gZ2V0UmVxdWlyZWRCb290U2NyaXB0QXR0cmlidXRlKHRoaXNTY3JpcHRFbGVtLCAnbWFpbicpO1xyXG4gIGNvbnN0IGVudHJ5UG9pbnRNZXRob2QgPSBnZXRSZXF1aXJlZEJvb3RTY3JpcHRBdHRyaWJ1dGUodGhpc1NjcmlwdEVsZW0sICdlbnRyeXBvaW50Jyk7XHJcbiAgY29uc3QgZW50cnlQb2ludEFzc2VtYmx5TmFtZSA9IGdldEFzc2VtYmx5TmFtZUZyb21VcmwoZW50cnlQb2ludERsbCk7XHJcbiAgY29uc3QgcmVmZXJlbmNlQXNzZW1ibGllc0NvbW1hU2VwYXJhdGVkID0gdGhpc1NjcmlwdEVsZW0uZ2V0QXR0cmlidXRlKCdyZWZlcmVuY2VzJykgfHwgJyc7XHJcbiAgY29uc3QgcmVmZXJlbmNlQXNzZW1ibGllcyA9IHJlZmVyZW5jZUFzc2VtYmxpZXNDb21tYVNlcGFyYXRlZFxyXG4gICAgLnNwbGl0KCcsJylcclxuICAgIC5tYXAocyA9PiBzLnRyaW0oKSlcclxuICAgIC5maWx0ZXIocyA9PiAhIXMpO1xyXG5cclxuICBpZiAoIWlzTGlua2VyRW5hYmxlZCkge1xyXG4gICAgY29uc29sZS5pbmZvKCdCbGF6b3IgaXMgcnVubmluZyBpbiBkZXYgbW9kZSB3aXRob3V0IElMIHN0cmlwcGluZy4gVG8gbWFrZSB0aGUgYnVuZGxlIHNpemUgc2lnbmlmaWNhbnRseSBzbWFsbGVyLCBwdWJsaXNoIHRoZSBhcHBsaWNhdGlvbiBvciBzZWUgaHR0cHM6Ly9nby5taWNyb3NvZnQuY29tL2Z3bGluay8/bGlua2lkPTg3MDQxNCcpO1xyXG4gIH1cclxuXHJcbiAgLy8gRGV0ZXJtaW5lIHRoZSBVUkxzIG9mIHRoZSBhc3NlbWJsaWVzIHdlIHdhbnQgdG8gbG9hZFxyXG4gIGNvbnN0IGxvYWRBc3NlbWJseVVybHMgPSBbZW50cnlQb2ludERsbF1cclxuICAgIC5jb25jYXQocmVmZXJlbmNlQXNzZW1ibGllcylcclxuICAgIC5tYXAoZmlsZW5hbWUgPT4gYF9mcmFtZXdvcmsvX2Jpbi8ke2ZpbGVuYW1lfWApO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgcGxhdGZvcm0uc3RhcnQobG9hZEFzc2VtYmx5VXJscyk7XHJcbiAgfSBjYXRjaCAoZXgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHN0YXJ0IHBsYXRmb3JtLiBSZWFzb246ICR7ZXh9YCk7XHJcbiAgfVxyXG5cclxuICAvLyBTdGFydCB1cCB0aGUgYXBwbGljYXRpb25cclxuICBwbGF0Zm9ybS5jYWxsRW50cnlQb2ludChlbnRyeVBvaW50QXNzZW1ibHlOYW1lLCBlbnRyeVBvaW50TWV0aG9kLCBbXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFJlcXVpcmVkQm9vdFNjcmlwdEF0dHJpYnV0ZShlbGVtOiBIVE1MU2NyaXB0RWxlbWVudCwgYXR0cmlidXRlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCByZXN1bHQgPSBlbGVtLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICBpZiAoIXJlc3VsdCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIFwiJHthdHRyaWJ1dGVOYW1lfVwiIGF0dHJpYnV0ZSBvbiBCbGF6b3Igc2NyaXB0IHRhZy5gKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuYm9vdCgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQm9vdC50cyIsImltcG9ydCB7IE1ldGhvZEhhbmRsZSwgU3lzdGVtX09iamVjdCwgU3lzdGVtX1N0cmluZywgU3lzdGVtX0FycmF5LCBQb2ludGVyLCBQbGF0Zm9ybSB9IGZyb20gJy4uL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCB9IGZyb20gJy4uL0RvdE5ldCc7XHJcbmltcG9ydCB7IGdldFJlZ2lzdGVyZWRGdW5jdGlvbiB9IGZyb20gJy4uLy4uL0ludGVyb3AvUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuXHJcbmNvbnN0IGFzc2VtYmx5SGFuZGxlQ2FjaGU6IHsgW2Fzc2VtYmx5TmFtZTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuY29uc3QgdHlwZUhhbmRsZUNhY2hlOiB7IFtmdWxseVF1YWxpZmllZFR5cGVOYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG5jb25zdCBtZXRob2RIYW5kbGVDYWNoZTogeyBbZnVsbHlRdWFsaWZpZWRNZXRob2ROYW1lOiBzdHJpbmddOiBNZXRob2RIYW5kbGUgfSA9IHt9O1xyXG5cclxubGV0IGFzc2VtYmx5X2xvYWQ6IChhc3NlbWJseU5hbWU6IHN0cmluZykgPT4gbnVtYmVyO1xyXG5sZXQgZmluZF9jbGFzczogKGFzc2VtYmx5SGFuZGxlOiBudW1iZXIsIG5hbWVzcGFjZTogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZykgPT4gbnVtYmVyO1xyXG5sZXQgZmluZF9tZXRob2Q6ICh0eXBlSGFuZGxlOiBudW1iZXIsIG1ldGhvZE5hbWU6IHN0cmluZywgdW5rbm93bkFyZzogbnVtYmVyKSA9PiBNZXRob2RIYW5kbGU7XHJcbmxldCBpbnZva2VfbWV0aG9kOiAobWV0aG9kOiBNZXRob2RIYW5kbGUsIHRhcmdldDogU3lzdGVtX09iamVjdCwgYXJnc0FycmF5UHRyOiBudW1iZXIsIGV4Y2VwdGlvbkZsYWdJbnRQdHI6IG51bWJlcikgPT4gU3lzdGVtX09iamVjdDtcclxubGV0IG1vbm9fc3RyaW5nX2dldF91dGY4OiAobWFuYWdlZFN0cmluZzogU3lzdGVtX1N0cmluZykgPT4gTW9uby5VdGY4UHRyO1xyXG5sZXQgbW9ub19zdHJpbmc6IChqc1N0cmluZzogc3RyaW5nKSA9PiBTeXN0ZW1fU3RyaW5nO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1vbm9QbGF0Zm9ybTogUGxhdGZvcm0gPSB7XHJcbiAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KGxvYWRBc3NlbWJseVVybHM6IHN0cmluZ1tdKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBtb25vLmpzIGFzc3VtZXMgdGhlIGV4aXN0ZW5jZSBvZiB0aGlzXHJcbiAgICAgIHdpbmRvd1snQnJvd3NlciddID0ge1xyXG4gICAgICAgIGluaXQ6ICgpID0+IHsgfSxcclxuICAgICAgICBhc3luY0xvYWQ6IGFzeW5jTG9hZFxyXG4gICAgICB9O1xyXG4gICAgICAvLyBFbXNjcmlwdGVuIHdvcmtzIGJ5IGV4cGVjdGluZyB0aGUgbW9kdWxlIGNvbmZpZyB0byBiZSBhIGdsb2JhbFxyXG4gICAgICB3aW5kb3dbJ01vZHVsZSddID0gY3JlYXRlRW1zY3JpcHRlbk1vZHVsZUluc3RhbmNlKGxvYWRBc3NlbWJseVVybHMsIHJlc29sdmUsIHJlamVjdCk7XHJcblxyXG4gICAgICBhZGRTY3JpcHRUYWdzVG9Eb2N1bWVudCgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgZmluZE1ldGhvZDogZmluZE1ldGhvZCxcclxuXHJcbiAgY2FsbEVudHJ5UG9pbnQ6IGZ1bmN0aW9uIGNhbGxFbnRyeVBvaW50KGFzc2VtYmx5TmFtZTogc3RyaW5nLCBlbnRyeXBvaW50TWV0aG9kOiBzdHJpbmcsIGFyZ3M6IFN5c3RlbV9PYmplY3RbXSk6IHZvaWQge1xyXG4gICAgLy8gUGFyc2UgdGhlIGVudHJ5cG9pbnRNZXRob2QsIHdoaWNoIGlzIG9mIHRoZSBmb3JtIE15QXBwLk15TmFtZXNwYWNlLk15VHlwZU5hbWU6Ok15TWV0aG9kTmFtZVxyXG4gICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IHN1cHBvcnQgc3BlY2lmeWluZyBhIG1ldGhvZCBvdmVybG9hZCwgc28gaXQgaGFzIHRvIGJlIHVuaXF1ZVxyXG4gICAgY29uc3QgZW50cnlwb2ludFNlZ21lbnRzID0gZW50cnlwb2ludE1ldGhvZC5zcGxpdCgnOjonKTtcclxuICAgIGlmIChlbnRyeXBvaW50U2VnbWVudHMubGVuZ3RoICE9IDIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgZW50cnkgcG9pbnQgbWV0aG9kIG5hbWU7IGNvdWxkIG5vdCByZXNvbHZlIGNsYXNzIG5hbWUgYW5kIG1ldGhvZCBuYW1lLicpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdHlwZUZ1bGxOYW1lID0gZW50cnlwb2ludFNlZ21lbnRzWzBdO1xyXG4gICAgY29uc3QgbWV0aG9kTmFtZSA9IGVudHJ5cG9pbnRTZWdtZW50c1sxXTtcclxuICAgIGNvbnN0IGxhc3REb3QgPSB0eXBlRnVsbE5hbWUubGFzdEluZGV4T2YoJy4nKTtcclxuICAgIGNvbnN0IG5hbWVzcGFjZSA9IGxhc3REb3QgPiAtMSA/IHR5cGVGdWxsTmFtZS5zdWJzdHJpbmcoMCwgbGFzdERvdCkgOiAnJztcclxuICAgIGNvbnN0IHR5cGVTaG9ydE5hbWUgPSBsYXN0RG90ID4gLTEgPyB0eXBlRnVsbE5hbWUuc3Vic3RyaW5nKGxhc3REb3QgKyAxKSA6IHR5cGVGdWxsTmFtZTtcclxuXHJcbiAgICBjb25zdCBlbnRyeVBvaW50TWV0aG9kSGFuZGxlID0gbW9ub1BsYXRmb3JtLmZpbmRNZXRob2QoYXNzZW1ibHlOYW1lLCBuYW1lc3BhY2UsIHR5cGVTaG9ydE5hbWUsIG1ldGhvZE5hbWUpO1xyXG4gICAgbW9ub1BsYXRmb3JtLmNhbGxNZXRob2QoZW50cnlQb2ludE1ldGhvZEhhbmRsZSwgbnVsbCwgYXJncyk7XHJcbiAgfSxcclxuXHJcbiAgY2FsbE1ldGhvZDogZnVuY3Rpb24gY2FsbE1ldGhvZChtZXRob2Q6IE1ldGhvZEhhbmRsZSwgdGFyZ2V0OiBTeXN0ZW1fT2JqZWN0LCBhcmdzOiBTeXN0ZW1fT2JqZWN0W10pOiBTeXN0ZW1fT2JqZWN0IHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA+IDQpIHtcclxuICAgICAgLy8gSG9wZWZ1bGx5IHRoaXMgcmVzdHJpY3Rpb24gY2FuIGJlIGVhc2VkIHNvb24sIGJ1dCBmb3Igbm93IG1ha2UgaXQgY2xlYXIgd2hhdCdzIGdvaW5nIG9uXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ3VycmVudGx5LCBNb25vUGxhdGZvcm0gc3VwcG9ydHMgcGFzc2luZyBhIG1heGltdW0gb2YgNCBhcmd1bWVudHMgZnJvbSBKUyB0byAuTkVULiBZb3UgdHJpZWQgdG8gcGFzcyAke2FyZ3MubGVuZ3RofS5gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdGFjayA9IE1vZHVsZS5zdGFja1NhdmUoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBhcmdzQnVmZmVyID0gTW9kdWxlLnN0YWNrQWxsb2MoYXJncy5sZW5ndGgpO1xyXG4gICAgICBjb25zdCBleGNlcHRpb25GbGFnTWFuYWdlZEludCA9IE1vZHVsZS5zdGFja0FsbG9jKDQpO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBNb2R1bGUuc2V0VmFsdWUoYXJnc0J1ZmZlciArIGkgKiA0LCBhcmdzW2ldLCAnaTMyJyk7XHJcbiAgICAgIH1cclxuICAgICAgTW9kdWxlLnNldFZhbHVlKGV4Y2VwdGlvbkZsYWdNYW5hZ2VkSW50LCAwLCAnaTMyJyk7XHJcblxyXG4gICAgICBjb25zdCByZXMgPSBpbnZva2VfbWV0aG9kKG1ldGhvZCwgdGFyZ2V0LCBhcmdzQnVmZmVyLCBleGNlcHRpb25GbGFnTWFuYWdlZEludCk7XHJcblxyXG4gICAgICBpZiAoTW9kdWxlLmdldFZhbHVlKGV4Y2VwdGlvbkZsYWdNYW5hZ2VkSW50LCAnaTMyJykgIT09IDApIHtcclxuICAgICAgICAvLyBJZiB0aGUgZXhjZXB0aW9uIGZsYWcgaXMgc2V0LCB0aGUgcmV0dXJuZWQgdmFsdWUgaXMgZXhjZXB0aW9uLlRvU3RyaW5nKClcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobW9ub1BsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyg8U3lzdGVtX1N0cmluZz5yZXMpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIE1vZHVsZS5zdGFja1Jlc3RvcmUoc3RhY2spO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHRvSmF2YVNjcmlwdFN0cmluZzogZnVuY3Rpb24gdG9KYXZhU2NyaXB0U3RyaW5nKG1hbmFnZWRTdHJpbmc6IFN5c3RlbV9TdHJpbmcpIHtcclxuICAgIC8vIENvbW1lbnRzIGZyb20gb3JpZ2luYWwgTW9ubyBzYW1wbGU6XHJcbiAgICAvL0ZJWE1FIHRoaXMgaXMgd2FzdGVmdWxsLCB3ZSBjb3VsZCByZW1vdmUgdGhlIHRlbXAgbWFsbG9jIGJ5IGdvaW5nIHRoZSBVVEYxNiByb3V0ZVxyXG4gICAgLy9GSVhNRSB0aGlzIGlzIHVuc2FmZSwgY3V6IHJhdyBvYmplY3RzIGNvdWxkIGJlIEdDJ2QuXHJcblxyXG4gICAgY29uc3QgdXRmOCA9IG1vbm9fc3RyaW5nX2dldF91dGY4KG1hbmFnZWRTdHJpbmcpO1xyXG4gICAgY29uc3QgcmVzID0gTW9kdWxlLlVURjhUb1N0cmluZyh1dGY4KTtcclxuICAgIE1vZHVsZS5fZnJlZSh1dGY4IGFzIGFueSk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH0sXHJcblxyXG4gIHRvRG90TmV0U3RyaW5nOiBmdW5jdGlvbiB0b0RvdE5ldFN0cmluZyhqc1N0cmluZzogc3RyaW5nKTogU3lzdGVtX1N0cmluZyB7XHJcbiAgICByZXR1cm4gbW9ub19zdHJpbmcoanNTdHJpbmcpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFycmF5TGVuZ3RoOiBmdW5jdGlvbiBnZXRBcnJheUxlbmd0aChhcnJheTogU3lzdGVtX0FycmF5PGFueT4pOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1vZHVsZS5nZXRWYWx1ZShnZXRBcnJheURhdGFQb2ludGVyKGFycmF5KSwgJ2kzMicpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFycmF5RW50cnlQdHI6IGZ1bmN0aW9uIGdldEFycmF5RW50cnlQdHI8VFB0ciBleHRlbmRzIFBvaW50ZXI+KGFycmF5OiBTeXN0ZW1fQXJyYXk8VFB0cj4sIGluZGV4OiBudW1iZXIsIGl0ZW1TaXplOiBudW1iZXIpOiBUUHRyIHtcclxuICAgIC8vIEZpcnN0IGJ5dGUgaXMgYXJyYXkgbGVuZ3RoLCBmb2xsb3dlZCBieSBlbnRyaWVzXHJcbiAgICBjb25zdCBhZGRyZXNzID0gZ2V0QXJyYXlEYXRhUG9pbnRlcihhcnJheSkgKyA0ICsgaW5kZXggKiBpdGVtU2l6ZTtcclxuICAgIHJldHVybiBhZGRyZXNzIGFzIGFueSBhcyBUUHRyO1xyXG4gIH0sXHJcblxyXG4gIGdldE9iamVjdEZpZWxkc0Jhc2VBZGRyZXNzOiBmdW5jdGlvbiBnZXRPYmplY3RGaWVsZHNCYXNlQWRkcmVzcyhyZWZlcmVuY2VUeXBlZE9iamVjdDogU3lzdGVtX09iamVjdCk6IFBvaW50ZXIge1xyXG4gICAgLy8gVGhlIGZpcnN0IHR3byBpbnQzMiB2YWx1ZXMgYXJlIGludGVybmFsIE1vbm8gZGF0YVxyXG4gICAgcmV0dXJuIChyZWZlcmVuY2VUeXBlZE9iamVjdCBhcyBhbnkgYXMgbnVtYmVyICsgOCkgYXMgYW55IGFzIFBvaW50ZXI7XHJcbiAgfSxcclxuXHJcbiAgcmVhZEludDMyRmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwSW50MzIoYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJyk7XHJcbiAgfSxcclxuXHJcbiAgcmVhZE9iamVjdEZpZWxkOiBmdW5jdGlvbiByZWFkSGVhcE9iamVjdDxUIGV4dGVuZHMgU3lzdGVtX09iamVjdD4oYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogVCB7XHJcbiAgICByZXR1cm4gTW9kdWxlLmdldFZhbHVlKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSwgJ2kzMicpIGFzIGFueSBhcyBUO1xyXG4gIH0sXHJcblxyXG4gIHJlYWRTdHJpbmdGaWVsZDogZnVuY3Rpb24gcmVhZEhlYXBPYmplY3QoYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICBjb25zdCBmaWVsZFZhbHVlID0gTW9kdWxlLmdldFZhbHVlKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSwgJ2kzMicpO1xyXG4gICAgcmV0dXJuIGZpZWxkVmFsdWUgPT09IDAgPyBudWxsIDogbW9ub1BsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyhmaWVsZFZhbHVlIGFzIGFueSBhcyBTeXN0ZW1fU3RyaW5nKTtcclxuICB9LFxyXG5cclxuICByZWFkU3RydWN0RmllbGQ6IGZ1bmN0aW9uIHJlYWRTdHJ1Y3RGaWVsZDxUIGV4dGVuZHMgUG9pbnRlcj4oYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogVCB7XHJcbiAgICByZXR1cm4gKChiYXNlQWRkcmVzcyBhcyBhbnkgYXMgbnVtYmVyKSArIChmaWVsZE9mZnNldCB8fCAwKSkgYXMgYW55IGFzIFQ7XHJcbiAgfSxcclxufTtcclxuXHJcbi8vIEJ5cGFzcyBub3JtYWwgdHlwZSBjaGVja2luZyB0byBhZGQgdGhpcyBleHRyYSBmdW5jdGlvbi4gSXQncyBvbmx5IGludGVuZGVkIHRvIGJlIGNhbGxlZCBmcm9tXHJcbi8vIHRoZSBKUyBjb2RlIGluIE1vbm8ncyBkcml2ZXIuYy4gSXQncyBuZXZlciBpbnRlbmRlZCB0byBiZSBjYWxsZWQgZnJvbSBUeXBlU2NyaXB0LlxyXG4obW9ub1BsYXRmb3JtIGFzIGFueSkubW9ub0dldFJlZ2lzdGVyZWRGdW5jdGlvbiA9IGdldFJlZ2lzdGVyZWRGdW5jdGlvbjtcclxuXHJcbmZ1bmN0aW9uIGZpbmRBc3NlbWJseShhc3NlbWJseU5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgbGV0IGFzc2VtYmx5SGFuZGxlID0gYXNzZW1ibHlIYW5kbGVDYWNoZVthc3NlbWJseU5hbWVdO1xyXG4gIGlmICghYXNzZW1ibHlIYW5kbGUpIHtcclxuICAgIGFzc2VtYmx5SGFuZGxlID0gYXNzZW1ibHlfbG9hZChhc3NlbWJseU5hbWUpO1xyXG4gICAgaWYgKCFhc3NlbWJseUhhbmRsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGFzc2VtYmx5IFwiJHthc3NlbWJseU5hbWV9XCJgKTtcclxuICAgIH1cclxuICAgIGFzc2VtYmx5SGFuZGxlQ2FjaGVbYXNzZW1ibHlOYW1lXSA9IGFzc2VtYmx5SGFuZGxlO1xyXG4gIH1cclxuICByZXR1cm4gYXNzZW1ibHlIYW5kbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRUeXBlKGFzc2VtYmx5TmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gIGNvbnN0IGZ1bGx5UXVhbGlmaWVkVHlwZU5hbWUgPSBgWyR7YXNzZW1ibHlOYW1lfV0ke25hbWVzcGFjZX0uJHtjbGFzc05hbWV9YDtcclxuICBsZXQgdHlwZUhhbmRsZSA9IHR5cGVIYW5kbGVDYWNoZVtmdWxseVF1YWxpZmllZFR5cGVOYW1lXTtcclxuICBpZiAoIXR5cGVIYW5kbGUpIHtcclxuICAgIHR5cGVIYW5kbGUgPSBmaW5kX2NsYXNzKGZpbmRBc3NlbWJseShhc3NlbWJseU5hbWUpLCBuYW1lc3BhY2UsIGNsYXNzTmFtZSk7XHJcbiAgICBpZiAoIXR5cGVIYW5kbGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCB0eXBlIFwiJHtjbGFzc05hbWV9XCIgaW4gbmFtZXNwYWNlIFwiJHtuYW1lc3BhY2V9XCIgaW4gYXNzZW1ibHkgXCIke2Fzc2VtYmx5TmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgdHlwZUhhbmRsZUNhY2hlW2Z1bGx5UXVhbGlmaWVkVHlwZU5hbWVdID0gdHlwZUhhbmRsZTtcclxuICB9XHJcbiAgcmV0dXJuIHR5cGVIYW5kbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRNZXRob2QoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZywgbWV0aG9kTmFtZTogc3RyaW5nKTogTWV0aG9kSGFuZGxlIHtcclxuICBjb25zdCBmdWxseVF1YWxpZmllZE1ldGhvZE5hbWUgPSBgWyR7YXNzZW1ibHlOYW1lfV0ke25hbWVzcGFjZX0uJHtjbGFzc05hbWV9Ojoke21ldGhvZE5hbWV9YDtcclxuICBsZXQgbWV0aG9kSGFuZGxlID0gbWV0aG9kSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRNZXRob2ROYW1lXTtcclxuICBpZiAoIW1ldGhvZEhhbmRsZSkge1xyXG4gICAgbWV0aG9kSGFuZGxlID0gZmluZF9tZXRob2QoZmluZFR5cGUoYXNzZW1ibHlOYW1lLCBuYW1lc3BhY2UsIGNsYXNzTmFtZSksIG1ldGhvZE5hbWUsIC0xKTtcclxuICAgIGlmICghbWV0aG9kSGFuZGxlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgbWV0aG9kIFwiJHttZXRob2ROYW1lfVwiIG9uIHR5cGUgXCIke25hbWVzcGFjZX0uJHtjbGFzc05hbWV9XCJgKTtcclxuICAgIH1cclxuICAgIG1ldGhvZEhhbmRsZUNhY2hlW2Z1bGx5UXVhbGlmaWVkTWV0aG9kTmFtZV0gPSBtZXRob2RIYW5kbGU7XHJcbiAgfVxyXG4gIHJldHVybiBtZXRob2RIYW5kbGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFNjcmlwdFRhZ3NUb0RvY3VtZW50KCkge1xyXG4gIC8vIExvYWQgZWl0aGVyIHRoZSB3YXNtIG9yIGFzbS5qcyB2ZXJzaW9uIG9mIHRoZSBNb25vIHJ1bnRpbWVcclxuICBjb25zdCBicm93c2VyU3VwcG9ydHNOYXRpdmVXZWJBc3NlbWJseSA9IHR5cGVvZiBXZWJBc3NlbWJseSAhPT0gJ3VuZGVmaW5lZCcgJiYgV2ViQXNzZW1ibHkudmFsaWRhdGU7XHJcbiAgY29uc3QgbW9ub1J1bnRpbWVVcmxCYXNlID0gJ19mcmFtZXdvcmsvJyArIChicm93c2VyU3VwcG9ydHNOYXRpdmVXZWJBc3NlbWJseSA/ICd3YXNtJyA6ICdhc21qcycpO1xyXG4gIGNvbnN0IG1vbm9SdW50aW1lU2NyaXB0VXJsID0gYCR7bW9ub1J1bnRpbWVVcmxCYXNlfS9tb25vLmpzYDtcclxuXHJcbiAgaWYgKCFicm93c2VyU3VwcG9ydHNOYXRpdmVXZWJBc3NlbWJseSkge1xyXG4gICAgLy8gSW4gdGhlIGFzbWpzIGNhc2UsIHRoZSBpbml0aWFsIG1lbW9yeSBzdHJ1Y3R1cmUgaXMgaW4gYSBzZXBhcmF0ZSBmaWxlIHdlIG5lZWQgdG8gZG93bmxvYWRcclxuICAgIGNvbnN0IG1lbWluaXRYSFIgPSBNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUmVxdWVzdCddID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICBtZW1pbml0WEhSLm9wZW4oJ0dFVCcsIGAke21vbm9SdW50aW1lVXJsQmFzZX0vbW9uby5qcy5tZW1gKTtcclxuICAgIG1lbWluaXRYSFIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICAgIG1lbWluaXRYSFIuc2VuZChudWxsKTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50LndyaXRlKGA8c2NyaXB0IGRlZmVyIHNyYz1cIiR7bW9ub1J1bnRpbWVTY3JpcHRVcmx9XCI+PC9zY3JpcHQ+YCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUVtc2NyaXB0ZW5Nb2R1bGVJbnN0YW5jZShsb2FkQXNzZW1ibHlVcmxzOiBzdHJpbmdbXSwgb25SZWFkeTogKCkgPT4gdm9pZCwgb25FcnJvcjogKHJlYXNvbj86IGFueSkgPT4gdm9pZCkge1xyXG4gIGNvbnN0IG1vZHVsZSA9IHt9IGFzIHR5cGVvZiBNb2R1bGU7XHJcbiAgY29uc3Qgd2FzbUJpbmFyeUZpbGUgPSAnX2ZyYW1ld29yay93YXNtL21vbm8ud2FzbSc7XHJcbiAgY29uc3QgYXNtanNDb2RlRmlsZSA9ICdfZnJhbWV3b3JrL2FzbWpzL21vbm8uYXNtLmpzJztcclxuXHJcbiAgbW9kdWxlLnByaW50ID0gbGluZSA9PiBjb25zb2xlLmxvZyhgV0FTTTogJHtsaW5lfWApO1xyXG4gIG1vZHVsZS5wcmludEVyciA9IGxpbmUgPT4gY29uc29sZS5lcnJvcihgV0FTTTogJHtsaW5lfWApO1xyXG4gIG1vZHVsZS5wcmVSdW4gPSBbXTtcclxuICBtb2R1bGUucG9zdFJ1biA9IFtdO1xyXG4gIG1vZHVsZS5wcmVsb2FkUGx1Z2lucyA9IFtdO1xyXG5cclxuICBtb2R1bGUubG9jYXRlRmlsZSA9IGZpbGVOYW1lID0+IHtcclxuICAgIHN3aXRjaCAoZmlsZU5hbWUpIHtcclxuICAgICAgY2FzZSAnbW9uby53YXNtJzogcmV0dXJuIHdhc21CaW5hcnlGaWxlO1xyXG4gICAgICBjYXNlICdtb25vLmFzbS5qcyc6IHJldHVybiBhc21qc0NvZGVGaWxlO1xyXG4gICAgICBkZWZhdWx0OiByZXR1cm4gZmlsZU5hbWU7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgbW9kdWxlLnByZVJ1bi5wdXNoKCgpID0+IHtcclxuICAgIC8vIEJ5IG5vdywgZW1zY3JpcHRlbiBzaG91bGQgYmUgaW5pdGlhbGlzZWQgZW5vdWdoIHRoYXQgd2UgY2FuIGNhcHR1cmUgdGhlc2UgbWV0aG9kcyBmb3IgbGF0ZXIgdXNlXHJcbiAgICBhc3NlbWJseV9sb2FkID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fYXNzZW1ibHlfbG9hZCcsICdudW1iZXInLCBbJ3N0cmluZyddKTtcclxuICAgIGZpbmRfY2xhc3MgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9hc3NlbWJseV9maW5kX2NsYXNzJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ3N0cmluZycsICdzdHJpbmcnXSk7XHJcbiAgICBmaW5kX21ldGhvZCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2ZpbmRfbWV0aG9kJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ3N0cmluZycsICdudW1iZXInXSk7XHJcbiAgICBpbnZva2VfbWV0aG9kID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21faW52b2tlX21ldGhvZCcsICdudW1iZXInLCBbJ251bWJlcicsICdudW1iZXInLCAnbnVtYmVyJ10pO1xyXG4gICAgbW9ub19zdHJpbmdfZ2V0X3V0ZjggPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9zdHJpbmdfZ2V0X3V0ZjgnLCAnbnVtYmVyJywgWydudW1iZXInXSk7XHJcbiAgICBtb25vX3N0cmluZyA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX3N0cmluZ19mcm9tX2pzJywgJ251bWJlcicsIFsnc3RyaW5nJ10pO1xyXG5cclxuICAgIE1vZHVsZS5GU19jcmVhdGVQYXRoKCcvJywgJ2FwcEJpbkRpcicsIHRydWUsIHRydWUpO1xyXG4gICAgbG9hZEFzc2VtYmx5VXJscy5mb3JFYWNoKHVybCA9PlxyXG4gICAgICBGUy5jcmVhdGVQcmVsb2FkZWRGaWxlKCdhcHBCaW5EaXInLCBgJHtnZXRBc3NlbWJseU5hbWVGcm9tVXJsKHVybCl9LmRsbGAsIHVybCwgdHJ1ZSwgZmFsc2UsIHVuZGVmaW5lZCwgb25FcnJvcikpO1xyXG4gIH0pO1xyXG5cclxuICBtb2R1bGUucG9zdFJ1bi5wdXNoKCgpID0+IHtcclxuICAgIGNvbnN0IGxvYWRfcnVudGltZSA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2xvYWRfcnVudGltZScsIG51bGwsIFsnc3RyaW5nJ10pO1xyXG4gICAgbG9hZF9ydW50aW1lKCdhcHBCaW5EaXInKTtcclxuICAgIG9uUmVhZHkoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG1vZHVsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXN5bmNMb2FkKHVybCwgb25sb2FkLCBvbmVycm9yKSB7XHJcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdDtcclxuICB4aHIub3BlbignR0VUJywgdXJsLCAvKiBhc3luYzogKi8gdHJ1ZSk7XHJcbiAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIHhocl9vbmxvYWQoKSB7XHJcbiAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDAgfHwgeGhyLnN0YXR1cyA9PSAwICYmIHhoci5yZXNwb25zZSkge1xyXG4gICAgICB2YXIgYXNtID0gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgb25sb2FkKGFzbSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvbmVycm9yKHhocik7XHJcbiAgICB9XHJcbiAgfTtcclxuICB4aHIub25lcnJvciA9IG9uZXJyb3I7XHJcbiAgeGhyLnNlbmQobnVsbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFycmF5RGF0YVBvaW50ZXI8VD4oYXJyYXk6IFN5c3RlbV9BcnJheTxUPik6IG51bWJlciB7XHJcbiAgcmV0dXJuIDxudW1iZXI+PGFueT5hcnJheSArIDEyOyAvLyBGaXJzdCBieXRlIGZyb20gaGVyZSBpcyBsZW5ndGgsIHRoZW4gZm9sbG93aW5nIGJ5dGVzIGFyZSBlbnRyaWVzXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BsYXRmb3JtL01vbm8vTW9ub1BsYXRmb3JtLnRzIiwiaW1wb3J0IHsgaW52b2tlV2l0aEpzb25NYXJzaGFsbGluZyB9IGZyb20gJy4vSW52b2tlV2l0aEpzb25NYXJzaGFsbGluZyc7XHJcbmltcG9ydCB7IGF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQsIHJlbmRlckJhdGNoIH0gZnJvbSAnLi4vUmVuZGVyaW5nL1JlbmRlcmVyJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmaW5pdGl2ZSBsaXN0IG9mIGludGVybmFsIGZ1bmN0aW9ucyBpbnZva2FibGUgZnJvbSAuTkVUIGNvZGUuXHJcbiAqIFRoZXNlIGZ1bmN0aW9uIG5hbWVzIGFyZSB0cmVhdGVkIGFzICdyZXNlcnZlZCcgYW5kIGNhbm5vdCBiZSBwYXNzZWQgdG8gcmVnaXN0ZXJGdW5jdGlvbi5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbnMgPSB7XHJcbiAgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudCxcclxuICBpbnZva2VXaXRoSnNvbk1hcnNoYWxsaW5nLFxyXG4gIHJlbmRlckJhdGNoLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvSW50ZXJvcC9JbnRlcm5hbFJlZ2lzdGVyZWRGdW5jdGlvbi50cyIsImltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBTeXN0ZW1fU3RyaW5nIH0gZnJvbSAnLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBnZXRSZWdpc3RlcmVkRnVuY3Rpb24gfSBmcm9tICcuL1JlZ2lzdGVyZWRGdW5jdGlvbic7XHJcbmltcG9ydCB7IGdldEVsZW1lbnRCeUNhcHR1cmVJZCB9IGZyb20gJy4uL1JlbmRlcmluZy9FbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSc7XHJcblxyXG5jb25zdCBlbGVtZW50UmVmS2V5ID0gJ19ibGF6b3JFbGVtZW50UmVmJzsgLy8gS2VlcCBpbiBzeW5jIHdpdGggRWxlbWVudFJlZi5jc1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVdpdGhKc29uTWFyc2hhbGxpbmcoaWRlbnRpZmllcjogU3lzdGVtX1N0cmluZywgLi4uYXJnc0pzb246IFN5c3RlbV9TdHJpbmdbXSkge1xyXG4gIGNvbnN0IGlkZW50aWZpZXJKc1N0cmluZyA9IHBsYXRmb3JtLnRvSmF2YVNjcmlwdFN0cmluZyhpZGVudGlmaWVyKTtcclxuICBjb25zdCBmdW5jSW5zdGFuY2UgPSBnZXRSZWdpc3RlcmVkRnVuY3Rpb24oaWRlbnRpZmllckpzU3RyaW5nKTtcclxuICBjb25zdCBhcmdzID0gYXJnc0pzb24ubWFwKGpzb24gPT4gSlNPTi5wYXJzZShwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoanNvbiksIGpzb25SZXZpdmVyKSk7XHJcbiAgY29uc3QgcmVzdWx0ID0gZnVuY0luc3RhbmNlLmFwcGx5KG51bGwsIGFyZ3MpO1xyXG4gIGlmIChyZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGNvbnN0IHJlc3VsdEpzb24gPSBKU09OLnN0cmluZ2lmeShyZXN1bHQpO1xyXG4gICAgcmV0dXJuIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKHJlc3VsdEpzb24pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGpzb25SZXZpdmVyKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55IHtcclxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShlbGVtZW50UmVmS2V5KSAmJiB0eXBlb2YgdmFsdWVbZWxlbWVudFJlZktleV0gPT09ICdudW1iZXInKSB7XHJcbiAgICByZXR1cm4gZ2V0RWxlbWVudEJ5Q2FwdHVyZUlkKHZhbHVlW2VsZW1lbnRSZWZLZXldKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB2YWx1ZTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9JbnRlcm9wL0ludm9rZVdpdGhKc29uTWFyc2hhbGxpbmcudHMiLCJpbXBvcnQgeyBQb2ludGVyLCBTeXN0ZW1fQXJyYXkgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIH0gZnJvbSAnLi9SZW5kZXJUcmVlRnJhbWUnO1xyXG5pbXBvcnQgeyBSZW5kZXJUcmVlRWRpdFBvaW50ZXIgfSBmcm9tICcuL1JlbmRlclRyZWVFZGl0JztcclxuXHJcbi8vIEtlZXAgaW4gc3luYyB3aXRoIHRoZSBzdHJ1Y3RzIGluIC5ORVQgY29kZVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlckJhdGNoID0ge1xyXG4gIHVwZGF0ZWRDb21wb25lbnRzOiAob2JqOiBSZW5kZXJCYXRjaFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxBcnJheVJhbmdlUG9pbnRlcjxSZW5kZXJUcmVlRGlmZlBvaW50ZXI+PihvYmosIDApLFxyXG4gIHJlZmVyZW5jZUZyYW1lczogKG9iajogUmVuZGVyQmF0Y2hQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkU3RydWN0RmllbGQ8QXJyYXlSYW5nZVBvaW50ZXI8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4+KG9iaiwgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCksXHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHM6IChvYmo6IFJlbmRlckJhdGNoUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPEFycmF5UmFuZ2VQb2ludGVyPG51bWJlcj4+KG9iaiwgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCArIGFycmF5UmFuZ2VTdHJ1Y3RMZW5ndGgpLFxyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzOiAob2JqOiBSZW5kZXJCYXRjaFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxBcnJheVJhbmdlUG9pbnRlcjxudW1iZXI+PihvYmosIGFycmF5UmFuZ2VTdHJ1Y3RMZW5ndGggKyBhcnJheVJhbmdlU3RydWN0TGVuZ3RoICsgYXJyYXlSYW5nZVN0cnVjdExlbmd0aCksXHJcbn07XHJcblxyXG5jb25zdCBhcnJheVJhbmdlU3RydWN0TGVuZ3RoID0gODtcclxuZXhwb3J0IGNvbnN0IGFycmF5UmFuZ2UgPSB7XHJcbiAgYXJyYXk6IDxUPihvYmo6IEFycmF5UmFuZ2VQb2ludGVyPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkT2JqZWN0RmllbGQ8U3lzdGVtX0FycmF5PFQ+PihvYmosIDApLFxyXG4gIGNvdW50OiA8VD4ob2JqOiBBcnJheVJhbmdlUG9pbnRlcjxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQob2JqLCA0KSxcclxufTtcclxuXHJcbmNvbnN0IGFycmF5U2VnbWVudFN0cnVjdExlbmd0aCA9IDEyO1xyXG5leHBvcnQgY29uc3QgYXJyYXlTZWdtZW50ID0ge1xyXG4gIGFycmF5OiA8VD4ob2JqOiBBcnJheVNlZ21lbnRQb2ludGVyPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkT2JqZWN0RmllbGQ8U3lzdGVtX0FycmF5PFQ+PihvYmosIDApLFxyXG4gIG9mZnNldDogPFQ+KG9iajogQXJyYXlTZWdtZW50UG9pbnRlcjxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQob2JqLCA0KSxcclxuICBjb3VudDogPFQ+KG9iajogQXJyYXlTZWdtZW50UG9pbnRlcjxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQob2JqLCA4KSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJUcmVlRGlmZlN0cnVjdExlbmd0aCA9IDQgKyBhcnJheVNlZ21lbnRTdHJ1Y3RMZW5ndGg7XHJcbmV4cG9ydCBjb25zdCByZW5kZXJUcmVlRGlmZiA9IHtcclxuICBjb21wb25lbnRJZDogKG9iajogUmVuZGVyVHJlZURpZmZQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChvYmosIDApLFxyXG4gIGVkaXRzOiAob2JqOiBSZW5kZXJUcmVlRGlmZlBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxBcnJheVNlZ21lbnRQb2ludGVyPFJlbmRlclRyZWVFZGl0UG9pbnRlcj4+KG9iaiwgNCksICBcclxufTtcclxuXHJcbi8vIE5vbWluYWwgdHlwZXMgdG8gZW5zdXJlIG9ubHkgdmFsaWQgcG9pbnRlcnMgYXJlIHBhc3NlZCB0byB0aGUgZnVuY3Rpb25zIGFib3ZlLlxyXG4vLyBBdCBydW50aW1lIHRoZSB2YWx1ZXMgYXJlIGp1c3QgbnVtYmVycy5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJCYXRjaFBvaW50ZXIgZXh0ZW5kcyBQb2ludGVyIHsgUmVuZGVyQmF0Y2hQb2ludGVyX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5UmFuZ2VQb2ludGVyPFQ+IGV4dGVuZHMgUG9pbnRlciB7IEFycmF5UmFuZ2VQb2ludGVyX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5U2VnbWVudFBvaW50ZXI8VD4gZXh0ZW5kcyBQb2ludGVyIHsgQXJyYXlTZWdtZW50UG9pbnRlcl9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRGlmZlBvaW50ZXIgZXh0ZW5kcyBQb2ludGVyIHsgUmVuZGVyVHJlZURpZmZQb2ludGVyX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL1JlbmRlckJhdGNoLnRzIiwiaW1wb3J0IHsgU3lzdGVtX0FycmF5LCBNZXRob2RIYW5kbGUgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IGdldFJlbmRlclRyZWVFZGl0UHRyLCByZW5kZXJUcmVlRWRpdCwgUmVuZGVyVHJlZUVkaXRQb2ludGVyLCBFZGl0VHlwZSB9IGZyb20gJy4vUmVuZGVyVHJlZUVkaXQnO1xyXG5pbXBvcnQgeyBnZXRUcmVlRnJhbWVQdHIsIHJlbmRlclRyZWVGcmFtZSwgRnJhbWVUeXBlLCBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIH0gZnJvbSAnLi9SZW5kZXJUcmVlRnJhbWUnO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgRXZlbnREZWxlZ2F0b3IgfSBmcm9tICcuL0V2ZW50RGVsZWdhdG9yJztcclxuaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcbmltcG9ydCB7IExvZ2ljYWxFbGVtZW50LCB0b0xvZ2ljYWxFbGVtZW50LCBpbnNlcnRMb2dpY2FsQ2hpbGQsIHJlbW92ZUxvZ2ljYWxDaGlsZCwgZ2V0TG9naWNhbFBhcmVudCwgZ2V0TG9naWNhbENoaWxkLCBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyLCBpc1N2Z0VsZW1lbnQgfSBmcm9tICcuL0xvZ2ljYWxFbGVtZW50cyc7XHJcbmltcG9ydCB7IGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50IH0gZnJvbSAnLi9FbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSc7XHJcbmNvbnN0IHNlbGVjdFZhbHVlUHJvcG5hbWUgPSAnX2JsYXpvclNlbGVjdFZhbHVlJztcclxubGV0IHJhaXNlRXZlbnRNZXRob2Q6IE1ldGhvZEhhbmRsZTtcclxubGV0IHJlbmRlckNvbXBvbmVudE1ldGhvZDogTWV0aG9kSGFuZGxlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJSZW5kZXJlciB7XHJcbiAgcHJpdmF0ZSBldmVudERlbGVnYXRvcjogRXZlbnREZWxlZ2F0b3I7XHJcbiAgcHJpdmF0ZSBjaGlsZENvbXBvbmVudExvY2F0aW9uczogeyBbY29tcG9uZW50SWQ6IG51bWJlcl06IExvZ2ljYWxFbGVtZW50IH0gPSB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RGVsZWdhdG9yID0gbmV3IEV2ZW50RGVsZWdhdG9yKChldmVudCwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpID0+IHtcclxuICAgICAgcmFpc2VFdmVudChldmVudCwgdGhpcy5icm93c2VyUmVuZGVyZXJJZCwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudChjb21wb25lbnRJZDogbnVtYmVyLCBlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICB0aGlzLmF0dGFjaENvbXBvbmVudFRvRWxlbWVudChjb21wb25lbnRJZCwgdG9Mb2dpY2FsRWxlbWVudChlbGVtZW50KSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQ29tcG9uZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVkaXRzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUVkaXRQb2ludGVyPiwgZWRpdHNPZmZzZXQ6IG51bWJlciwgZWRpdHNMZW5ndGg6IG51bWJlciwgcmVmZXJlbmNlRnJhbWVzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4pIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXTtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIGVsZW1lbnQgaXMgY3VycmVudGx5IGFzc29jaWF0ZWQgd2l0aCBjb21wb25lbnQgJHtjb21wb25lbnRJZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGx5RWRpdHMoY29tcG9uZW50SWQsIGVsZW1lbnQsIDAsIGVkaXRzLCBlZGl0c09mZnNldCwgZWRpdHNMZW5ndGgsIHJlZmVyZW5jZUZyYW1lcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUNvbXBvbmVudChjb21wb25lbnRJZDogbnVtYmVyKSB7XHJcbiAgICBkZWxldGUgdGhpcy5jaGlsZENvbXBvbmVudExvY2F0aW9uc1tjb21wb25lbnRJZF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZUV2ZW50SGFuZGxlcihldmVudEhhbmRsZXJJZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnJlbW92ZUxpc3RlbmVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNoaWxkQ29tcG9uZW50TG9jYXRpb25zW2NvbXBvbmVudElkXSA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5RWRpdHMoY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBlZGl0czogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVFZGl0UG9pbnRlcj4sIGVkaXRzT2Zmc2V0OiBudW1iZXIsIGVkaXRzTGVuZ3RoOiBudW1iZXIsIHJlZmVyZW5jZUZyYW1lczogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVGcmFtZVBvaW50ZXI+KSB7XHJcbiAgICBsZXQgY3VycmVudERlcHRoID0gMDtcclxuICAgIGxldCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSBjaGlsZEluZGV4O1xyXG4gICAgY29uc3QgbWF4RWRpdEluZGV4RXhjbCA9IGVkaXRzT2Zmc2V0ICsgZWRpdHNMZW5ndGg7XHJcbiAgICBmb3IgKGxldCBlZGl0SW5kZXggPSBlZGl0c09mZnNldDsgZWRpdEluZGV4IDwgbWF4RWRpdEluZGV4RXhjbDsgZWRpdEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWRpdCA9IGdldFJlbmRlclRyZWVFZGl0UHRyKGVkaXRzLCBlZGl0SW5kZXgpO1xyXG4gICAgICBjb25zdCBlZGl0VHlwZSA9IHJlbmRlclRyZWVFZGl0LnR5cGUoZWRpdCk7XHJcbiAgICAgIHN3aXRjaCAoZWRpdFR5cGUpIHtcclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnByZXBlbmRGcmFtZToge1xyXG4gICAgICAgICAgY29uc3QgZnJhbWVJbmRleCA9IHJlbmRlclRyZWVFZGl0Lm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gZ2V0VHJlZUZyYW1lUHRyKHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICB0aGlzLmluc2VydEZyYW1lKGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCwgcmVmZXJlbmNlRnJhbWVzLCBmcmFtZSwgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5yZW1vdmVGcmFtZToge1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gcmVuZGVyVHJlZUVkaXQuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgcmVtb3ZlTG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnNldEF0dHJpYnV0ZToge1xyXG4gICAgICAgICAgY29uc3QgZnJhbWVJbmRleCA9IHJlbmRlclRyZWVFZGl0Lm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gZ2V0VHJlZUZyYW1lUHRyKHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZ2V0TG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseUF0dHJpYnV0ZShjb21wb25lbnRJZCwgZWxlbWVudCwgZnJhbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2V0IGF0dHJpYnV0ZSBvbiBub24tZWxlbWVudCBjaGlsZGApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUucmVtb3ZlQXR0cmlidXRlOiB7XHJcbiAgICAgICAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byBkaXNwb3NlIHRoZSBpbmZvIHdlIHRyYWNrIGFib3V0IGV2ZW50IGhhbmRsZXJzIGhlcmUsIGJlY2F1c2UgdGhlXHJcbiAgICAgICAgICAvLyBkaXNwb3NlZCBldmVudCBoYW5kbGVyIElEcyBhcmUgZGVsaXZlcmVkIHNlcGFyYXRlbHkgKGluIHRoZSAnZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMnIGFycmF5KVxyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gcmVuZGVyVHJlZUVkaXQuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSByZW5kZXJUcmVlRWRpdC5yZW1vdmVkQXR0cmlidXRlTmFtZShlZGl0KSE7XHJcbiAgICAgICAgICAgIC8vIEZpcnN0IHRyeSB0byByZW1vdmUgYW55IHNwZWNpYWwgcHJvcGVydHkgd2UgdXNlIGZvciB0aGlzIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMudHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgbnVsbCkpIHtcclxuICAgICAgICAgICAgICAvLyBJZiB0aGF0J3Mgbm90IGFwcGxpY2FibGUsIGl0J3MgYSByZWd1bGFyIERPTSBhdHRyaWJ1dGUgc28gcmVtb3ZlIHRoYXRcclxuICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIG5vbi1lbGVtZW50IGNoaWxkYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS51cGRhdGVUZXh0OiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gcmVuZGVyVHJlZUVkaXQubmV3VHJlZUluZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZnJhbWUgPSBnZXRUcmVlRnJhbWVQdHIocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IHJlbmRlclRyZWVFZGl0LnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gZ2V0TG9naWNhbENoaWxkKHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KTtcclxuICAgICAgICAgIGlmICh0ZXh0Tm9kZSBpbnN0YW5jZW9mIFRleHQpIHtcclxuICAgICAgICAgICAgdGV4dE5vZGUudGV4dENvbnRlbnQgPSByZW5kZXJUcmVlRnJhbWUudGV4dENvbnRlbnQoZnJhbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3Qgc2V0IHRleHQgY29udGVudCBvbiBub24tdGV4dCBjaGlsZGApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcEluOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSByZW5kZXJUcmVlRWRpdC5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBwYXJlbnQgPSBnZXRMb2dpY2FsQ2hpbGQocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgY3VycmVudERlcHRoKys7XHJcbiAgICAgICAgICBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcE91dDoge1xyXG4gICAgICAgICAgcGFyZW50ID0gZ2V0TG9naWNhbFBhcmVudChwYXJlbnQpITtcclxuICAgICAgICAgIGN1cnJlbnREZXB0aC0tO1xyXG4gICAgICAgICAgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoID0gY3VycmVudERlcHRoID09PSAwID8gY2hpbGRJbmRleCA6IDA7IC8vIFRoZSBjaGlsZEluZGV4IGlzIG9ubHkgZXZlciBub256ZXJvIGF0IHplcm8gZGVwdGhcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICBjb25zdCB1bmtub3duVHlwZTogbmV2ZXIgPSBlZGl0VHlwZTsgLy8gQ29tcGlsZS10aW1lIHZlcmlmaWNhdGlvbiB0aGF0IHRoZSBzd2l0Y2ggd2FzIGV4aGF1c3RpdmVcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBlZGl0IHR5cGU6ICR7dW5rbm93blR5cGV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydEZyYW1lKGNvbXBvbmVudElkOiBudW1iZXIsIHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWVzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUZyYW1lUG9pbnRlcj4sIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyLCBmcmFtZUluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZnJhbWVUeXBlID0gcmVuZGVyVHJlZUZyYW1lLmZyYW1lVHlwZShmcmFtZSk7XHJcbiAgICBzd2l0Y2ggKGZyYW1lVHlwZSkge1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5lbGVtZW50OlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0RWxlbWVudChjb21wb25lbnRJZCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZXMsIGZyYW1lLCBmcmFtZUluZGV4KTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUudGV4dDpcclxuICAgICAgICB0aGlzLmluc2VydFRleHQocGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmF0dHJpYnV0ZTpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZSBmcmFtZXMgc2hvdWxkIG9ubHkgYmUgcHJlc2VudCBhcyBsZWFkaW5nIGNoaWxkcmVuIG9mIGVsZW1lbnQgZnJhbWVzLicpO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5jb21wb25lbnQ6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRDb21wb25lbnQocGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLnJlZ2lvbjpcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnNlcnRGcmFtZVJhbmdlKGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWVJbmRleCArIDEsIGZyYW1lSW5kZXggKyByZW5kZXJUcmVlRnJhbWUuc3VidHJlZUxlbmd0aChmcmFtZSkpO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5lbGVtZW50UmVmZXJlbmNlQ2FwdHVyZTpcclxuICAgICAgICBpZiAocGFyZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xyXG4gICAgICAgICAgYXBwbHlDYXB0dXJlSWRUb0VsZW1lbnQocGFyZW50LCByZW5kZXJUcmVlRnJhbWUuZWxlbWVudFJlZmVyZW5jZUNhcHR1cmVJZChmcmFtZSkpO1xyXG4gICAgICAgICAgcmV0dXJuIDA7IC8vIEEgXCJjYXB0dXJlXCIgaXMgYSBjaGlsZCBpbiB0aGUgZGlmZiwgYnV0IGhhcyBubyBub2RlIGluIHRoZSBET01cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWZlcmVuY2UgY2FwdHVyZSBmcmFtZXMgY2FuIG9ubHkgYmUgY2hpbGRyZW4gb2YgZWxlbWVudCBmcmFtZXMuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnN0IHVua25vd25UeXBlOiBuZXZlciA9IGZyYW1lVHlwZTsgLy8gQ29tcGlsZS10aW1lIHZlcmlmaWNhdGlvbiB0aGF0IHRoZSBzd2l0Y2ggd2FzIGV4aGF1c3RpdmVcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZnJhbWUgdHlwZTogJHt1bmtub3duVHlwZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RWxlbWVudChjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVGcmFtZVBvaW50ZXI+LCBmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlciwgZnJhbWVJbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCB0YWdOYW1lID0gcmVuZGVyVHJlZUZyYW1lLmVsZW1lbnROYW1lKGZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdEb21FbGVtZW50UmF3ID0gdGFnTmFtZSA9PT0gJ3N2ZycgfHwgaXNTdmdFbGVtZW50KHBhcmVudCkgP1xyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGFnTmFtZSkgOlxyXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgY29uc3QgbmV3RWxlbWVudCA9IHRvTG9naWNhbEVsZW1lbnQobmV3RG9tRWxlbWVudFJhdyk7XHJcbiAgICBpbnNlcnRMb2dpY2FsQ2hpbGQobmV3RG9tRWxlbWVudFJhdywgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICAvLyBBcHBseSBhdHRyaWJ1dGVzXHJcbiAgICBjb25zdCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbCA9IGZyYW1lSW5kZXggKyByZW5kZXJUcmVlRnJhbWUuc3VidHJlZUxlbmd0aChmcmFtZSk7XHJcbiAgICBmb3IgKGxldCBkZXNjZW5kYW50SW5kZXggPSBmcmFtZUluZGV4ICsgMTsgZGVzY2VuZGFudEluZGV4IDwgZGVzY2VuZGFudHNFbmRJbmRleEV4Y2w7IGRlc2NlbmRhbnRJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IGRlc2NlbmRhbnRGcmFtZSA9IGdldFRyZWVGcmFtZVB0cihmcmFtZXMsIGRlc2NlbmRhbnRJbmRleCk7XHJcbiAgICAgIGlmIChyZW5kZXJUcmVlRnJhbWUuZnJhbWVUeXBlKGRlc2NlbmRhbnRGcmFtZSkgPT09IEZyYW1lVHlwZS5hdHRyaWJ1dGUpIHtcclxuICAgICAgICB0aGlzLmFwcGx5QXR0cmlidXRlKGNvbXBvbmVudElkLCBuZXdEb21FbGVtZW50UmF3LCBkZXNjZW5kYW50RnJhbWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzIHNvb24gYXMgd2Ugc2VlIGEgbm9uLWF0dHJpYnV0ZSBjaGlsZCwgYWxsIHRoZSBzdWJzZXF1ZW50IGNoaWxkIGZyYW1lcyBhcmVcclxuICAgICAgICAvLyBub3QgYXR0cmlidXRlcywgc28gYmFpbCBvdXQgYW5kIGluc2VydCB0aGUgcmVtbmFudHMgcmVjdXJzaXZlbHlcclxuICAgICAgICB0aGlzLmluc2VydEZyYW1lUmFuZ2UoY29tcG9uZW50SWQsIG5ld0VsZW1lbnQsIDAsIGZyYW1lcywgZGVzY2VuZGFudEluZGV4LCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0Q29tcG9uZW50KHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBjcmVhdGVBbmRJbnNlcnRMb2dpY2FsQ29udGFpbmVyKHBhcmVudCwgY2hpbGRJbmRleCk7XHJcblxyXG4gICAgLy8gQWxsIHdlIGhhdmUgdG8gZG8gaXMgYXNzb2NpYXRlIHRoZSBjaGlsZCBjb21wb25lbnQgSUQgd2l0aCBpdHMgbG9jYXRpb24uIFdlIGRvbid0IGFjdHVhbGx5XHJcbiAgICAvLyBkbyBhbnkgcmVuZGVyaW5nIGhlcmUsIGJlY2F1c2UgdGhlIGRpZmYgZm9yIHRoZSBjaGlsZCB3aWxsIGFwcGVhciBsYXRlciBpbiB0aGUgcmVuZGVyIGJhdGNoLlxyXG4gICAgY29uc3QgY2hpbGRDb21wb25lbnRJZCA9IHJlbmRlclRyZWVGcmFtZS5jb21wb25lbnRJZChmcmFtZSk7XHJcbiAgICB0aGlzLmF0dGFjaENvbXBvbmVudFRvRWxlbWVudChjaGlsZENvbXBvbmVudElkLCBjb250YWluZXJFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0VGV4dChwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIHRleHRGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikge1xyXG4gICAgY29uc3QgdGV4dENvbnRlbnQgPSByZW5kZXJUcmVlRnJhbWUudGV4dENvbnRlbnQodGV4dEZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHRDb250ZW50KTtcclxuICAgIGluc2VydExvZ2ljYWxDaGlsZChuZXdUZXh0Tm9kZSwgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlBdHRyaWJ1dGUoY29tcG9uZW50SWQ6IG51bWJlciwgdG9Eb21FbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikge1xyXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IHJlbmRlclRyZWVGcmFtZS5hdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZUZyYW1lKSE7XHJcbiAgICBjb25zdCBicm93c2VyUmVuZGVyZXJJZCA9IHRoaXMuYnJvd3NlclJlbmRlcmVySWQ7XHJcbiAgICBjb25zdCBldmVudEhhbmRsZXJJZCA9IHJlbmRlclRyZWVGcmFtZS5hdHRyaWJ1dGVFdmVudEhhbmRsZXJJZChhdHRyaWJ1dGVGcmFtZSk7XHJcblxyXG4gICAgaWYgKGV2ZW50SGFuZGxlcklkKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0VHdvQ2hhcnMgPSBhdHRyaWJ1dGVOYW1lLnN1YnN0cmluZygwLCAyKTtcclxuICAgICAgY29uc3QgZXZlbnROYW1lID0gYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoMik7XHJcbiAgICAgIGlmIChmaXJzdFR3b0NoYXJzICE9PSAnb24nIHx8ICFldmVudE5hbWUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dHJpYnV0ZSBoYXMgbm9uemVybyBldmVudCBoYW5kbGVyIElELCBidXQgYXR0cmlidXRlIG5hbWUgJyR7YXR0cmlidXRlTmFtZX0nIGRvZXMgbm90IHN0YXJ0IHdpdGggJ29uJy5gKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmV2ZW50RGVsZWdhdG9yLnNldExpc3RlbmVyKHRvRG9tRWxlbWVudCwgZXZlbnROYW1lLCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmlyc3Qgc2VlIGlmIHdlIGhhdmUgc3BlY2lhbCBoYW5kbGluZyBmb3IgdGhpcyBhdHRyaWJ1dGVcclxuICAgIGlmICghdGhpcy50cnlBcHBseVNwZWNpYWxQcm9wZXJ0eSh0b0RvbUVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZUZyYW1lKSkge1xyXG4gICAgICAvLyBJZiBub3QsIHRyZWF0IGl0IGFzIGEgcmVndWxhciBzdHJpbmctdmFsdWVkIGF0dHJpYnV0ZVxyXG4gICAgICB0b0RvbUVsZW1lbnQuc2V0QXR0cmlidXRlKFxyXG4gICAgICAgIGF0dHJpYnV0ZU5hbWUsXHJcbiAgICAgICAgcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSFcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJ5QXBwbHlTcGVjaWFsUHJvcGVydHkoZWxlbWVudDogRWxlbWVudCwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlciB8IG51bGwpIHtcclxuICAgIHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgICBjYXNlICd2YWx1ZSc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJ5QXBwbHlWYWx1ZVByb3BlcnR5KGVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lKTtcclxuICAgICAgY2FzZSAnY2hlY2tlZCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJ5QXBwbHlDaGVja2VkUHJvcGVydHkoZWxlbWVudCwgYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJ5QXBwbHlWYWx1ZVByb3BlcnR5KGVsZW1lbnQ6IEVsZW1lbnQsIGF0dHJpYnV0ZUZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIHwgbnVsbCkge1xyXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBoYXZlIGJ1aWx0LWluIGJlaGF2aW91ciBmb3IgdGhlaXIgJ3ZhbHVlJyBwcm9wZXJ0eVxyXG4gICAgc3dpdGNoIChlbGVtZW50LnRhZ05hbWUpIHtcclxuICAgICAgY2FzZSAnSU5QVVQnOlxyXG4gICAgICBjYXNlICdTRUxFQ1QnOlxyXG4gICAgICBjYXNlICdURVhUQVJFQSc6IHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgICAgKGVsZW1lbnQgYXMgYW55KS52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnU0VMRUNUJykge1xyXG4gICAgICAgICAgLy8gPHNlbGVjdD4gaXMgc3BlY2lhbCwgaW4gdGhhdCBhbnl0aGluZyB3ZSB3cml0ZSB0byAudmFsdWUgd2lsbCBiZSBsb3N0IGlmIHRoZXJlXHJcbiAgICAgICAgICAvLyBpc24ndCB5ZXQgYSBtYXRjaGluZyA8b3B0aW9uPi4gVG8gbWFpbnRhaW4gdGhlIGV4cGVjdGVkIGJlaGF2aW9yIG5vIG1hdHRlciB0aGVcclxuICAgICAgICAgIC8vIGVsZW1lbnQgaW5zZXJ0aW9uL3VwZGF0ZSBvcmRlciwgcHJlc2VydmUgdGhlIGRlc2lyZWQgdmFsdWUgc2VwYXJhdGVseSBzb1xyXG4gICAgICAgICAgLy8gd2UgY2FuIHJlY292ZXIgaXQgd2hlbiBpbnNlcnRpbmcgYW55IG1hdGNoaW5nIDxvcHRpb24+LlxyXG4gICAgICAgICAgZWxlbWVudFtzZWxlY3RWYWx1ZVByb3BuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdPUFRJT04nOiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVGcmFtZSA/IHJlbmRlclRyZWVGcmFtZS5hdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVGcmFtZSkgOiBudWxsO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2VlIGFib3ZlIGZvciB3aHkgd2UgaGF2ZSB0aGlzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIDxzZWxlY3Q+LzxvcHRpb24+XHJcbiAgICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCAmJiAoc2VsZWN0VmFsdWVQcm9wbmFtZSBpbiBwYXJlbnRFbGVtZW50KSAmJiBwYXJlbnRFbGVtZW50W3NlbGVjdFZhbHVlUHJvcG5hbWVdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy50cnlBcHBseVZhbHVlUHJvcGVydHkocGFyZW50RWxlbWVudCwgYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICAgICAgZGVsZXRlIHBhcmVudEVsZW1lbnRbc2VsZWN0VmFsdWVQcm9wbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cnlBcHBseUNoZWNrZWRQcm9wZXJ0eShlbGVtZW50OiBFbGVtZW50LCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlciB8IG51bGwpIHtcclxuICAgIC8vIENlcnRhaW4gZWxlbWVudHMgaGF2ZSBidWlsdC1pbiBiZWhhdmlvdXIgZm9yIHRoZWlyICdjaGVja2VkJyBwcm9wZXJ0eVxyXG4gICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZUZyYW1lID8gcmVuZGVyVHJlZUZyYW1lLmF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZUZyYW1lKSA6IG51bGw7XHJcbiAgICAgIChlbGVtZW50IGFzIGFueSkuY2hlY2tlZCA9IHZhbHVlICE9PSBudWxsO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0RnJhbWVSYW5nZShjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogU3lzdGVtX0FycmF5PFJlbmRlclRyZWVGcmFtZVBvaW50ZXI+LCBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4RXhjbDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IG9yaWdDaGlsZEluZGV4ID0gY2hpbGRJbmRleDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJbmRleDsgaW5kZXggPCBlbmRJbmRleEV4Y2w7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgZnJhbWUgPSBnZXRUcmVlRnJhbWVQdHIoZnJhbWVzLCBpbmRleCk7XHJcbiAgICAgIGNvbnN0IG51bUNoaWxkcmVuSW5zZXJ0ZWQgPSB0aGlzLmluc2VydEZyYW1lKGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWUsIGluZGV4KTtcclxuICAgICAgY2hpbGRJbmRleCArPSBudW1DaGlsZHJlbkluc2VydGVkO1xyXG5cclxuICAgICAgLy8gU2tpcCBvdmVyIGFueSBkZXNjZW5kYW50cywgc2luY2UgdGhleSBhcmUgYWxyZWFkeSBkZWFsdCB3aXRoIHJlY3Vyc2l2ZWx5XHJcbiAgICAgIGluZGV4ICs9IGNvdW50RGVzY2VuZGFudEZyYW1lcyhmcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChjaGlsZEluZGV4IC0gb3JpZ0NoaWxkSW5kZXgpOyAvLyBUb3RhbCBudW1iZXIgb2YgY2hpbGRyZW4gaW5zZXJ0ZWRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50RGVzY2VuZGFudEZyYW1lcyhmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcik6IG51bWJlciB7XHJcbiAgc3dpdGNoIChyZW5kZXJUcmVlRnJhbWUuZnJhbWVUeXBlKGZyYW1lKSkge1xyXG4gICAgLy8gVGhlIGZvbGxvd2luZyBmcmFtZSB0eXBlcyBoYXZlIGEgc3VidHJlZSBsZW5ndGguIE90aGVyIGZyYW1lcyBtYXkgdXNlIHRoYXQgbWVtb3J5IHNsb3RcclxuICAgIC8vIHRvIG1lYW4gc29tZXRoaW5nIGVsc2UsIHNvIHdlIG11c3Qgbm90IHJlYWQgaXQuIFdlIHNob3VsZCBjb25zaWRlciBoYXZpbmcgbm9taW5hbCBzdWJ0eXBlc1xyXG4gICAgLy8gb2YgUmVuZGVyVHJlZUZyYW1lUG9pbnRlciB0aGF0IHByZXZlbnQgYWNjZXNzIHRvIG5vbi1hcHBsaWNhYmxlIGZpZWxkcy5cclxuICAgIGNhc2UgRnJhbWVUeXBlLmNvbXBvbmVudDpcclxuICAgIGNhc2UgRnJhbWVUeXBlLmVsZW1lbnQ6XHJcbiAgICBjYXNlIEZyYW1lVHlwZS5yZWdpb246XHJcbiAgICAgIHJldHVybiByZW5kZXJUcmVlRnJhbWUuc3VidHJlZUxlbmd0aChmcmFtZSkgLSAxO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWlzZUV2ZW50KGV2ZW50OiBFdmVudCwgYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlciwgY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnRIYW5kbGVySWQ6IG51bWJlciwgZXZlbnRBcmdzOiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4pIHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBpZiAoIXJhaXNlRXZlbnRNZXRob2QpIHtcclxuICAgIHJhaXNlRXZlbnRNZXRob2QgPSBwbGF0Zm9ybS5maW5kTWV0aG9kKFxyXG4gICAgICAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXInLCAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXIuUmVuZGVyaW5nJywgJ0Jyb3dzZXJSZW5kZXJlckV2ZW50RGlzcGF0Y2hlcicsICdEaXNwYXRjaEV2ZW50J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGV2ZW50RGVzY3JpcHRvciA9IHtcclxuICAgIEJyb3dzZXJSZW5kZXJlcklkOiBicm93c2VyUmVuZGVyZXJJZCxcclxuICAgIENvbXBvbmVudElkOiBjb21wb25lbnRJZCxcclxuICAgIEV2ZW50SGFuZGxlcklkOiBldmVudEhhbmRsZXJJZCxcclxuICAgIEV2ZW50QXJnc1R5cGU6IGV2ZW50QXJncy50eXBlXHJcbiAgfTtcclxuXHJcbiAgcGxhdGZvcm0uY2FsbE1ldGhvZChyYWlzZUV2ZW50TWV0aG9kLCBudWxsLCBbXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhKU09OLnN0cmluZ2lmeShldmVudERlc2NyaXB0b3IpKSxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKEpTT04uc3RyaW5naWZ5KGV2ZW50QXJncy5kYXRhKSlcclxuICBdKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvUmVuZGVyaW5nL0Jyb3dzZXJSZW5kZXJlci50cyIsImltcG9ydCB7IFN5c3RlbV9BcnJheSwgUG9pbnRlciB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmNvbnN0IHJlbmRlclRyZWVFZGl0U3RydWN0TGVuZ3RoID0gMTY7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVuZGVyVHJlZUVkaXRQdHIocmVuZGVyVHJlZUVkaXRzOiBTeXN0ZW1fQXJyYXk8UmVuZGVyVHJlZUVkaXRQb2ludGVyPiwgaW5kZXg6IG51bWJlcikge1xyXG4gIHJldHVybiBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKHJlbmRlclRyZWVFZGl0cywgaW5kZXgsIHJlbmRlclRyZWVFZGl0U3RydWN0TGVuZ3RoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlclRyZWVFZGl0ID0ge1xyXG4gIC8vIFRoZSBwcm9wZXJ0aWVzIGFuZCBtZW1vcnkgbGF5b3V0IG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggdGhlIC5ORVQgZXF1aXZhbGVudCBpbiBSZW5kZXJUcmVlRWRpdC5jc1xyXG4gIHR5cGU6IChlZGl0OiBSZW5kZXJUcmVlRWRpdFBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGVkaXQsIDApIGFzIEVkaXRUeXBlLFxyXG4gIHNpYmxpbmdJbmRleDogKGVkaXQ6IFJlbmRlclRyZWVFZGl0UG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZWRpdCwgNCksXHJcbiAgbmV3VHJlZUluZGV4OiAoZWRpdDogUmVuZGVyVHJlZUVkaXRQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChlZGl0LCA4KSxcclxuICByZW1vdmVkQXR0cmlidXRlTmFtZTogKGVkaXQ6IFJlbmRlclRyZWVFZGl0UG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGVkaXQsIDEyKSxcclxufTtcclxuXHJcbmV4cG9ydCBlbnVtIEVkaXRUeXBlIHtcclxuICBwcmVwZW5kRnJhbWUgPSAxLFxyXG4gIHJlbW92ZUZyYW1lID0gMixcclxuICBzZXRBdHRyaWJ1dGUgPSAzLFxyXG4gIHJlbW92ZUF0dHJpYnV0ZSA9IDQsXHJcbiAgdXBkYXRlVGV4dCA9IDUsXHJcbiAgc3RlcEluID0gNixcclxuICBzdGVwT3V0ID0gNyxcclxufVxyXG5cclxuLy8gTm9taW5hbCB0eXBlIHRvIGVuc3VyZSBvbmx5IHZhbGlkIHBvaW50ZXJzIGFyZSBwYXNzZWQgdG8gdGhlIHJlbmRlclRyZWVFZGl0IGZ1bmN0aW9ucy5cclxuLy8gQXQgcnVudGltZSB0aGUgdmFsdWVzIGFyZSBqdXN0IG51bWJlcnMuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyVHJlZUVkaXRQb2ludGVyIGV4dGVuZHMgUG9pbnRlciB7IFJlbmRlclRyZWVFZGl0UG9pbnRlcl9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmluZy9SZW5kZXJUcmVlRWRpdC50cyIsImltcG9ydCB7IFN5c3RlbV9TdHJpbmcsIFN5c3RlbV9BcnJheSwgUG9pbnRlciB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmNvbnN0IHJlbmRlclRyZWVGcmFtZVN0cnVjdExlbmd0aCA9IDI4O1xyXG5cclxuLy8gVG8gbWluaW1pc2UgR0MgcHJlc3N1cmUsIGluc3RlYWQgb2YgaW5zdGFudGlhdGluZyBhIEpTIG9iamVjdCB0byByZXByZXNlbnQgZWFjaCB0cmVlIGZyYW1lLFxyXG4vLyB3ZSB3b3JrIGluIHRlcm1zIG9mIHBvaW50ZXJzIHRvIHRoZSBzdHJ1Y3RzIG9uIHRoZSAuTkVUIGhlYXAsIGFuZCB1c2Ugc3RhdGljIGZ1bmN0aW9ucyB0aGF0XHJcbi8vIGtub3cgaG93IHRvIHJlYWQgcHJvcGVydHkgdmFsdWVzIGZyb20gdGhvc2Ugc3RydWN0cy5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmVlRnJhbWVQdHIocmVuZGVyVHJlZUVudHJpZXM6IFN5c3RlbV9BcnJheTxSZW5kZXJUcmVlRnJhbWVQb2ludGVyPiwgaW5kZXg6IG51bWJlcikge1xyXG4gIHJldHVybiBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKHJlbmRlclRyZWVFbnRyaWVzLCBpbmRleCwgcmVuZGVyVHJlZUZyYW1lU3RydWN0TGVuZ3RoKTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlclRyZWVGcmFtZSA9IHtcclxuICAvLyBUaGUgcHJvcGVydGllcyBhbmQgbWVtb3J5IGxheW91dCBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gUmVuZGVyVHJlZUZyYW1lLmNzXHJcbiAgZnJhbWVUeXBlOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lLCA0KSBhcyBGcmFtZVR5cGUsXHJcbiAgc3VidHJlZUxlbmd0aDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSwgOCkgYXMgRnJhbWVUeXBlLFxyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlSWQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZnJhbWUsIDgpLFxyXG4gIGNvbXBvbmVudElkOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZVBvaW50ZXIpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lLCAxMiksXHJcbiAgZWxlbWVudE5hbWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lLCAxNiksXHJcbiAgdGV4dENvbnRlbnQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lUG9pbnRlcikgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lLCAxNiksXHJcbiAgYXR0cmlidXRlTmFtZTogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUsIDE2KSxcclxuICBhdHRyaWJ1dGVWYWx1ZTogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUsIDI0KSxcclxuICBhdHRyaWJ1dGVFdmVudEhhbmRsZXJJZDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWVQb2ludGVyKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSwgOCksXHJcbn07XHJcblxyXG5leHBvcnQgZW51bSBGcmFtZVR5cGUge1xyXG4gIC8vIFRoZSB2YWx1ZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgLk5FVCBlcXVpdmFsZW50IGluIFJlbmRlclRyZWVGcmFtZVR5cGUuY3NcclxuICBlbGVtZW50ID0gMSxcclxuICB0ZXh0ID0gMixcclxuICBhdHRyaWJ1dGUgPSAzLFxyXG4gIGNvbXBvbmVudCA9IDQsXHJcbiAgcmVnaW9uID0gNSxcclxuICBlbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSA9IDYsXHJcbn1cclxuXHJcbi8vIE5vbWluYWwgdHlwZSB0byBlbnN1cmUgb25seSB2YWxpZCBwb2ludGVycyBhcmUgcGFzc2VkIHRvIHRoZSByZW5kZXJUcmVlRnJhbWUgZnVuY3Rpb25zLlxyXG4vLyBBdCBydW50aW1lIHRoZSB2YWx1ZXMgYXJlIGp1c3QgbnVtYmVycy5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRnJhbWVQb2ludGVyIGV4dGVuZHMgUG9pbnRlciB7IFJlbmRlclRyZWVGcmFtZVBvaW50ZXJfX0RPX05PVF9JTVBMRU1FTlQ6IGFueSB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvUmVuZGVyVHJlZUZyYW1lLnRzIiwiaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcblxyXG5jb25zdCBub25CdWJibGluZ0V2ZW50cyA9IHRvTG9va3VwKFtcclxuICAnYWJvcnQnLCAnYmx1cicsICdjaGFuZ2UnLCAnZXJyb3InLCAnZm9jdXMnLCAnbG9hZCcsICdsb2FkZW5kJywgJ2xvYWRzdGFydCcsICdtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnLFxyXG4gICdwcm9ncmVzcycsICdyZXNldCcsICdzY3JvbGwnLCAnc3VibWl0JywgJ3VubG9hZCcsICdET01Ob2RlSW5zZXJ0ZWRJbnRvRG9jdW1lbnQnLCAnRE9NTm9kZVJlbW92ZWRGcm9tRG9jdW1lbnQnXHJcbl0pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPbkV2ZW50Q2FsbGJhY2sge1xyXG4gIChldmVudDogRXZlbnQsIGNvbXBvbmVudElkOiBudW1iZXIsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsIGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+KTogdm9pZDtcclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZy9yZW1vdmluZyB0aGUgZXZlbnRJbmZvIG9uIGFuIGV4cGFuZG8gcHJvcGVydHkgb24gRE9NIGVsZW1lbnRzLCBhbmRcclxuLy8gY2FsbGluZyBhbiBFdmVudEluZm9TdG9yZSB0aGF0IGRlYWxzIHdpdGggcmVnaXN0ZXJpbmcvdW5yZWdpc3RlcmluZyB0aGUgdW5kZXJseWluZyBkZWxlZ2F0ZWRcclxuLy8gZXZlbnQgbGlzdGVuZXJzIGFzIHJlcXVpcmVkIChhbmQgYWxzbyBtYXBzIGFjdHVhbCBldmVudHMgYmFjayB0byB0aGUgZ2l2ZW4gY2FsbGJhY2spLlxyXG5leHBvcnQgY2xhc3MgRXZlbnREZWxlZ2F0b3Ige1xyXG4gIHByaXZhdGUgc3RhdGljIG5leHRFdmVudERlbGVnYXRvcklkID0gMDtcclxuICBwcml2YXRlIGV2ZW50c0NvbGxlY3Rpb25LZXk6IHN0cmluZztcclxuICBwcml2YXRlIGV2ZW50SW5mb1N0b3JlOiBFdmVudEluZm9TdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvbkV2ZW50OiBPbkV2ZW50Q2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGV2ZW50RGVsZWdhdG9ySWQgPSArK0V2ZW50RGVsZWdhdG9yLm5leHRFdmVudERlbGVnYXRvcklkO1xyXG4gICAgdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5ID0gYF9ibGF6b3JFdmVudHNfJHtldmVudERlbGVnYXRvcklkfWA7XHJcbiAgICB0aGlzLmV2ZW50SW5mb1N0b3JlID0gbmV3IEV2ZW50SW5mb1N0b3JlKHRoaXMub25HbG9iYWxFdmVudC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRMaXN0ZW5lcihlbGVtZW50OiBFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgLy8gRW5zdXJlIHdlIGhhdmUgYSBwbGFjZSB0byBzdG9yZSBldmVudCBpbmZvIGZvciB0aGlzIGVsZW1lbnRcclxuICAgIGxldCBpbmZvRm9yRWxlbWVudDogRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50ID0gZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgaWYgKCFpbmZvRm9yRWxlbWVudCkge1xyXG4gICAgICBpbmZvRm9yRWxlbWVudCA9IGVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmZvRm9yRWxlbWVudC5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XHJcbiAgICAgIC8vIFdlIGNhbiBjaGVhcGx5IHVwZGF0ZSB0aGUgaW5mbyBvbiB0aGUgZXhpc3Rpbmcgb2JqZWN0IGFuZCBkb24ndCBuZWVkIGFueSBvdGhlciBob3VzZWtlZXBpbmdcclxuICAgICAgY29uc3Qgb2xkSW5mbyA9IGluZm9Gb3JFbGVtZW50W2V2ZW50TmFtZV07XHJcbiAgICAgIHRoaXMuZXZlbnRJbmZvU3RvcmUudXBkYXRlKG9sZEluZm8uZXZlbnRIYW5kbGVySWQsIGV2ZW50SGFuZGxlcklkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEdvIHRocm91Z2ggdGhlIHdob2xlIGZsb3cgd2hpY2ggbWlnaHQgaW52b2x2ZSByZWdpc3RlcmluZyBhIG5ldyBnbG9iYWwgaGFuZGxlclxyXG4gICAgICBjb25zdCBuZXdJbmZvID0geyBlbGVtZW50LCBldmVudE5hbWUsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCB9O1xyXG4gICAgICB0aGlzLmV2ZW50SW5mb1N0b3JlLmFkZChuZXdJbmZvKTtcclxuICAgICAgaW5mb0ZvckVsZW1lbnRbZXZlbnROYW1lXSA9IG5ld0luZm87XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgLy8gVGhpcyBtZXRob2QgZ2V0cyBjYWxsZWQgd2hlbmV2ZXIgdGhlIC5ORVQtc2lkZSBjb2RlIHJlcG9ydHMgdGhhdCBhIGNlcnRhaW4gZXZlbnQgaGFuZGxlclxyXG4gICAgLy8gaGFzIGJlZW4gZGlzcG9zZWQuIEhvd2V2ZXIgd2Ugd2lsbCBhbHJlYWR5IGhhdmUgZGlzcG9zZWQgdGhlIGluZm8gYWJvdXQgdGhhdCBoYW5kbGVyIGlmXHJcbiAgICAvLyB0aGUgZXZlbnRIYW5kbGVySWQgZm9yIHRoZSAoZWxlbWVudCxldmVudE5hbWUpIHBhaXIgd2FzIHJlcGxhY2VkIGR1cmluZyBkaWZmIGFwcGxpY2F0aW9uLlxyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuZXZlbnRJbmZvU3RvcmUucmVtb3ZlKGV2ZW50SGFuZGxlcklkKTtcclxuICAgIGlmIChpbmZvKSB7XHJcbiAgICAgIC8vIExvb2tzIGxpa2UgdGhpcyBldmVudCBoYW5kbGVyIHdhc24ndCBhbHJlYWR5IGRpc3Bvc2VkXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgYXNzb2NpYXRlZCBkYXRhIGZyb20gdGhlIERPTSBlbGVtZW50XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbmZvLmVsZW1lbnQ7XHJcbiAgICAgIGlmIChlbGVtZW50Lmhhc093blByb3BlcnR5KHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSkpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50RXZlbnRJbmZvczogRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50ID0gZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50RXZlbnRJbmZvc1tpbmZvLmV2ZW50TmFtZV07XHJcbiAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVsZW1lbnRFdmVudEluZm9zKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uR2xvYmFsRXZlbnQoZXZ0OiBFdmVudCkge1xyXG4gICAgaWYgKCEoZXZ0LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTY2FuIHVwIHRoZSBlbGVtZW50IGhpZXJhcmNoeSwgbG9va2luZyBmb3IgYW55IG1hdGNoaW5nIHJlZ2lzdGVyZWQgZXZlbnQgaGFuZGxlcnNcclxuICAgIGxldCBjYW5kaWRhdGVFbGVtZW50ID0gZXZ0LnRhcmdldCBhcyBFbGVtZW50IHwgbnVsbDtcclxuICAgIGxldCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPiB8IG51bGwgPSBudWxsOyAvLyBQb3B1bGF0ZSBsYXppbHlcclxuICAgIGNvbnN0IGV2ZW50SXNOb25CdWJibGluZyA9IG5vbkJ1YmJsaW5nRXZlbnRzLmhhc093blByb3BlcnR5KGV2dC50eXBlKTtcclxuICAgIHdoaWxlIChjYW5kaWRhdGVFbGVtZW50KSB7XHJcbiAgICAgIGlmIChjYW5kaWRhdGVFbGVtZW50Lmhhc093blByb3BlcnR5KHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSkpIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVySW5mb3MgPSBjYW5kaWRhdGVFbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICAgICAgaWYgKGhhbmRsZXJJbmZvcy5oYXNPd25Qcm9wZXJ0eShldnQudHlwZSkpIHtcclxuICAgICAgICAgIC8vIFdlIGFyZSBnb2luZyB0byByYWlzZSBhbiBldmVudCBmb3IgdGhpcyBlbGVtZW50LCBzbyBwcmVwYXJlIGluZm8gbmVlZGVkIGJ5IHRoZSAuTkVUIGNvZGVcclxuICAgICAgICAgIGlmICghZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50QXJncyA9IEV2ZW50Rm9yRG90TmV0LmZyb21ET01FdmVudChldnQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGhhbmRsZXJJbmZvID0gaGFuZGxlckluZm9zW2V2dC50eXBlXTtcclxuICAgICAgICAgIHRoaXMub25FdmVudChldnQsIGhhbmRsZXJJbmZvLmNvbXBvbmVudElkLCBoYW5kbGVySW5mby5ldmVudEhhbmRsZXJJZCwgZXZlbnRBcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbmRpZGF0ZUVsZW1lbnQgPSBldmVudElzTm9uQnViYmxpbmcgPyBudWxsIDogY2FuZGlkYXRlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZyBhbmQgcmVtb3ZpbmcgdGhlIGdsb2JhbCBsaXN0ZW5lciB3aGVuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzXHJcbi8vIGZvciBhIGdpdmVuIGV2ZW50IG5hbWUgY2hhbmdlcyBiZXR3ZWVuIHplcm8gYW5kIG5vbnplcm9cclxuY2xhc3MgRXZlbnRJbmZvU3RvcmUge1xyXG4gIHByaXZhdGUgaW5mb3NCeUV2ZW50SGFuZGxlcklkOiB7IFtldmVudEhhbmRsZXJJZDogbnVtYmVyXTogRXZlbnRIYW5kbGVySW5mbyB9ID0ge307XHJcbiAgcHJpdmF0ZSBjb3VudEJ5RXZlbnROYW1lOiB7IFtldmVudE5hbWU6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2xvYmFsTGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaW5mbzogRXZlbnRIYW5kbGVySW5mbykge1xyXG4gICAgaWYgKHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2luZm8uZXZlbnRIYW5kbGVySWRdKSB7XHJcbiAgICAgIC8vIFNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCB3ZSB3YW50IHRvIGtub3cgaWYgaXQgZG9lc1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50ICR7aW5mby5ldmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbaW5mby5ldmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG5cclxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgaWYgKHRoaXMuY291bnRCeUV2ZW50TmFtZS5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XHJcbiAgICAgIHRoaXMuY291bnRCeUV2ZW50TmFtZVtldmVudE5hbWVdKys7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9IDE7XHJcblxyXG4gICAgICAvLyBUbyBtYWtlIGRlbGVnYXRpb24gd29yayB3aXRoIG5vbi1idWJibGluZyBldmVudHMsIHJlZ2lzdGVyIGEgJ2NhcHR1cmUnIGxpc3RlbmVyLlxyXG4gICAgICAvLyBXZSBwcmVzZXJ2ZSB0aGUgbm9uLWJ1YmJsaW5nIGJlaGF2aW9yIGJ5IG9ubHkgZGlzcGF0Y2hpbmcgc3VjaCBldmVudHMgdG8gdGhlIHRhcmdldGVkIGVsZW1lbnQuXHJcbiAgICAgIGNvbnN0IHVzZUNhcHR1cmUgPSBub25CdWJibGluZ0V2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKG9sZEV2ZW50SGFuZGxlcklkOiBudW1iZXIsIG5ld0V2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZC5oYXNPd25Qcm9wZXJ0eShuZXdFdmVudEhhbmRsZXJJZCkpIHtcclxuICAgICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8ga25vdyBpZiBpdCBkb2VzXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgJHtuZXdFdmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugd2UncmUganVzdCB1cGRhdGluZyB0aGUgZXZlbnQgaGFuZGxlciBJRCwgdGhlcmUncyBubyBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2xvYmFsIGNvdW50c1xyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW29sZEV2ZW50SGFuZGxlcklkXTtcclxuICAgIGRlbGV0ZSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtvbGRFdmVudEhhbmRsZXJJZF07XHJcbiAgICBpbmZvLmV2ZW50SGFuZGxlcklkID0gbmV3RXZlbnRIYW5kbGVySWQ7XHJcbiAgICB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtuZXdFdmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShldmVudEhhbmRsZXJJZDogbnVtYmVyKTogRXZlbnRIYW5kbGVySW5mbyB7XHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbZXZlbnRIYW5kbGVySWRdO1xyXG4gICAgaWYgKGluZm8pIHtcclxuICAgICAgZGVsZXRlIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2V2ZW50SGFuZGxlcklkXTtcclxuXHJcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgICBpZiAoLS10aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9PT0gMCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5mbztcclxuICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQge1xyXG4gIC8vIEFsdGhvdWdoIHdlICpjb3VsZCogdHJhY2sgbXVsdGlwbGUgZXZlbnQgaGFuZGxlcnMgcGVyIChlbGVtZW50LCBldmVudE5hbWUpIHBhaXJcclxuICAvLyAoc2luY2UgdGhleSBoYXZlIGRpc3RpbmN0IGV2ZW50SGFuZGxlcklkIHZhbHVlcyksIHRoZXJlJ3Mgbm8gcG9pbnQgZG9pbmcgc28gYmVjYXVzZVxyXG4gIC8vIG91ciBwcm9ncmFtbWluZyBtb2RlbCBpcyB0aGF0IHlvdSBkZWNsYXJlIGV2ZW50IGhhbmRsZXJzIGFzIGF0dHJpYnV0ZXMuIEFuIGVsZW1lbnRcclxuICAvLyBjYW4gb25seSBoYXZlIG9uZSBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIG5hbWUsIGhlbmNlIG9ubHkgb25lIGV2ZW50IGhhbmRsZXIgd2l0aFxyXG4gIC8vIHRoYXQgbmFtZSBhdCBhbnkgb25lIHRpbWUuXHJcbiAgLy8gU28gdG8ga2VlcCB0aGluZ3Mgc2ltcGxlLCBvbmx5IHRyYWNrIG9uZSBFdmVudEhhbmRsZXJJbmZvIHBlciAoZWxlbWVudCwgZXZlbnROYW1lKVxyXG4gIFtldmVudE5hbWU6IHN0cmluZ106IEV2ZW50SGFuZGxlckluZm9cclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50SGFuZGxlckluZm8ge1xyXG4gIGVsZW1lbnQ6IEVsZW1lbnQ7XHJcbiAgZXZlbnROYW1lOiBzdHJpbmc7XHJcbiAgY29tcG9uZW50SWQ6IG51bWJlcjtcclxuICBldmVudEhhbmRsZXJJZDogbnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0xvb2t1cChpdGVtczogc3RyaW5nW10pOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XHJcbiAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgaXRlbXMuZm9yRWFjaCh2YWx1ZSA9PiB7IHJlc3VsdFt2YWx1ZV0gPSB0cnVlOyB9KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvRXZlbnREZWxlZ2F0b3IudHMiLCJleHBvcnQgY2xhc3MgRXZlbnRGb3JEb3ROZXQ8VERhdGEgZXh0ZW5kcyBVSUV2ZW50QXJncz4ge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0eXBlOiBFdmVudEFyZ3NUeXBlLCBwdWJsaWMgcmVhZG9ubHkgZGF0YTogVERhdGEpIHtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tRE9NRXZlbnQoZXZlbnQ6IEV2ZW50KTogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+IHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgRWxlbWVudDtcclxuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG5cclxuICAgICAgY2FzZSAnY2hhbmdlJzoge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldElzQ2hlY2tib3ggPSBpc0NoZWNrYm94KGVsZW1lbnQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGFyZ2V0SXNDaGVja2JveCA/ICEhZWxlbWVudFsnY2hlY2tlZCddIDogZWxlbWVudFsndmFsdWUnXTtcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJQ2hhbmdlRXZlbnRBcmdzPignY2hhbmdlJywgeyBUeXBlOiBldmVudC50eXBlLCBWYWx1ZTogbmV3VmFsdWUgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhc2UgJ2NvcHknOlxyXG4gICAgICBjYXNlICdjdXQnOlxyXG4gICAgICBjYXNlICdwYXN0ZSc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUNsaXBib2FyZEV2ZW50QXJncz4oJ2NsaXBib2FyZCcsIHsgVHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2RyYWcnOlxyXG4gICAgICBjYXNlICdkcmFnZW5kJzpcclxuICAgICAgY2FzZSAnZHJhZ2VudGVyJzpcclxuICAgICAgY2FzZSAnZHJhZ2xlYXZlJzpcclxuICAgICAgY2FzZSAnZHJhZ292ZXInOlxyXG4gICAgICBjYXNlICdkcmFnc3RhcnQnOlxyXG4gICAgICBjYXNlICdkcm9wJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRHJhZ0V2ZW50QXJncz4oJ2RyYWcnLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVByb2dyZXNzRXZlbnRBcmdzPignZXJyb3InLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcblxyXG4gICAgICBjYXNlICdmb2N1cyc6XHJcbiAgICAgIGNhc2UgJ2JsdXInOlxyXG4gICAgICBjYXNlICdmb2N1c2luJzpcclxuICAgICAgY2FzZSAnZm9jdXNvdXQnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlGb2N1c0V2ZW50QXJncz4oJ2ZvY3VzJywgeyBUeXBlOiBldmVudC50eXBlIH0pO1xyXG5cclxuICAgICAgY2FzZSAna2V5ZG93bic6XHJcbiAgICAgIGNhc2UgJ2tleXVwJzpcclxuICAgICAgY2FzZSAna2V5cHJlc3MnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlLZXlib2FyZEV2ZW50QXJncz4oJ2tleWJvYXJkJywgeyBUeXBlOiBldmVudC50eXBlLCBLZXk6IChldmVudCBhcyBhbnkpLmtleSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgY2FzZSAnbW91c2VvdmVyJzpcclxuICAgICAgY2FzZSAnbW91c2VvdXQnOlxyXG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxyXG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxyXG4gICAgICBjYXNlICdtb3VzZXVwJzpcclxuICAgICAgY2FzZSAnZGJsY2xpY2snOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlNb3VzZUV2ZW50QXJncz4oJ21vdXNlJywgeyBUeXBlOiBldmVudC50eXBlIH0pO1xyXG5cclxuICAgICAgY2FzZSAnY29udGV4dG1lbnUnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlQb2ludGVyRXZlbnRBcmdzPigncG9pbnRlcicsIHsgVHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJUHJvZ3Jlc3NFdmVudEFyZ3M+KCdwcm9ncmVzcycsIHsgVHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ3RvdWNoY2FuY2VsJzpcclxuICAgICAgY2FzZSAndG91Y2hlbmQnOlxyXG4gICAgICBjYXNlICd0b3VjaG1vdmUnOlxyXG4gICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJVG91Y2hFdmVudEFyZ3M+KCd0b3VjaCcsIHsgVHlwZTogZXZlbnQudHlwZSB9KTtcclxuXHJcbiAgICAgIGNhc2UgJ21vdXNld2hlZWwnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlXaGVlbEV2ZW50QXJncz4oJ3doZWVsJywgeyBUeXBlOiBldmVudC50eXBlIH0pO1xyXG5cclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4oJ3Vua25vd24nLCB7IFR5cGU6IGV2ZW50LnR5cGUgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0NoZWNrYm94KGVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsKSB7XHJcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICdjaGVja2JveCc7XHJcbn1cclxuXHJcbi8vIFRoZSBmb2xsb3dpbmcgaW50ZXJmYWNlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSBVSUV2ZW50QXJncyBDIyBjbGFzc2VzXHJcblxyXG50eXBlIEV2ZW50QXJnc1R5cGUgPSAnY2hhbmdlJyB8ICdjbGlwYm9hcmQnIHwgJ2RyYWcnIHwgJ2Vycm9yJyB8ICdmb2N1cycgfCAna2V5Ym9hcmQnIHwgJ21vdXNlJyB8ICdwb2ludGVyJyB8ICdwcm9ncmVzcycgfCAndG91Y2gnIHwgJ3Vua25vd24nIHwgJ3doZWVsJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVUlFdmVudEFyZ3Mge1xyXG4gIFR5cGU6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJQ2hhbmdlRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG4gIFZhbHVlOiBzdHJpbmcgfCBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlDbGlwYm9hcmRFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSURyYWdFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUVycm9yRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlGb2N1c0V2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJS2V5Ym9hcmRFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgS2V5OiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSU1vdXNlRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlQb2ludGVyRXZlbnRBcmdzIGV4dGVuZHMgVUlNb3VzZUV2ZW50QXJncyB7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVByb2dyZXNzRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlUb3VjaEV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJV2hlZWxFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JlbmRlcmluZy9FdmVudEZvckRvdE5ldC50cyIsIi8qXHJcbiAgQSBMb2dpY2FsRWxlbWVudCBwbGF5cyB0aGUgc2FtZSByb2xlIGFzIGFuIEVsZW1lbnQgaW5zdGFuY2UgZnJvbSB0aGUgcG9pbnQgb2YgdmlldyBvZiB0aGVcclxuICBBUEkgY29uc3VtZXIuIEluc2VydGluZyBhbmQgcmVtb3ZpbmcgbG9naWNhbCBlbGVtZW50cyB1cGRhdGVzIHRoZSBicm93c2VyIERPTSBqdXN0IHRoZSBzYW1lLlxyXG5cclxuICBUaGUgZGlmZmVyZW5jZSBpcyB0aGF0LCB1bmxpa2UgcmVndWxhciBET00gbXV0YXRpb24gQVBJcywgdGhlIExvZ2ljYWxFbGVtZW50IEFQSXMgZG9uJ3QgdXNlXHJcbiAgdGhlIHVuZGVybHlpbmcgRE9NIHN0cnVjdHVyZSBhcyB0aGUgZGF0YSBzdG9yYWdlIGZvciB0aGUgZWxlbWVudCBoaWVyYXJjaHkuIEluc3RlYWQsIHRoZVxyXG4gIExvZ2ljYWxFbGVtZW50IEFQSXMgdGFrZSBjYXJlIG9mIHRyYWNraW5nIGhpZXJhcmNoaWNhbCByZWxhdGlvbnNoaXBzIHNlcGFyYXRlbHkuIFRoZSBwb2ludFxyXG4gIG9mIHRoaXMgaXMgdG8gcGVybWl0IGEgbG9naWNhbCB0cmVlIHN0cnVjdHVyZSBpbiB3aGljaCBwYXJlbnQvY2hpbGQgcmVsYXRpb25zaGlwcyBkb24ndFxyXG4gIGhhdmUgdG8gYmUgbWF0ZXJpYWxpemVkIGluIHRlcm1zIG9mIERPTSBlbGVtZW50IHBhcmVudC9jaGlsZCByZWxhdGlvbnNoaXBzLiBBbmQgdGhlIHJlYXNvblxyXG4gIHdoeSB3ZSB3YW50IHRoYXQgaXMgc28gdGhhdCBoaWVyYXJjaGllcyBvZiBCbGF6b3IgY29tcG9uZW50cyBjYW4gYmUgdHJhY2tlZCBldmVuIHdoZW4gdGhvc2VcclxuICBjb21wb25lbnRzJyByZW5kZXIgb3V0cHV0IG5lZWQgbm90IGJlIGEgc2luZ2xlIGxpdGVyYWwgRE9NIGVsZW1lbnQuXHJcblxyXG4gIENvbnN1bWVycyBvZiB0aGUgQVBJIGRvbid0IG5lZWQgdG8ga25vdyBhYm91dCB0aGUgaW1wbGVtZW50YXRpb24sIGJ1dCBob3cgaXQncyBkb25lIGlzOlxyXG4gIC0gRWFjaCBMb2dpY2FsRWxlbWVudCBpcyBtYXRlcmlhbGl6ZWQgaW4gdGhlIERPTSBhcyBlaXRoZXI6XHJcbiAgICAtIEEgTm9kZSBpbnN0YW5jZSwgZm9yIGFjdHVhbCBOb2RlIGluc3RhbmNlcyBpbnNlcnRlZCB1c2luZyAnaW5zZXJ0TG9naWNhbENoaWxkJyBvclxyXG4gICAgICBmb3IgRWxlbWVudCBpbnN0YW5jZXMgcHJvbW90ZWQgdG8gTG9naWNhbEVsZW1lbnQgdmlhICd0b0xvZ2ljYWxFbGVtZW50J1xyXG4gICAgLSBBIENvbW1lbnQgaW5zdGFuY2UsIGZvciAnbG9naWNhbCBjb250YWluZXInIGluc3RhbmNlcyBpbnNlcnRlZCB1c2luZyAnY3JlYXRlQW5kSW5zZXJ0TG9naWNhbENvbnRhaW5lcidcclxuICAtIFRoZW4sIG9uIHRoYXQgaW5zdGFuY2UgKGkuZS4sIHRoZSBOb2RlIG9yIENvbW1lbnQpLCB3ZSBzdG9yZSBhbiBhcnJheSBvZiAnbG9naWNhbCBjaGlsZHJlbidcclxuICAgIGluc3RhbmNlcywgZS5nLixcclxuICAgICAgW2ZpcnN0Q2hpbGQsIHNlY29uZENoaWxkLCB0aGlyZENoaWxkLCAuLi5dXHJcbiAgICAuLi4gcGx1cyB3ZSBzdG9yZSBhIHJlZmVyZW5jZSB0byB0aGUgJ2xvZ2ljYWwgcGFyZW50JyAoaWYgYW55KVxyXG4gIC0gVGhlICdsb2dpY2FsIGNoaWxkcmVuJyBhcnJheSBtZWFucyB3ZSBjYW4gbG9vayB1cCBpbiBPKDEpOlxyXG4gICAgLSBUaGUgbnVtYmVyIG9mIGxvZ2ljYWwgY2hpbGRyZW4gKG5vdCBjdXJyZW50bHkgaW1wbGVtZW50ZWQgYmVjYXVzZSBub3QgcmVxdWlyZWQsIGJ1dCB0cml2aWFsKVxyXG4gICAgLSBUaGUgbG9naWNhbCBjaGlsZCBhdCBhbnkgZ2l2ZW4gaW5kZXhcclxuICAtIFdoZW5ldmVyIGEgbG9naWNhbCBjaGlsZCBpcyBhZGRlZCBvciByZW1vdmVkLCB3ZSB1cGRhdGUgdGhlIHBhcmVudCdzIGFycmF5IG9mIGxvZ2ljYWwgY2hpbGRyZW5cclxuKi9cclxuXHJcbmNvbnN0IGxvZ2ljYWxDaGlsZHJlblByb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckxvZ2ljYWxDaGlsZHJlbicpO1xyXG5jb25zdCBsb2dpY2FsUGFyZW50UHJvcG5hbWUgPSBjcmVhdGVTeW1ib2xPckZhbGxiYWNrKCdfYmxhem9yTG9naWNhbFBhcmVudCcpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvTG9naWNhbEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCkge1xyXG4gIGlmIChlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOZXcgbG9naWNhbCBlbGVtZW50cyBtdXN0IHN0YXJ0IGVtcHR5Jyk7XHJcbiAgfVxyXG5cclxuICBlbGVtZW50W2xvZ2ljYWxDaGlsZHJlblByb3BuYW1lXSA9IFtdO1xyXG4gIHJldHVybiBlbGVtZW50IGFzIGFueSBhcyBMb2dpY2FsRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFuZEluc2VydExvZ2ljYWxDb250YWluZXIocGFyZW50OiBMb2dpY2FsRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKTogTG9naWNhbEVsZW1lbnQge1xyXG4gIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCchJyk7XHJcbiAgaW5zZXJ0TG9naWNhbENoaWxkKGNvbnRhaW5lckVsZW1lbnQsIHBhcmVudCwgY2hpbGRJbmRleCk7XHJcbiAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQgYXMgYW55IGFzIExvZ2ljYWxFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0TG9naWNhbENoaWxkKGNoaWxkOiBOb2RlLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpIHtcclxuICBjb25zdCBjaGlsZEFzTG9naWNhbEVsZW1lbnQgPSBjaGlsZCBhcyBhbnkgYXMgTG9naWNhbEVsZW1lbnQ7XHJcbiAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgY29uc3QgZXhpc3RpbmdHcmFuZGNoaWxkcmVuID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRBc0xvZ2ljYWxFbGVtZW50KTtcclxuICAgIGlmIChleGlzdGluZ0dyYW5kY2hpbGRyZW4gJiYgZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkoY2hpbGRBc0xvZ2ljYWxFbGVtZW50KS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIFRoZXJlJ3Mgbm90aGluZyB0byBzdG9wIHVzIGltcGxlbWVudGluZyBzdXBwb3J0IGZvciB0aGlzIHNjZW5hcmlvLCBhbmQgaXQncyBub3QgZGlmZmljdWx0XHJcbiAgICAgIC8vIChhZnRlciBpbnNlcnRpbmcgJ2NoaWxkJyBpdHNlbGYsIGFsc28gaXRlcmF0ZSB0aHJvdWdoIGl0cyBsb2dpY2FsIGNoaWxkcmVuIGFuZCBwaHlzaWNhbGx5XHJcbiAgICAgIC8vIHB1dCB0aGVtIGFzIGZvbGxvd2luZy1zaWJsaW5ncyBpbiB0aGUgRE9NKS4gSG93ZXZlciB0aGVyZSdzIG5vIHNjZW5hcmlvIHRoYXQgcmVxdWlyZXMgaXRcclxuICAgICAgLy8gcHJlc2VudGx5LCBzbyBpZiB3ZSBkaWQgaW1wbGVtZW50IGl0IHRoZXJlJ2QgYmUgbm8gZ29vZCB3YXkgdG8gaGF2ZSB0ZXN0cyBmb3IgaXQuXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkOiBpbnNlcnRpbmcgbm9uLWVtcHR5IGxvZ2ljYWwgY29udGFpbmVyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoZ2V0TG9naWNhbFBhcmVudChjaGlsZEFzTG9naWNhbEVsZW1lbnQpKSB7XHJcbiAgICAvLyBMaWtld2lzZSwgd2UgY291bGQgZWFzaWx5IHN1cHBvcnQgdGhpcyBzY2VuYXJpbyB0b28gKGluIHRoaXMgJ2lmJyBibG9jaywganVzdCBzcGxpY2VcclxuICAgIC8vIG91dCAnY2hpbGQnIGZyb20gdGhlIGxvZ2ljYWwgY2hpbGRyZW4gYXJyYXkgb2YgaXRzIHByZXZpb3VzIGxvZ2ljYWwgcGFyZW50IGJ5IHVzaW5nXHJcbiAgICAvLyBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB0byBkZXRlcm1pbmUgaXRzIHByZXZpb3VzIHNpYmxpbmcgaW5kZXgpLlxyXG4gICAgLy8gQnV0IGFnYWluLCBzaW5jZSB0aGVyZSdzIG5vdCBjdXJyZW50bHkgYW55IHNjZW5hcmlvIHRoYXQgd291bGQgdXNlIGl0LCB3ZSB3b3VsZCBub3RcclxuICAgIC8vIGhhdmUgYW55IHRlc3QgY292ZXJhZ2UgZm9yIHN1Y2ggYW4gaW1wbGVtZW50YXRpb24uXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZDogbW92aW5nIGV4aXN0aW5nIGxvZ2ljYWwgY2hpbGRyZW4nKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5ld1NpYmxpbmdzID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KTtcclxuICBpZiAoY2hpbGRJbmRleCA8IG5ld1NpYmxpbmdzLmxlbmd0aCkge1xyXG4gICAgLy8gSW5zZXJ0XHJcbiAgICBjb25zdCBuZXh0U2libGluZyA9IG5ld1NpYmxpbmdzW2NoaWxkSW5kZXhdIGFzIGFueSBhcyBOb2RlO1xyXG4gICAgbmV4dFNpYmxpbmcucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKGNoaWxkLCBuZXh0U2libGluZyk7XHJcbiAgICBuZXdTaWJsaW5ncy5zcGxpY2UoY2hpbGRJbmRleCwgMCwgY2hpbGRBc0xvZ2ljYWxFbGVtZW50KTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQXBwZW5kXHJcbiAgICBhcHBlbmREb21Ob2RlKGNoaWxkLCBwYXJlbnQpO1xyXG4gICAgbmV3U2libGluZ3MucHVzaChjaGlsZEFzTG9naWNhbEVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgY2hpbGRBc0xvZ2ljYWxFbGVtZW50W2xvZ2ljYWxQYXJlbnRQcm9wbmFtZV0gPSBwYXJlbnQ7XHJcbiAgaWYgKCEobG9naWNhbENoaWxkcmVuUHJvcG5hbWUgaW4gY2hpbGRBc0xvZ2ljYWxFbGVtZW50KSkge1xyXG4gICAgY2hpbGRBc0xvZ2ljYWxFbGVtZW50W2xvZ2ljYWxDaGlsZHJlblByb3BuYW1lXSA9IFtdO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUxvZ2ljYWxDaGlsZChwYXJlbnQ6IExvZ2ljYWxFbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIpIHtcclxuICBjb25zdCBjaGlsZHJlbkFycmF5ID0gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KTtcclxuICBjb25zdCBjaGlsZFRvUmVtb3ZlID0gY2hpbGRyZW5BcnJheS5zcGxpY2UoY2hpbGRJbmRleCwgMSlbMF07XHJcblxyXG4gIC8vIElmIGl0J3MgYSBsb2dpY2FsIGNvbnRhaW5lciwgYWxzbyByZW1vdmUgaXRzIGRlc2NlbmRhbnRzXHJcbiAgaWYgKGNoaWxkVG9SZW1vdmUgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICBjb25zdCBncmFuZGNoaWxkcmVuQXJyYXkgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShjaGlsZFRvUmVtb3ZlKTtcclxuICAgIHdoaWxlIChncmFuZGNoaWxkcmVuQXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICByZW1vdmVMb2dpY2FsQ2hpbGQoY2hpbGRUb1JlbW92ZSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGaW5hbGx5LCByZW1vdmUgdGhlIG5vZGUgaXRzZWxmXHJcbiAgY29uc3QgZG9tTm9kZVRvUmVtb3ZlID0gY2hpbGRUb1JlbW92ZSBhcyBhbnkgYXMgTm9kZTtcclxuICBkb21Ob2RlVG9SZW1vdmUucGFyZW50Tm9kZSEucmVtb3ZlQ2hpbGQoZG9tTm9kZVRvUmVtb3ZlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExvZ2ljYWxQYXJlbnQoZWxlbWVudDogTG9naWNhbEVsZW1lbnQpOiBMb2dpY2FsRWxlbWVudCB8IG51bGwge1xyXG4gIHJldHVybiAoZWxlbWVudFtsb2dpY2FsUGFyZW50UHJvcG5hbWVdIGFzIExvZ2ljYWxFbGVtZW50KSB8fCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9naWNhbENoaWxkKHBhcmVudDogTG9naWNhbEVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcik6IExvZ2ljYWxFbGVtZW50IHtcclxuICByZXR1cm4gZ2V0TG9naWNhbENoaWxkcmVuQXJyYXkocGFyZW50KVtjaGlsZEluZGV4XTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3ZnRWxlbWVudChlbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIHJldHVybiBnZXRDbG9zZXN0RG9tRWxlbWVudChlbGVtZW50KS5uYW1lc3BhY2VVUkkgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExvZ2ljYWxDaGlsZHJlbkFycmF5KGVsZW1lbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgcmV0dXJuIGVsZW1lbnRbbG9naWNhbENoaWxkcmVuUHJvcG5hbWVdIGFzIExvZ2ljYWxFbGVtZW50W107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExvZ2ljYWxOZXh0U2libGluZyhlbGVtZW50OiBMb2dpY2FsRWxlbWVudCk6IExvZ2ljYWxFbGVtZW50IHwgbnVsbCB7XHJcbiAgY29uc3Qgc2libGluZ3MgPSBnZXRMb2dpY2FsQ2hpbGRyZW5BcnJheShnZXRMb2dpY2FsUGFyZW50KGVsZW1lbnQpISk7XHJcbiAgY29uc3Qgc2libGluZ0luZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChzaWJsaW5ncywgZWxlbWVudCk7XHJcbiAgcmV0dXJuIHNpYmxpbmdzW3NpYmxpbmdJbmRleCArIDFdIHx8IG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENsb3Nlc3REb21FbGVtZW50KGxvZ2ljYWxFbGVtZW50OiBMb2dpY2FsRWxlbWVudCkge1xyXG4gIGlmIChsb2dpY2FsRWxlbWVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgIHJldHVybiBsb2dpY2FsRWxlbWVudDtcclxuICB9IGVsc2UgaWYgKGxvZ2ljYWxFbGVtZW50IGluc3RhbmNlb2YgQ29tbWVudCkge1xyXG4gICAgcmV0dXJuIGxvZ2ljYWxFbGVtZW50LnBhcmVudE5vZGUhIGFzIEVsZW1lbnQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGEgdmFsaWQgbG9naWNhbCBlbGVtZW50Jyk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmREb21Ob2RlKGNoaWxkOiBOb2RlLCBwYXJlbnQ6IExvZ2ljYWxFbGVtZW50KSB7XHJcbiAgLy8gVGhpcyBmdW5jdGlvbiBvbmx5IHB1dHMgJ2NoaWxkJyBpbnRvIHRoZSBET00gaW4gdGhlIHJpZ2h0IHBsYWNlIHJlbGF0aXZlIHRvICdwYXJlbnQnXHJcbiAgLy8gSXQgZG9lcyBub3QgdXBkYXRlIHRoZSBsb2dpY2FsIGNoaWxkcmVuIGFycmF5IG9mIGFueXRoaW5nXHJcbiAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgfSBlbHNlIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBDb21tZW50KSB7XHJcbiAgICBjb25zdCBwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcgPSBnZXRMb2dpY2FsTmV4dFNpYmxpbmcocGFyZW50KSBhcyBhbnkgYXMgTm9kZTtcclxuICAgIGlmIChwYXJlbnRMb2dpY2FsTmV4dFNpYmxpbmcpIHtcclxuICAgICAgLy8gU2luY2UgdGhlIHBhcmVudCBoYXMgYSBsb2dpY2FsIG5leHQtc2libGluZywgaXRzIGFwcGVuZGVkIGNoaWxkIGdvZXMgcmlnaHQgYmVmb3JlIHRoYXRcclxuICAgICAgcGFyZW50TG9naWNhbE5leHRTaWJsaW5nLnBhcmVudE5vZGUhLmluc2VydEJlZm9yZShjaGlsZCwgcGFyZW50TG9naWNhbE5leHRTaWJsaW5nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNpbmNlIHRoZSBwYXJlbnQgaGFzIG5vIGxvZ2ljYWwgbmV4dC1zaWJsaW5nLCBrZWVwIHJlY3Vyc2luZyB1cHdhcmRzIHVudGlsIHdlIGZpbmRcclxuICAgICAgLy8gYSBsb2dpY2FsIGFuY2VzdG9yIHRoYXQgZG9lcyBoYXZlIGEgbmV4dC1zaWJsaW5nIG9yIGlzIGEgcGh5c2ljYWwgZWxlbWVudC5cclxuICAgICAgYXBwZW5kRG9tTm9kZShjaGlsZCwgZ2V0TG9naWNhbFBhcmVudChwYXJlbnQpISk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIFNob3VsZCBuZXZlciBoYXBwZW5cclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGFwcGVuZCBub2RlIGJlY2F1c2UgdGhlIHBhcmVudCBpcyBub3QgYSB2YWxpZCBsb2dpY2FsIGVsZW1lbnQuIFBhcmVudDogJHtwYXJlbnR9YCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTeW1ib2xPckZhbGxiYWNrKGZhbGxiYWNrOiBzdHJpbmcpOiBzeW1ib2wgfCBzdHJpbmcge1xyXG4gIHJldHVybiB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nID8gU3ltYm9sKCkgOiBmYWxsYmFjaztcclxufVxyXG5cclxuLy8gTm9taW5hbCB0eXBlIHRvIHJlcHJlc2VudCBhIGxvZ2ljYWwgZWxlbWVudCB3aXRob3V0IG5lZWRpbmcgdG8gYWxsb2NhdGUgYW55IG9iamVjdCBmb3IgaW5zdGFuY2VzXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9naWNhbEVsZW1lbnQgeyBMb2dpY2FsRWxlbWVudF9fRE9fTk9UX0lNUExFTUVOVDogYW55IH07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9SZW5kZXJpbmcvTG9naWNhbEVsZW1lbnRzLnRzIiwiaW1wb3J0IHsgcmVnaXN0ZXJGdW5jdGlvbiB9IGZyb20gJy4uL0ludGVyb3AvUmVnaXN0ZXJlZEZ1bmN0aW9uJztcclxuaW1wb3J0IHsgcGxhdGZvcm0gfSBmcm9tICcuLi9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IE1ldGhvZEhhbmRsZSwgU3lzdGVtX1N0cmluZyB9IGZyb20gJy4uL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuY29uc3QgaHR0cENsaWVudEFzc2VtYmx5ID0gJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyJztcclxuY29uc3QgaHR0cENsaWVudE5hbWVzcGFjZSA9IGAke2h0dHBDbGllbnRBc3NlbWJseX0uSHR0cGA7XHJcbmNvbnN0IGh0dHBDbGllbnRUeXBlTmFtZSA9ICdCcm93c2VySHR0cE1lc3NhZ2VIYW5kbGVyJztcclxuY29uc3QgaHR0cENsaWVudEZ1bGxUeXBlTmFtZSA9IGAke2h0dHBDbGllbnROYW1lc3BhY2V9LiR7aHR0cENsaWVudFR5cGVOYW1lfWA7XHJcbmxldCByZWNlaXZlUmVzcG9uc2VNZXRob2Q6IE1ldGhvZEhhbmRsZTtcclxuXHJcbnJlZ2lzdGVyRnVuY3Rpb24oYCR7aHR0cENsaWVudEZ1bGxUeXBlTmFtZX0uU2VuZGAsIChpZDogbnVtYmVyLCBtZXRob2Q6IHN0cmluZywgcmVxdWVzdFVyaTogc3RyaW5nLCBib2R5OiBzdHJpbmcgfCBudWxsLCBoZWFkZXJzSnNvbjogc3RyaW5nIHwgbnVsbCwgZmV0Y2hBcmdzOiBSZXF1ZXN0SW5pdCB8IG51bGwpID0+IHtcclxuICBzZW5kQXN5bmMoaWQsIG1ldGhvZCwgcmVxdWVzdFVyaSwgYm9keSwgaGVhZGVyc0pzb24sIGZldGNoQXJncyk7XHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2VuZEFzeW5jKGlkOiBudW1iZXIsIG1ldGhvZDogc3RyaW5nLCByZXF1ZXN0VXJpOiBzdHJpbmcsIGJvZHk6IHN0cmluZyB8IG51bGwsIGhlYWRlcnNKc29uOiBzdHJpbmcgfCBudWxsLCBmZXRjaEFyZ3M6IFJlcXVlc3RJbml0IHwgbnVsbCkge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IHJlc3BvbnNlVGV4dDogc3RyaW5nO1xyXG5cclxuICBjb25zdCByZXF1ZXN0SW5pdDogUmVxdWVzdEluaXQgPSBmZXRjaEFyZ3MgfHwge307XHJcbiAgcmVxdWVzdEluaXQubWV0aG9kID0gbWV0aG9kO1xyXG4gIHJlcXVlc3RJbml0LmJvZHkgPSBib2R5IHx8IHVuZGVmaW5lZDtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlcXVlc3RJbml0LmhlYWRlcnMgPSBoZWFkZXJzSnNvbiA/IChKU09OLnBhcnNlKGhlYWRlcnNKc29uKSBhcyBzdHJpbmdbXVtdKSA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3RVcmksIHJlcXVlc3RJbml0KTtcclxuICAgIHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICB9IGNhdGNoIChleCkge1xyXG4gICAgZGlzcGF0Y2hFcnJvclJlc3BvbnNlKGlkLCBleC50b1N0cmluZygpKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGRpc3BhdGNoU3VjY2Vzc1Jlc3BvbnNlKGlkLCByZXNwb25zZSwgcmVzcG9uc2VUZXh0KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGF0Y2hTdWNjZXNzUmVzcG9uc2UoaWQ6IG51bWJlciwgcmVzcG9uc2U6IFJlc3BvbnNlLCByZXNwb25zZVRleHQ6IHN0cmluZykge1xyXG4gIGNvbnN0IHJlc3BvbnNlRGVzY3JpcHRvcjogUmVzcG9uc2VEZXNjcmlwdG9yID0ge1xyXG4gICAgU3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgSGVhZGVyczogW11cclxuICB9O1xyXG4gIHJlc3BvbnNlLmhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIG5hbWUpID0+IHtcclxuICAgIHJlc3BvbnNlRGVzY3JpcHRvci5IZWFkZXJzLnB1c2goW25hbWUsIHZhbHVlXSk7XHJcbiAgfSk7XHJcblxyXG4gIGRpc3BhdGNoUmVzcG9uc2UoXHJcbiAgICBpZCxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlRGVzY3JpcHRvcikpLFxyXG4gICAgcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcocmVzcG9uc2VUZXh0KSwgLy8gVE9ETzogQ29uc2lkZXIgaG93IHRvIGhhbmRsZSBub24tc3RyaW5nIHJlc3BvbnNlc1xyXG4gICAgLyogZXJyb3JNZXNzYWdlICovIG51bGxcclxuICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwYXRjaEVycm9yUmVzcG9uc2UoaWQ6IG51bWJlciwgZXJyb3JNZXNzYWdlOiBzdHJpbmcpIHtcclxuICBkaXNwYXRjaFJlc3BvbnNlKFxyXG4gICAgaWQsXHJcbiAgICAvKiByZXNwb25zZURlc2NyaXB0b3IgKi8gbnVsbCxcclxuICAgIC8qIHJlc3BvbnNlVGV4dCAqLyBudWxsLFxyXG4gICAgcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoZXJyb3JNZXNzYWdlKVxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BhdGNoUmVzcG9uc2UoaWQ6IG51bWJlciwgcmVzcG9uc2VEZXNjcmlwdG9yOiBTeXN0ZW1fU3RyaW5nIHwgbnVsbCwgcmVzcG9uc2VUZXh0OiBTeXN0ZW1fU3RyaW5nIHwgbnVsbCwgZXJyb3JNZXNzYWdlOiBTeXN0ZW1fU3RyaW5nIHwgbnVsbCkge1xyXG4gIGlmICghcmVjZWl2ZVJlc3BvbnNlTWV0aG9kKSB7XHJcbiAgICByZWNlaXZlUmVzcG9uc2VNZXRob2QgPSBwbGF0Zm9ybS5maW5kTWV0aG9kKFxyXG4gICAgICBodHRwQ2xpZW50QXNzZW1ibHksXHJcbiAgICAgIGh0dHBDbGllbnROYW1lc3BhY2UsXHJcbiAgICAgIGh0dHBDbGllbnRUeXBlTmFtZSxcclxuICAgICAgJ1JlY2VpdmVSZXNwb25zZSdcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwbGF0Zm9ybS5jYWxsTWV0aG9kKHJlY2VpdmVSZXNwb25zZU1ldGhvZCwgbnVsbCwgW1xyXG4gICAgcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoaWQudG9TdHJpbmcoKSksXHJcbiAgICByZXNwb25zZURlc2NyaXB0b3IsXHJcbiAgICByZXNwb25zZVRleHQsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgXSk7XHJcbn1cclxuXHJcbi8vIEtlZXAgdGhpcyBpbiBzeW5jIHdpdGggdGhlIC5ORVQgZXF1aXZhbGVudCBpbiBIdHRwQ2xpZW50LmNzXHJcbmludGVyZmFjZSBSZXNwb25zZURlc2NyaXB0b3Ige1xyXG4gIC8vIFdlIGRvbid0IGhhdmUgQm9keVRleHQgaW4gaGVyZSBiZWNhdXNlIGlmIHdlIGRpZCwgdGhlbiBpbiB0aGUgSlNPTi1yZXNwb25zZSBjYXNlICh3aGljaFxyXG4gIC8vIGlzIHRoZSBtb3N0IGNvbW1vbiBjYXNlKSwgd2UnZCBiZSBkb3VibGUtZW5jb2RpbmcgaXQsIHNpbmNlIHRoZSBlbnRpcmUgUmVzcG9uc2VEZXNjcmlwdG9yXHJcbiAgLy8gYWxzbyBnZXRzIEpTT04gZW5jb2RlZC4gSXQgd291bGQgd29yayBidXQgaXMgdHdpY2UgdGhlIGFtb3VudCBvZiBzdHJpbmcgcHJvY2Vzc2luZy5cclxuICBTdGF0dXNDb2RlOiBudW1iZXI7XHJcbiAgSGVhZGVyczogc3RyaW5nW11bXTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU2VydmljZXMvSHR0cC50cyIsImltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi9FbnZpcm9ubWVudCdcclxuaW1wb3J0IHsgcmVnaXN0ZXJGdW5jdGlvbiB9IGZyb20gJy4vSW50ZXJvcC9SZWdpc3RlcmVkRnVuY3Rpb24nO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvIH0gZnJvbSAnLi9TZXJ2aWNlcy9VcmlIZWxwZXInO1xyXG5cclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgLy8gV2hlbiB0aGUgbGlicmFyeSBpcyBsb2FkZWQgaW4gYSBicm93c2VyIHZpYSBhIDxzY3JpcHQ+IGVsZW1lbnQsIG1ha2UgdGhlXHJcbiAgLy8gZm9sbG93aW5nIEFQSXMgYXZhaWxhYmxlIGluIGdsb2JhbCBzY29wZSBmb3IgaW52b2NhdGlvbiBmcm9tIEpTXHJcbiAgd2luZG93WydCbGF6b3InXSA9IHtcclxuICAgIHBsYXRmb3JtLFxyXG4gICAgcmVnaXN0ZXJGdW5jdGlvbixcclxuICAgIG5hdmlnYXRlVG8sXHJcbiAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvR2xvYmFsRXhwb3J0cy50cyJdLCJzb3VyY2VSb290IjoiIn0=