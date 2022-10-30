"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
/** Admin */
var admin_module_1 = require("../admin/admin.module");
/** APP */
var app_controller_1 = require("./app.controller");
var app_gateway_1 = require("./app.gateway");
/** USER */
var user_module_1 = require("./user/user.module");
/** MESSAGE */
var message_module_1 = require("./message/message.module");
var message_service_1 = require("./message/message.service");
/** POST */
var post_module_1 = require("./post/post.module");
/** PRISMA */
var prisma_service_1 = require("../prisma/prisma.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [user_module_1.UserModule, message_module_1.MessageModule, post_module_1.PostModule, admin_module_1["default"]],
            controllers: [app_controller_1.AppController],
            providers: [app_gateway_1.AppGateway, message_service_1.MessageService, prisma_service_1.PrismaService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
