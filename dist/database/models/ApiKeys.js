"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const permissions_js_1 = require("../../types/permissions.js");
exports.DOCUMENT_NAME = 'ApiKey';
exports.COLLECTION_NAME = 'api_keys';
const schema = new mongoose_1.Schema({
    key: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
        maxlength: 1024,
        trim: true,
    },
    version: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        min: 1,
        max: 100,
    },
    permissions: {
        type: [
            {
                type: mongoose_1.Schema.Types.String,
                required: true,
                enum: Object.values(permissions_js_1.Permission),
            },
        ],
        required: true,
    },
    comments: {
        type: [
            {
                type: mongoose_1.Schema.Types.String,
                required: true,
                trim: true,
                maxlength: 1000,
            },
        ],
        required: true,
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true
});
schema.index({ key: 1, status: 1 });
exports.ApiKeyModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=ApiKeys.js.map