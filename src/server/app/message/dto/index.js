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
exports.MessagesResponseDTO = exports.MessageResponseDTO = exports.CreateMessageDTO = void 0;
var create_message_dto_1 = require("./create-message.dto");
__createBinding(exports, create_message_dto_1, "CreateMessageDTO");
var message_response_dto_1 = require("./message-response.dto");
__createBinding(exports, message_response_dto_1, "MessageResponseDTO");
var messages_response_dto_1 = require("./messages-response.dto");
__createBinding(exports, messages_response_dto_1, "MessagesResponseDTO");
