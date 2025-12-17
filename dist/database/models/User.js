"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.DOCUMENT_NAME = 'User';
exports.COLLECTION_NAME = 'users';
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        maxLength: 200,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        trim: true,
        toLowerCase: true,
        select: false
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        select: false,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true,
        select: false,
    },
    verified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});
schema.index({ _id: 1, status: 1 });
schema.index({ status: 1 });
schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    next();
});
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=User.js.map