import cookieParser from "cookie-parser";
import express from "express";

import errorMiddleware from "./middleware/error.middleware.js";

import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter)
// app.use('api/v1/student', )
// app.use('/api/v1/lecturer', )


// Error Middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {res.send('University Database API')});


export default app;