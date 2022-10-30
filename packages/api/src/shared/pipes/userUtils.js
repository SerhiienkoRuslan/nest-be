"use strict";
exports.__esModule = true;
exports.hasPermission = void 0;
var hasPermission = function (id, user) {
    return id === user.id || user.role === 'admin';
};
exports.hasPermission = hasPermission;
