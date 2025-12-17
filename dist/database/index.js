"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../core/logger"));
const config_1 = require("../config");
async function connectDB() {
    const dbURI = `mongodb+srv://${config_1.db.user}:${encodeURIComponent(config_1.db.password)}@${config_1.db.host}/${config_1.db.name}`;
    const options = {
        autoIndex: true,
        minPoolSize: config_1.db.minPoolSize,
        maxPoolSize: config_1.db.maxPoolSize,
        connectTimeoutMS: 60000,
        socketTimeoutMS: 45000,
    };
    mongoose_1.default.set('strictQuery', true);
    function setRunValidators() {
        this.setOptions({ runValidators: true });
    }
    mongoose_1.default.plugin((schema) => {
        schema.pre('findOneAndUpdate', setRunValidators);
        schema.pre('updateMany', setRunValidators);
        schema.pre('updateOne', setRunValidators);
        schema.pre(/^update/, setRunValidators);
    });
    try {
        logger_1.default.debug(dbURI);
        await mongoose_1.default.connect(dbURI, options);
        logger_1.default.info('Mongoose connection established');
    }
    catch (err) {
        logger_1.default.error('Mongoose connection error');
        logger_1.default.error(err);
        process.exit(1);
    }
    mongoose_1.default.connection.on('connected', () => {
        logger_1.default.debug(`Mongoose connected to ${dbURI}`);
    });
    mongoose_1.default.connection.on('error', (err) => {
        logger_1.default.error('Mongoose connection error: ' + err);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        logger_1.default.info('Mongoose disconnected');
    });
    process.on('SIGINT', () => {
        mongoose_1.default.connection.close().finally(() => {
            logger_1.default.info('Mongoose disconnected due to app termination');
            process.exit(0);
        });
    });
}
//# sourceMappingURL=index.js.map