"use strict";
exports.__esModule = true;
exports.User = void 0;
var common_1 = require("@nestjs/common");
// @ts-ignore
var jwt = require("jsonwebtoken");
var config_1 = require("../../config");
exports.User = (0, common_1.createParamDecorator)(function (data, ctx) {
    var req = ctx.switchToHttp().getRequest();
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user)
        return !!data ? req.user[data] : req.user;
    // in case a route is not protected, we still want to get the optional auth user from jwt
    var token = req.headers.authorization ? req.headers.authorization.split(' ') : null;
    if (token && token[1]) {
        var decoded = jwt.verify(token[1], config_1.SECRET);
        return !!data ? decoded[data] : decoded;
    }
});
