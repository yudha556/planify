import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

import { env } from "./env";

export const prisma = global.prisma || new PrismaClient({
    datasources: {
        db: {
            url: env.databaseUrl
        }
    }
});

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}
