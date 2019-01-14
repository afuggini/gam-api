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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var node_google_dfp_1 = __importDefault(require("@afuggini/node-google-dfp"));
var googleapis_1 = require("googleapis");
var es6_promisify_1 = require("es6-promisify");
var default_1 = /** @class */ (function () {
    function default_1(config) {
        var networkCode = config.networkCode, appName = config.appName, apiVersion = config.apiVersion, serviceAccount = config.serviceAccount, keyfilePath = config.keyfilePath, keyData = config.keyData;
        var DFPUser = new node_google_dfp_1.default.User(networkCode, appName, apiVersion);
        var jwtClient = new googleapis_1.google.auth.JWT(serviceAccount, keyfilePath, keyData, ['https://www.googleapis.com/auth/dfp']);
        DFPUser.setClient(jwtClient);
        this.DFP = node_google_dfp_1.default;
        this.DFPUser = DFPUser;
        this.call = this.callServiceMethodWithPayload;
    }
    default_1.prototype.callServiceMethodWithPayload = function (Service, Method, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var service, method, result, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        debug_1.default('app:dfp:request')(Service + " > " + Method);
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return _this.DFPUser.getService(Service, function (error, dfpService) { return error ? reject(error) : resolve(dfpService); }); })];
                    case 1:
                        service = _a.sent();
                        method = es6_promisify_1.promisify(service[Method]);
                        return [4 /*yield*/, method(payload)];
                    case 2:
                        result = (_a.sent()).rval;
                        debug_1.default('app:dfp:response')('%o', result);
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        debug_1.default('app:dfp:error')(error_1.name + ": " + error_1.message);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return default_1;
}());
exports.default = default_1;
