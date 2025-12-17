"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiResponse_1 = require("../../core/ApiResponse");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    new ApiResponse_1.SuccessMsgResponse('The server is healthy and running.').send(res);
});
exports.default = router;
//# sourceMappingURL=index.js.map