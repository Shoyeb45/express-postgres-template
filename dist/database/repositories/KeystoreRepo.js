"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Keystore_1 = require("../models/Keystore");
async function create(client, primaryKey, secondaryKey) {
    const keystore = await Keystore_1.KeystoreModel.create({
        client: client,
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
    });
    return keystore.toObject();
}
async function remove(id) {
    return Keystore_1.KeystoreModel.findByIdAndDelete(id).lean().exec();
}
async function findForKey(client, key) {
    return Keystore_1.KeystoreModel.findOne({
        client: client,
        primaryKey: key,
        status: true,
    })
        .lean()
        .exec();
}
async function find(client, primaryKey, secondaryKey) {
    return Keystore_1.KeystoreModel.findOne({
        client: client,
        primaryKey: primaryKey,
        secondaryKey: secondaryKey,
    })
        .lean()
        .exec();
}
exports.default = {
    create,
    remove,
    findForKey,
    find
};
//# sourceMappingURL=KeystoreRepo.js.map