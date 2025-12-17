"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodAuthBearer = exports.ZodUrlEndpoint = exports.ZodObjectId = exports.ValidationSource = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
var ValidationSource;
(function (ValidationSource) {
    ValidationSource["BODY"] = "body";
    ValidationSource["HEADER"] = "headers";
    ValidationSource["QUERY"] = "query";
    ValidationSource["PARAM"] = "params";
})(ValidationSource || (exports.ValidationSource = ValidationSource = {}));
exports.ZodObjectId = zod_1.default
    .string()
    .refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: 'Invalid mongoDB object Id.',
});
exports.ZodUrlEndpoint = zod_1.default
    .string()
    .refine((value) => !value.includes('://'), {
    message: 'Invalid endpoint: URLs with protocol are not allowed',
});
exports.ZodAuthBearer = zod_1.default.string().refine((value) => {
    if (!value.startsWith('Bearer '))
        return false;
    const parts = value.split(' ');
    if (parts.length !== 2)
        return false;
    const token = parts[1];
    if (!token || token.trim().length === 0)
        return false;
    return true;
}, {
    message: "Invalid Authorization header. Expected: 'Bearer <token>'",
});
//# sourceMappingURL=validator.js.map