"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = getUserData;
const lodash_1 = __importDefault(require("lodash"));
async function getUserData(user) {
    const data = lodash_1.default.pick(user, ['_id', 'name', 'roles', 'profilePicUrl', 'email']);
    return data;
}
//# sourceMappingURL=utils.js.map