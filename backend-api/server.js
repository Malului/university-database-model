import app from "./index.js";
import prisma from "./prisma.js";
import 'dotenv/config'

const port = process.env.PORT;

const startServer = async () => {
    //Connect prisma
    //connect db

    try {
        await prisma.$connect();
        console.log("Connected to database");

        app.listen(port, () => {
        console.log(`Connect on http://localhost:${port}`)
})
    } catch (error) {
        console.error("Failed to connect to database");
        process.exit(1)
    }
}

startServer()