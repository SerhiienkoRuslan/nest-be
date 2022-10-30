"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.UpdatePostDto = exports.CreatePostBodyDto = exports.CreatePostDto = void 0;
var create_post_dto_1 = require("./create-post.dto");
__createBinding(exports, create_post_dto_1, "CreatePostDto");
var create_post_body_dto_1 = require("./create-post-body.dto");
__createBinding(exports, create_post_body_dto_1, "CreatePostBodyDto");
var update_post_dto_1 = require("./update-post.dto");
__createBinding(exports, update_post_dto_1, "UpdatePostDto");
