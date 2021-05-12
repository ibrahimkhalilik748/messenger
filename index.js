const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!1234')
})


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://messenger123:messenger123@cluster0.em86h.mongodb.net/messenger?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

  const chatCollection = client.db("messenger").collection("chat");
  app.post('/addChat', (req, res) => {
    const newChat = req.body;
    console.log('adding new chat:', newChat)
    chatCollection.insertOne(newChat)
      .then(result => {
        console.log('chat', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/chatList', (req, res) => {
    // db.collection.find( { $query: {}, $orderby: { age : -1 } } )
    chatCollection.find({ $query: {}, $orderby: { age : -1 } }).toArray((err, result) => {
      res.send(result)
    })
  })

//   client.close();
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})