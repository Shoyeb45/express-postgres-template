"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_js_1 = __importDefault(require("./../core/logger.js"));
const config_js_1 = require("./../config.js");
const ApiError_js_1 = require("./../core/ApiError.js");
const errorHandler = (err, req, res, _next) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    const errors = [];
    logger_js_1.default.error('Error:', {
        error: err,
    });
    if (err instanceof ApiError_js_1.ApiError) {
        ApiError_js_1.ApiError.handle(err, res);
        if (err.type === ApiError_js_1.ErrorType.INTERNAL)
            logger_js_1.default.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return;
    }
    if (!config_js_1.isProduction) {
        message = err?.message || message;
        errors.push(err?.message);
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...(errors.length > 0 && !config_js_1.isProduction && { errors }),
        timeStamp: new Date().toISOString(),
        path: req.originalUrl,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map