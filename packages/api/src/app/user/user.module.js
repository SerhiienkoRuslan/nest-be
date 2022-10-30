"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var prisma_service_1 = require("../../prisma/prisma.service");
var user_controller_1 = require("./user.controller");
var user_service_1 = require("./user.service");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule.prototype.configure = function (consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'user', method: common_1.RequestMethod.GET }, { path: 'users', method: common_1.RequestMethod.GET }, { path: 'user', method: common_1.RequestMethod.PUT }, { path: 'user', method: common_1.RequestMethod.DELETE });
    };
    UserModule = __decorate([
        (0, common_1.Module)({
            providers: [user_service_1.UserService, prisma_service_1.PrismaService],
            controllers: [user_controller_1.UserController],
            exports: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
