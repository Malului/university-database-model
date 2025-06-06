import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

console.log("Prisma client is running successfully");

process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("\nPrisma client disconnected");
    process.exit(0);
})

export default prisma;