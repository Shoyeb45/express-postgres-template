"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDirectory = exports.db = exports.tokenInfo = exports.port = exports.timeZone = exports.isProduction = exports.originUrl = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.originUrl = process.env.ORIGIN_URL;
exports.isProduction = process.env.NODE_ENV === 'production';
exports.timeZone = process.env.TZ;
exports.port = process.env.PORT;
exports.tokenInfo = {
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
    refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};
exports.db = {
    name: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_USER_PASSWORD || '',
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
};
exports.logDirectory = process.env.LOG_DIRECTORY;
//# sourceMappingURL=config.js.map