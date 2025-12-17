"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../../core/asyncHandler");
const express_1 = require("express");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const schema_1 = __importDefault(require("./schema"));
const UserRepo_1 = __importDefault(require("../../database/repositories/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const crypto_1 = __importDefault(require("crypto"));
const KeystoreRepo_1 = __importDefault(require("../../database/repositories/KeystoreRepo"));
const authUtils_1 = require("../../core/authUtils");
const utils_1 = require("../../core/utils");
const ApiResponse_1 = require("../../core/ApiResponse");
const validator_1 = require("../../helpers/validator");
const router = (0, express_1.Router)();
router.post('/signin', (0, validator_middleware_1.validator)(schema_1.default.signin, validator_1.ValidationSource.BODY), (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await UserRepo_1.default.findByEmail(req.body.email);
    if (!user)
        throw new ApiError_1.BadRequestError('User not registered.');
    const isValid = await (0, authUtils_1.isPasswordCorrect)(req.body.password, user.password);
    if (!isValid)
        throw new ApiError_1.AuthFailureError('Authentication failure.');
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    await KeystoreRepo_1.default.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await (0, authUtils_1.createTokens)(user, accessTokenKey, refreshTokenKey);
    const userData = (0, utils_1.getUserData)(user);
    new ApiResponse_1.SuccessResponse('Login success.', {
        user: userData,
        tokens: tokens,
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=signin.js.map