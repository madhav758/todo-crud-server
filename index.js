//Build a backend system where users can create multiple workspaces and manage tasks inside them.
import express from "express"
import "dotenv/config";
import { TodoInputSchema, todoSchema } from "./types.js";
import mongoose from "mongoose";


const PORT = 3000;

const app = express();
app.use(express.json());

await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => console.log('Connected!'));

app.get('/', (req, res) => {
  res.send("hello World from the server")
})
//build the endpoints

app.get('/todo', async (req, res) => {
  try {
    const Todo = mongoose.model('Todo', todoSchema);
    await Todo.find()
      .then((result) => {
        console.log(result)
        return res.status(200).json(result);
      })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error "
    })
    console.log(error)
  }
})

app.post("/todo", async (req, res) => {
  try {
    //get the input fron the user & verify the schema using safeparse
    const parsedData = TodoInputSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "User input not valid"
      })
    }
    // Defining TodoSchema model
    const Todo = mongoose.model(
      'Todo', todoSchema);

    // creating todo using create method
    await Todo.create(parsedData.data)
      .then(result => {
        console.log(result)
        return res.status(200).json(result)
      })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error "
    })

  }

})

app.put("/todo/:id", async (req, res) => {
  try {
    //get the todo you want to upate by id 
    //update the todo in the mongodb using the find and update
    const { id } = req.params;
    const parsedData = TodoInputSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "User input not valid"
      })
    }
    const Todo = mongoose.model('Todo', todoSchema);
    await Todo.findByIdAndUpdate(id, parsedData.data).then((result) => {
      console.log(result)
      return res.status(200).json(result);
    })



  } catch (error) {
    return res.status(500).json({
      message: "Internal server error "
    })
  }
})
app.patch("/todo/:id", (req, res) => {

})
app.delete("/todo/:id", (req, res) => {

})



app.listen(3000);


// madhavshreyansh_db_user
// 5nV9HkNWe8gh5mnD

//signin 
//create project 
//creat cluster-> free 
// username|| password 
// copass GUI


// mongodb+srv://<db_username>:5nV9HkNWe8gh5mnD@cluster0.kawo6vi.mongodb.net/

// use this conection string  to conect to compass
//postman-> mac express server  -> mongodb cluster -> perform operation CRUD


//node js cannot connect to the mongodb cluster by itself and we need a package 
//package name-> moongose (npm i mongoose)




