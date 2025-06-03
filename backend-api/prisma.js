import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

console.log("\nPrisma client connected...");

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("\nPrisma client disconnected...");
    process.exit(0);
})

export default prisma;