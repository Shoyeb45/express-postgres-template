"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_middleware_1 = require("../../middlewares/validator.middleware");
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = require("./../../core/asyncHandler");
const UserRepo_1 = __importDefault(require("../../database/repositories/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const crypto_1 = __importDefault(require("crypto"));
const authUtils_1 = require("../../core/authUtils");
const utils_1 = require("./../../core/utils");
const ApiResponse_1 = require("./../../core/ApiResponse");
const Role_1 = require("./../../types/Role");
const validator_1 = require("../../helpers/validator");
const router = (0, express_1.Router)();
router.post('/signup', (0, validator_middleware_1.validator)(schema_1.default.signup, validator_1.ValidationSource.BODY), (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await UserRepo_1.default.findByEmail(req.body.email);
    if (user)
        throw new ApiError_1.BadRequestError('User already registered.');
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const { user: createdUser, keystore } = await UserRepo_1.default.create(req.body, accessTokenKey, refreshTokenKey, Role_1.RoleCode.USER);
    const tokens = await (0, authUtils_1.createTokens)(createdUser, keystore.primaryKey, keystore.secondaryKey);
    const userData = (0, utils_1.getUserData)(createdUser);
    new ApiResponse_1.SuccessResponse('Signup successful.', {
        user: userData,
        tokens: tokens,
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=signup.js.map