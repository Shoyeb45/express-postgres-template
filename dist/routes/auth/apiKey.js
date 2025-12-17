"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyMiddleware = void 0;
const schema_1 = __importDefault(require("./schema"));
const validator_middleware_1 = require("./../../middlewares/validator.middleware");
const validator_1 = require("../../helpers/validator");
const asyncHandler_1 = require("./../../core/asyncHandler");
const ApiError_1 = require("./../../core/ApiError");
const ApiKeyRepo_1 = __importDefault(require("./../../database/repositories/ApiKeyRepo"));
exports.apiKeyMiddleware = [
    (0, validator_middleware_1.validator)(schema_1.default.apiKey, validator_1.ValidationSource.HEADER),
    (0, asyncHandler_1.asyncHandler)(async (req, _res, next) => {
        const key = req.headers["x-api-key"]?.toString();
        if (!key)
            throw new ApiError_1.ForbiddenError('Missing API Key');
        const apiKey = await ApiKeyRepo_1.default.findByKey(key);
        if (!apiKey)
            throw new ApiError_1.ForbiddenError('Invalid API Key');
        req.apiKey = apiKey;
        next();
    }),
];
//# sourceMappingURL=apiKey.js.map