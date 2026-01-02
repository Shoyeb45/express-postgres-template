exports.isProduction = process.env.NODE_ENV === "production";
exports.originUrl = process.env.ORIGIN_URL;
exports.timeZone = process.env.TZ;
exports.port = process.env.PORT;
exports.tokenInfo = {
  accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
  refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"),
  issuer: process.env.TOKEN_ISSUER || "",
  audience: process.env.TOKEN_AUDIENCE || "",
};
exports.logDirectory = process.env.LOG_DIRECTORY;
exports.dbUrl = process.env.DATABASE_URL || "";
