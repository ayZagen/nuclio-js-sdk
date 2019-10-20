"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var got_1 = require("got");
var Nuclio = /** @class */ (function () {
    /**
     * @param baseUrl Nuclio dashboard url
     * @param namespace Nuclio namespace. Defaults to 'nuclio'
     */
    function Nuclio(baseUrl, namespace) {
        if (namespace === void 0) { namespace = 'nuclio'; }
        this.baseUrl = baseUrl;
        this.namespace = namespace;
        this.http = got_1.default.extend({
            timeout: 600000,
            responseType: 'json',
            resolveBodyOnly: true,
            throwHttpErrors: true,
            prefixUrl: this.baseUrl + '/api',
            headers: {
                'content-type': 'application/json',
                'x-nuclio-function-namespace': namespace
            },
            hooks: {
                beforeError: [
                    function (error) {
                        if (error.response && error.response.body && error.response.body.error) {
                            error.name = 'NuclioError';
                            error.message = error.response.body.error;
                            error.stackTrace = error.response.body.errorStackTrace;
                        }
                        return error;
                    }
                ]
            }
        });
    }
    Nuclio.prototype.getFunctions = function (projectName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('functions', {
                        headers: {
                            'x-nuclio-project-name': projectName
                        }
                    })];
            });
        });
    };
    Nuclio.prototype.getFunctionByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('functions/' + name)];
            });
        });
    };
    Nuclio.prototype.createFunction = function (functionDef) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post('functions', {
                        json: functionDef
                    })];
            });
        });
    };
    Nuclio.prototype.updateFunction = function (name, functionDef) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.put('functions/' + name, {
                        json: functionDef
                    })];
            });
        });
    };
    Nuclio.prototype.invokeFunction = function (name, method, requestBody, path, invokeVia) {
        if (invokeVia === void 0) { invokeVia = 'external-ip'; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http('function_invocations', {
                        method: method,
                        json: requestBody,
                        headers: {
                            'x-nuclio-function-name': name,
                            'x-nuclio-path': path,
                            'x-nuclio-invoke-via': invokeVia
                        }
                    })];
            });
        });
    };
    Nuclio.prototype.deleteFunction = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.delete('functions', {
                        json: {
                            name: name,
                            namespace: this.namespace
                        }
                    })];
            });
        });
    };
    Nuclio.prototype.getEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('function_events')];
            });
        });
    };
    Nuclio.prototype.getEventByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('function_events/' + name)];
            });
        });
    };
    Nuclio.prototype.createEvent = function (eventDef) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post('function_events', {
                        json: eventDef
                    })];
            });
        });
    };
    Nuclio.prototype.getFunctionTemplates = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('function_templates')];
            });
        });
    };
    Nuclio.prototype.updateEvent = function (name, eventDef) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.put('function_events', {
                        json: eventDef
                    })];
            });
        });
    };
    Nuclio.prototype.deleteEvent = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.delete('function_events', {
                        json: {
                            name: name,
                            namespace: this.namespace
                        }
                    })];
            });
        });
    };
    Nuclio.prototype.getProjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('projects')];
            });
        });
    };
    Nuclio.prototype.getProjectByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('projects/' + name)];
            });
        });
    };
    Nuclio.prototype.createProject = function (projectDef) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.post('projects', {
                        json: projectDef
                    })];
            });
        });
    };
    Nuclio.prototype.updateProject = function (name, projectDef) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.put('projects', {
                        json: projectDef
                    })];
            });
        });
    };
    Nuclio.prototype.deleteProject = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.delete('projects', {
                        json: {
                            name: name,
                            namespace: this.namespace
                        }
                    })];
            });
        });
    };
    Nuclio.prototype.version = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('versions')];
            });
        });
    };
    Nuclio.prototype.getExternalIPAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get('external_ip_addresses')];
            });
        });
    };
    return Nuclio;
}());
exports.Nuclio = Nuclio;
