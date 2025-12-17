"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const schema_1 = __importDefault(require("./schema"));
const validator_1 = require("../../helpers/validator");
const asyncHandler_1 = require("../../core/asyncHandler");
const authUtils_1 = require("../../core/authUtils");
const jwtUtils_1 = __importDefault(require("./../../core/jwtUtils"));
const authUtils_2 = require("./../../core/authUtils");
const UserRepo_1 = __importDefault(require("../../database/repositories/UserRepo"));
const KeystoreRepo_1 = __importDefault(require("../../database/repositories/KeystoreRepo"));
const mongoose_1 = require("mongoose");
const ApiError_1 = require("../../core/ApiError");
const crypto_1 = __importDefault(require("crypto"));
const ApiResponse_1 = require("../../core/ApiResponse");
const router = (0, express_1.Router)();
router.post('/refresh', (0, validator_middleware_1.validator)(schema_1.default.auth, validator_1.ValidationSource.HEADER), (0, validator_middleware_1.validator)(schema_1.default.refreshToken, validator_1.ValidationSource.BODY), (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    req.accessToken = (0, authUtils_1.getAccessToken)(req.headers?.authorization);
    const accessTokenPayload = await jwtUtils_1.default.decode(req.accessToken);
    (0, authUtils_2.validateTokenData)(accessTokenPayload);
    const user = await UserRepo_1.default.findById(new mongoose_1.Types.ObjectId(accessTokenPayload.sub));
    if (!user)
        throw new ApiError_1.AuthFailureError('User not registered');
    req.user = user;
    const refreshTokenPayload = await jwtUtils_1.default.validate(req.body.refreshToken);
    (0, authUtils_2.validateTokenData)(refreshTokenPayload);
    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
        throw new ApiError_1.AuthFailureError('Invalid access token');
    const keystore = await KeystoreRepo_1.default.find(req.user, accessTokenPayload.prm, refreshTokenPayload.prm);
    if (!keystore)
        throw new ApiError_1.AuthFailureError('Invalid access token');
    await KeystoreRepo_1.default.remove(keystore._id);
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    await KeystoreRepo_1.default.create(req.user, accessTokenKey, refreshTokenKey);
    const tokens = await (0, authUtils_2.createTokens)(req.user, accessTokenKey, refreshTokenKey);
    new ApiResponse_1.TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
}));
exports.default = router;
//# sourceMappingURL=token.js.map