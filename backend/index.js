const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/User')
const bodyParser = require('body-parser')
const session = require('cookie-session')
const cors = require('cors')

const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://todo-ai6z.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.use(cors())
app.use(bodyParser.json())
app.use(express.json());
app.use('/api/v1/user', userRoute)
app.use(bodyParser.json());
app.use(session({
    secret: 'home-care-app',
    resave: false,
    saveUninitialized: false,
}));

const connect = () => {
    mongoose
        .connect(
            "mongodb+srv://DHRUVA:DHRUVA@cluster0.lp8ku9c.mongodb.net/LOVETODO?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("MONGODB CONNECTED");
        })
        .catch((err) => {
            console.log("Mongodb error : ", err);
        });
};

const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
    connect();
    console.log(`Server started running on PORT 8000`);
});