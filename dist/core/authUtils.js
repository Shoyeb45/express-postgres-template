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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasswordCorrect = exports.createTokens = exports.validateTokenData = exports.getAccessToken = void 0;
const ApiError_1 = require("./ApiError");
const jwtUtils_1 = __importStar(require("./jwtUtils"));
const config_1 = require("./../config");
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAccessToken = (authorization) => {
    if (!authorization)
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    if (!authorization.startsWith('Bearer '))
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    return authorization.split(' ')[1];
};
exports.getAccessToken = getAccessToken;
const validateTokenData = (payload) => {
    if (!payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        !payload.prm ||
        payload.iss !== config_1.tokenInfo.issuer ||
        payload.aud !== config_1.tokenInfo.audience ||
        !mongoose_1.Types.ObjectId.isValid(payload.sub))
        throw new ApiError_1.AuthFailureError('Invalid Access Token');
    return true;
};
exports.validateTokenData = validateTokenData;
const createTokens = async (user, accessTokenKey, refreshTokenKey) => {
    const accessToken = await jwtUtils_1.default.encode(new jwtUtils_1.JwtPayload(config_1.tokenInfo.issuer, config_1.tokenInfo.audience, user._id.toString(), accessTokenKey, config_1.tokenInfo.accessTokenValidity));
    if (!accessToken)
        throw new ApiError_1.InternalError();
    const refreshToken = await jwtUtils_1.default.encode(new jwtUtils_1.JwtPayload(config_1.tokenInfo.issuer, config_1.tokenInfo.audience, user._id.toString(), refreshTokenKey, config_1.tokenInfo.refreshTokenValidity));
    if (!refreshToken)
        throw new ApiError_1.InternalError();
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
exports.createTokens = createTokens;
const isPasswordCorrect = async function (userPassword, hashedPassword) {
    return await bcryptjs_1.default.compare(userPassword, hashedPassword);
};
exports.isPasswordCorrect = isPasswordCorrect;
//# sourceMappingURL=authUtils.js.map