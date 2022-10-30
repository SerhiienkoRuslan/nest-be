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
exports.__esModule = true;
var adminjs_1 = require("adminjs");
require("@adminjs/express");
var nestjs_1 = require("@adminjs/nestjs");
var prisma_1 = require("@adminjs/prisma");
var prisma_service_1 = require("../prisma/prisma.service");
var prisma_module_1 = require("../prisma/prisma.module");
var argon2 = require("argon2");
adminjs_1["default"].registerAdapter({ Database: prisma_1.Database, Resource: prisma_1.Resource });
exports["default"] = nestjs_1.AdminModule.createAdminAsync({
    imports: [prisma_module_1.PrismaModule],
    inject: [prisma_service_1.PrismaService],
    useFactory: function (prisma) { return __awaiter(void 0, void 0, void 0, function () {
        var dmmf;
        return __generator(this, function (_a) {
            dmmf = prisma._baseDmmf;
            return [2 /*return*/, {
                    adminJsOptions: {
                        rootPath: '/admin',
                        resources: [
                            {
                                resource: { model: dmmf.modelMap.User, client: prisma },
                                options: {}
                            },
                            {
                                resource: { model: dmmf.modelMap.Post, client: prisma },
                                options: {}
                            }
                        ],
                        dashboard: {
                            component: adminjs_1["default"].bundle('./pages/dashboard')
                        }
                    },
                    auth: {
                        authenticate: function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
                            var user, email_1, id, authenticated;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.user.findUnique({ where: { email: email } })];
                                    case 1:
                                        user = _a.sent();
                                        if (!user) return [3 /*break*/, 3];
                                        email_1 = user.email, id = user.id;
                                        return [4 /*yield*/, argon2.verify(user.password, password)];
                                    case 2:
                                        authenticated = _a.sent();
                                        if (authenticated) {
                                            return [2 /*return*/, { email: email_1, id: "".concat(id) }];
                                        }
                                        _a.label = 3;
                                    case 3: return [2 /*return*/, null];
                                }
                            });
                        }); },
                        cookiePassword: 'some-secret-password-used-to-secure-cookie',
                        cookieName: 'nest-be-pass'
                    }
                }];
        });
    }); }
});
