"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const Role_js_1 = require("./../../types/Role.js");
exports.DOCUMENT_NAME = 'Role';
exports.COLLECTION_NAME = 'roles';
const schema = new mongoose_1.Schema({
    code: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        enum: Object.values(Role_js_1.RoleCode),
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
schema.index({ code: 1, status: 1 });
exports.RoleModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=Role.js.map