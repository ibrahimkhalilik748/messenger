const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chatHandler = require('./src/route/chatHandler')

require('dotenv').config()

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());


mongoose
    .connect(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.em86h.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Hello"))
    .catch(err => console.log(err))


// mongoose.connect('mongodb://localhost/lol', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Hello"))
//     .catch(err => console.log(err))


app.use('/message', chatHandler)

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err })
}


app.use(errorHandler);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})