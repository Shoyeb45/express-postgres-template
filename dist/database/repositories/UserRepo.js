"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../../core/ApiError");
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
const KeystoreRepo_1 = __importDefault(require("./KeystoreRepo"));
async function findByEmail(email) {
    return await User_1.UserModel.findOne({ email: email })
        .select("+name +email +password +roles")
        .populate({
        path: "roles",
        match: { status: true },
        select: { code: 1 }
    })
        .lean()
        .exec();
}
async function create(user, accessTokenKey, refreshTokenKey, roleCode) {
    const role = await Role_1.RoleModel.findOne({ code: roleCode })
        .select("+code")
        .lean()
        .exec();
    if (!role)
        throw new ApiError_1.InternalError("Role must be defined.");
    user.roles = [role];
    const userCreated = await User_1.UserModel.create(user);
    const keystore = await KeystoreRepo_1.default.create(userCreated, accessTokenKey, refreshTokenKey);
    return {
        user: { ...userCreated.toObject(), roles: user.roles },
        keystore: keystore
    };
}
async function findById(id) {
    return await User_1.UserModel.findOne({ _id: id, status: true })
        .select("+email +password +name +roles")
        .populate({
        path: "roles",
        match: { status: true }
    })
        .lean()
        .exec();
}
exports.default = {
    findByEmail,
    create,
    findById
};
//# sourceMappingURL=UserRepo.js.map