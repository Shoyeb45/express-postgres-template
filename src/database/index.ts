import { PrismaClient } from '@prisma/client';
import logger from '../core/logger';

let prisma: PrismaClient;

export async function connectDB() {
    try {
        prisma = new PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        });

        // Test the connection
        await prisma.$connect();
        logger.info('Prisma connected to PostgreSQL database');
    } catch (err) {
        logger.error('Prisma connection error');
        logger.error(err);
        process.exit(1);
    }

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
        await prisma.$disconnect();
        logger.info('Prisma disconnected due to app termination');
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        await prisma.$disconnect();
        logger.info('Prisma disconnected due to app termination');
        process.exit(0);
    });
}

export function getPrismaClient(): PrismaClient {
    if (!prisma) {
        throw new Error('Prisma client not initialized. Call connectDB() first.');
    }
    return prisma;
}
