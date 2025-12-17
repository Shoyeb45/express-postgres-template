import dotenv from 'dotenv';

dotenv.config();

export const originUrl = process.env.ORIGIN_URL;
export const isProduction = process.env.NODE_ENV === 'production';
export const timeZone = process.env.TZ;
export const port = process.env.PORT;

// JWT token configuration
export const tokenInfo = {
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
    refreshTokenValidity: parseInt(
        process.env.REFRESH_TOKEN_VALIDITY_SEC || '0',
    ),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};


export const logDirectory = process.env.LOG_DIRECTORY;
