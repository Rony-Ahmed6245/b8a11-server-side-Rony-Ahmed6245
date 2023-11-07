const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5001;



// middleware
app.use(cors());
app.use(express.json());



// user name and pass  uri 
// jobProtal
// 0aDbL3woCP0BdSz2
const username = process.env.MONGODB_USERNAME;
console.log(username);
const password = process.env.MONGODB_PASSWORD;
console.log(password);
// there is problem uri is not working be tri in this uri
// const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.eehyjj4.mongodb.net/<database-name>?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${username}:${password}@cluster0.eehyjj4.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://jobProtal:0aDbL3woCP0BdSz2@cluster0.eehyjj4.mongodb.net/?retryWrites=true&w=majority";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // crud operations starting==>
    // database and collection name 
    const jobCollection = client.db("jobsDB").collection("jobs");

    // create data ==>
    app.post("/v1/job", async (req, res) => {
        const job = req.body;
          console.log(job);
        const result = await jobCollection.insertOne(job);
        console.log(result);
        res.send(result);
      });


    //   read data ==>
    app.get("/v1/jobs", async (req, res) => {
        const result = await jobCollection.find().toArray();
        res.send(result);
      });







    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Crud is running...");
});

app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});