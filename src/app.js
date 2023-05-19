import express  from "express";
import dotenv from "dotenv";
import { connectDB } from "./infra/db.js";
import { PersonRoutes } from "./routes/person_routes.js";


dotenv.config();
const PORT = process.env.PORT||3000;
const app = express();
app.use(express.json());

//Conectando a db
connectDB();


//Rotas da Api
PersonRoutes(app)

app.get("/",async (req, res) => {
    res.status(200).send({message:"Api is going"})
    });

app.listen(PORT, () => {
    console.log(`API ready to use in http://localhost:${PORT}`);
  });