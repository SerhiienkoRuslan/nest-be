"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostModule = void 0;
var common_1 = require("@nestjs/common");
var auth_middleware_1 = require("../../middleware/auth.middleware");
var prisma_service_1 = require("../../prisma/prisma.service");
var post_controller_1 = require("./post.controller");
var post_service_1 = require("./post.service");
var user_service_1 = require("../user/user.service");
var PostModule = /** @class */ (function () {
    function PostModule() {
    }
    PostModule.prototype.configure = function (consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'posts', method: common_1.RequestMethod.GET }, { path: 'post', method: common_1.RequestMethod.GET }, { path: 'my-posts', method: common_1.RequestMethod.GET }, { path: 'post', method: common_1.RequestMethod.PUT }, { path: 'post', method: common_1.RequestMethod.DELETE });
    };
    PostModule = __decorate([
        (0, common_1.Module)({
            providers: [post_service_1.PostService, prisma_service_1.PrismaService, user_service_1.UserService],
            controllers: [post_controller_1.PostController],
            exports: [post_service_1.PostService]
        })
    ], PostModule);
    return PostModule;
}());
exports.PostModule = PostModule;
