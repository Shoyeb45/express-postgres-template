"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse_1 = require("../../core/ApiResponse");
const asyncHandler_1 = require("../../core/asyncHandler");
const KeystoreRepo_1 = __importDefault(require("../../database/repositories/KeystoreRepo"));
const express_1 = require("express");
const authentication_1 = __importDefault(require("./authentication"));
const router = (0, express_1.Router)();
router.use(authentication_1.default);
router.delete('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await KeystoreRepo_1.default.remove(req.keystore._id);
    new ApiResponse_1.SuccessMsgResponse('Logout Success').send(res);
}));
exports.default = router;
//# sourceMappingURL=signout.js.map