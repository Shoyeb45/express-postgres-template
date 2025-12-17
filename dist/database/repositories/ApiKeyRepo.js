"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiKeys_1 = require("../models/ApiKeys");
async function findByKey(key) {
    return ApiKeys_1.ApiKeyModel.findOne({ key: key, status: true }).lean().exec();
}
async function create(key, comments, permissions, version = 1) {
    return ApiKeys_1.ApiKeyModel.create({
        key,
        comments,
        permissions,
        version,
    });
}
exports.default = {
    findByKey,
    create
};
//# sourceMappingURL=ApiKeyRepo.js.map