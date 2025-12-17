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
const jsonwebtoken_1 = require("jsonwebtoken");
const ApiError_1 = require("../../core/ApiError");
const jwtUtils_1 = __importDefault(require("../../core/jwtUtils"));
const UserRepo_1 = __importDefault(require("../../database/repositories/UserRepo"));
const mongoose_1 = require("mongoose");
const KeystoreRepo_1 = __importDefault(require("../../database/repositories/KeystoreRepo"));
const router = (0, express_1.Router)();
exports.default = router.use((0, validator_middleware_1.validator)(schema_1.default.auth, validator_1.ValidationSource.HEADER), (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    req.accessToken = (0, authUtils_1.getAccessToken)(req.headers.authorization);
    try {
        const payload = await jwtUtils_1.default.validate(req.accessToken);
        (0, authUtils_1.validateTokenData)(payload);
        const user = await UserRepo_1.default.findById(new mongoose_1.Types.ObjectId(payload.sub));
        if (!user)
            throw new ApiError_1.AuthFailureError('User not registered.');
        req.user = user;
        const keystore = await KeystoreRepo_1.default.findForKey(req.user, payload.prm);
        if (!keystore)
            throw new ApiError_1.AuthFailureError('Invalid access token.');
        req.keystore = keystore;
        return next();
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.TokenExpiredError)
            throw new ApiError_1.AccessTokenError(e.message);
        throw e;
    }
}));
//# sourceMappingURL=authentication.js.map