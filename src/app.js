import express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./infra/db.js";
import { Person } from "./models/Person.js";


dotenv.config();
const PORT = process.env.PORT||3000;
const app = express();
app.use(express.json());

//Conectando a db
connectDB();


//Rotas da Api
app.get("/",async (req, res) => {
    res.status(200).send({message:"Api is going"})
    });
app.post("/person",async (req, res) => {
    const{name,salary,approved}=req.body;
    const person={
        name,
        salary,
        approved
    }
    try {
       await Person.create(person);
        res.status(201).send({message:"Usuario inserido exitosamente"}) 
    } catch (error) {
       res.status(500).json({error:error}) 
    }
        });


app.listen(PORT, () => {
    console.log(`API ready to use in http://localhost:${PORT}`);
  });