const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

// Middleware code
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0mh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Define the database and Collection Campaign
    const database = client.db("ManagementDB");
    const tasksCollection = database.collection("tasks");
    const userCollection = client.db("CampaignDB").collection("users");

    // API route to handle POST tasks
    app.post("/tasks", async (req, res) => {
      const newData = req.body;
      const result = await tasksCollection.insertOne(newData);
      res.send(result);
    });

    // get all biodata from db
    app.get("/tasks", async (req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });

    // get a biodata by id
    app.get("/job-tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tasksCollection.findOne(query);
      res.send(result);
    });

    // update a biodata in db
    app.put("/task-edit/:id", async (req, res) => {
      const id = req.params.id;
      const editData = req.body;

      // Validate that required fields are present
      if (!editData.title || !editData.category) {
        return res.status(400).send("Title and category are required.");
      }

      // Ensure that the ID is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).send("Invalid task ID.");
      }

      const query = { _id: new ObjectId(id) };
      const options = { upsert: false };
      const updateDoc = {
        $set: {
          title: editData.title,
          description: editData.description,
          category: editData.category,
          timestamp: new Date().toISOString(),
        },
      };

      try {
        const result = await tasksCollection.updateOne(
          query,
          updateDoc,
          options
        );

        // Check if any document was updated
        if (result.modifiedCount === 0) {
          return res.status(404).send("Task not found or no changes made.");
        }

        res.send({ message: "Task updated successfully", data: result });
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Error updating task.");
      }
    });

    // Cancel/delete an order
    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await tasksCollection.deleteOne(query);
      res.send(result);
    });

    // get all biodata posted by a specific user
    app.get("/tasks/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await tasksCollection.find(query).toArray();
      res.send(result);
    });

    // Update order and category
    app.patch("/tasks/update-category-order/:id", async (req, res) => {
      const { id } = req.params;
      const { category, order } = req.body;
      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { category: category } }
        );

        res.send({ message: "Task marked as completed", data: result });
      } catch (error) {
        res.status(500).send({ error: "Failed to Update order and category" });
      }
    });

    // new Users related data
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // Cell to Api
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("task Management server is running");
});

// Start the server
app.listen(port, () => {
  console.log(`job task server is running on port: ${port}`);
});
