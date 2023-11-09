
// <==main express servre code strating point ==>
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const app = express();
require('dotenv').config();
// server local dynamic port 
const port = process.env.PORT || 5001;



//<==some middleware==>
app.use(cors());
app.use(express.json());


// <==database uri ==>
// user name and pass  uri 
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);
// const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.eehyjj4.mongodb.net/<database-name>?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eehyjj4.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);


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
    // <===========crud operations starting ==========>
    // database and collection name==> 
    const jobCollection = client.db("jobsDB").collection("jobs");
    const applyJobCollection = client.db("jobsDB").collection("applyJob");

    // <====Add a job inserted====>
    app.post("/v1/job", async (req, res) => {
        const job = req.body;
          console.log(job);
        const result = await jobCollection.insertOne(job);
        console.log(result);
        res.send(result);
      });
    
    // applied job inserted
    app.post("/v1/appliedJobs", async (req, res) => {
        const applyJob = req.body;
          console.log(applyJob);
        const result = await applyJobCollection.insertOne(applyJob );
        console.log(result);
        res.send(result);
      });


    //  <====== read data and display ready data api====>
    app.get("/v1/jobs", async (req, res) => {
        const result = await jobCollection.find().toArray();
        res.send(result);
      });

      // applied job get 
    app.get("/v1/applyJob", async (req, res) => {
        const result = await applyJobCollection.find().toArray();
        res.send(result);
      });
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   //awit client close here
    // await client.close();
  }
}



run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Crud is running...");
});

app.listen(port, () => {
  console.log(`Job server Running on port ${port}`);
});