"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayload = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const util_1 = require("util");
const jsonwebtoken_1 = require("jsonwebtoken");
const ApiError_1 = require("./ApiError");
class JwtPayload {
    aud;
    sub;
    iss;
    iat;
    exp;
    prm;
    constructor(issuer, audience, subject, param, validity) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity;
        this.prm = param;
    }
}
exports.JwtPayload = JwtPayload;
async function readPublicKey() {
    return (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, '../../keys/public.pem'), 'utf8');
}
async function readPrivateKey() {
    return (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, '../../keys/private.pem'), 'utf8');
}
async function encode(payload) {
    const cert = await readPrivateKey();
    if (!cert)
        throw new ApiError_1.InternalError('Token generation failure');
    return (0, util_1.promisify)(jsonwebtoken_1.sign)({ ...payload }, cert, { algorithm: 'RS256' });
}
async function validate(token) {
    const cert = await readPublicKey();
    try {
        return (await (0, util_1.promisify)(jsonwebtoken_1.verify)(token, cert));
    }
    catch (e) {
        if (e && e.name === 'TokenExpiredError')
            throw new ApiError_1.TokenExpiredError();
        throw new ApiError_1.BadTokenError();
    }
}
async function decode(token) {
    const cert = await readPublicKey();
    try {
        return (await (0, util_1.promisify)(jsonwebtoken_1.verify)(token, cert, {
            ignoreExpiration: true,
        }));
    }
    catch (e) {
        throw new ApiError_1.BadTokenError();
    }
}
exports.default = {
    encode,
    validate,
    decode,
};
//# sourceMappingURL=jwtUtils.js.map