"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessageModule = void 0;
var common_1 = require("@nestjs/common");
var message_controller_1 = require("./message.controller");
var message_service_1 = require("./message.service");
var app_gateway_1 = require("../app.gateway");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var prisma_service_1 = require("../../prisma/prisma.service");
var user_service_1 = require("../user/user.service");
var MessageModule = /** @class */ (function () {
    function MessageModule() {
    }
    MessageModule.prototype.configure = function (consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'message', method: common_1.RequestMethod.POST }, { path: 'conversation', method: common_1.RequestMethod.GET });
    };
    MessageModule = __decorate([
        (0, common_1.Module)({
            imports: [common_1.CacheModule.register()],
            controllers: [message_controller_1.MessageController],
            providers: [message_service_1.MessageService, app_gateway_1.AppGateway, prisma_service_1.PrismaService, user_service_1.UserService],
            exports: [message_service_1.MessageService]
        })
    ], MessageModule);
    return MessageModule;
}());
exports.MessageModule = MessageModule;
