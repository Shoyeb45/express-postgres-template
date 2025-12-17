"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
const logger_js_1 = __importDefault(require("./core/logger.js"));
const config_js_1 = require("./config.js");
const index_js_1 = require("./database/index.js");
const app_js_1 = require("./app.js");
async function start() {
    try {
        await (0, index_js_1.connectDB)();
        logger_js_1.default.info('Database connected');
        logger_js_1.default.info('App loaded');
        app_js_1.app.listen(config_js_1.port, () => {
            logger_js_1.default.info(`Server running on port: ${config_js_1.port}`);
        });
    }
    catch (err) {
        logger_js_1.default.error('Startup error');
        logger_js_1.default.error(err);
        process.exit(1);
    }
}
start()
    .catch((err) => {
    logger_js_1.default.error('Fatal startup error.', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map