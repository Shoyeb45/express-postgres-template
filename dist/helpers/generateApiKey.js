"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiKey = createApiKey;
const crypto_1 = __importDefault(require("crypto"));
const ApiKeyRepo_1 = __importDefault(require("../database/repositories/ApiKeyRepo"));
const permissions_1 = require("../types/permissions");
const database_1 = require("../database");
async function createApiKey(comments, permissions) {
    const key = crypto_1.default.randomBytes(32).toString('hex');
    const newKey = await ApiKeyRepo_1.default.create(key, comments, permissions, 1);
    if (!newKey) {
        throw Error('Failed to generate API Key.');
    }
    console.log('Your API key:', key);
    return key;
}
(0, database_1.connectDB)().then(async () => {
    await createApiKey(['API Key for testing.'], [permissions_1.Permission.GENERAL]);
});
//# sourceMappingURL=generateApiKey.js.map