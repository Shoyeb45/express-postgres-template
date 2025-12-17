"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const logger_js_1 = __importDefault(require("./core/logger.js"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_js_1 = require("./config.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const error_middleware_js_1 = require("./middlewares/error.middleware.js");
const ApiError_js_1 = require("./core/ApiError.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
process.on('uncaughtException', (e) => {
    logger_js_1.default.error(e);
});
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json({ limit: '10mb' }));
exports.app.use(express_1.default.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
}));
exports.app.use((0, cors_1.default)({
    origin: config_js_1.originUrl,
    optionsSuccessStatus: 200,
    credentials: true,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, helmet_1.default)());
exports.app.use('/', index_js_1.default);
exports.app.use((_req, _res, next) => next(new ApiError_js_1.NotFoundError()));
exports.app.use(error_middleware_js_1.errorHandler);
//# sourceMappingURL=app.js.map