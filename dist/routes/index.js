"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_js_1 = __importDefault(require("./health/index.js"));
const apiKey_js_1 = require("./auth/apiKey.js");
const permission_middleware_js_1 = __importDefault(require("../middlewares/permission.middleware.js"));
const permissions_1 = require("./../types/permissions");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.use('/health', index_js_1.default);
router.use(apiKey_js_1.apiKeyMiddleware);
router.use((0, permission_middleware_js_1.default)(permissions_1.Permission.GENERAL));
router.use('/auth', auth_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map