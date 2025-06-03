import cookieParser from "cookie-parser";
import express from "express";

const app = express();

const port= 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routes


// Middleware




app.get('/', (req, res) => {res.send('University Database API')});

app.listen(port, () => {
    console.log(`Connect on http://localhost:${port}`)
})

export default app;