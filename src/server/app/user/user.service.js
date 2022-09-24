"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var http_exception_1 = require("@nestjs/common/exceptions/http.exception");
var jwt = require('jsonwebtoken');
var argon2 = require("argon2");
var userUtils_1 = require("../../shared/pipes/userUtils");
var config_1 = require("../../config");
var select = {
    email: true,
    username: true,
    bio: true,
    avatar: true,
    id: true,
    role: true,
    posts: {
        select: {
            id: true,
            title: true
        }
    }
};
var UserService = /** @class */ (function () {
    function UserService(prisma) {
        this.prisma = prisma;
    }
    UserService.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findMany({ select: select })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.login = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, errors, authenticated, token, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                            where: { email: payload.email }
                        })];
                    case 1:
                        _user = _a.sent();
                        errors = { User: 'email or password wrong' };
                        if (!_user)
                            throw new http_exception_1.HttpException({ errors: errors }, 401);
                        return [4 /*yield*/, argon2.verify(_user.password, payload.password)];
                    case 2:
                        authenticated = _a.sent();
                        if (!authenticated)
                            throw new http_exception_1.HttpException({ errors: errors }, 401);
                        return [4 /*yield*/, this.generateJWT(_user)];
                    case 3:
                        token = _a.sent();
                        password = _user.password, user = __rest(_user, ["password"]);
                        return [2 /*return*/, {
                                user: __assign({ token: token }, user)
                            }];
                }
            });
        });
    };
    UserService.prototype.create = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            var username, email, password, userNotUnique, errors, hashedPassword, data, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = dto.username, email = dto.email, password = dto.password;
                        return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { email: email }
                            })];
                    case 1:
                        userNotUnique = _a.sent();
                        if (userNotUnique) {
                            errors = { username: 'Username and email must be unique.' };
                            throw new http_exception_1.HttpException({ message: 'Input data validation failed', errors: errors }, common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, argon2.hash(password)];
                    case 2:
                        hashedPassword = _a.sent();
                        data = {
                            username: username,
                            email: email,
                            password: hashedPassword
                        };
                        return [4 /*yield*/, this.prisma.user.create({ data: data, select: select })];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, { user: user }];
                }
            });
        });
    };
    UserService.prototype.update = function (userData, data) {
        return __awaiter(this, void 0, void 0, function () {
            var where, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, userUtils_1.hasPermission)(userData === null || userData === void 0 ? void 0 : userData.id, data)) return [3 /*break*/, 2];
                        where = { id: userData === null || userData === void 0 ? void 0 : userData.id };
                        return [4 /*yield*/, this.prisma.user.update({ where: where, data: data, select: select })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, { user: user }];
                    case 2: throw new http_exception_1.HttpException({ error: 'No Permission' }, 403);
                }
            });
        });
    };
    UserService.prototype["delete"] = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, userUtils_1.hasPermission)(id, user)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prisma.user["delete"]({ where: { id: id }, select: select })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: throw new http_exception_1.HttpException({ error: 'No Permission' }, 403);
                }
            });
        });
    };
    UserService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: id }, select: __assign({ id: true }, select) })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, { user: user }];
                }
            });
        });
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email }, select: select })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, { user: user }];
                }
            });
        });
    };
    UserService.prototype.generateJWT = function (user) {
        var today = new Date();
        var exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000
        }, config_1.SECRET);
    };
    ;
    UserService = __decorate([
        (0, common_1.Injectable)()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
