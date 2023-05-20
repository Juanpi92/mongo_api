import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./infra/db.js";
import { PersonRoutes } from "./routes/person_routes.js";
import cors from "cors";
import { LoginRoutes } from "./routes/login_routes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

/*const whiteList = ["http://nunca.com"];
app.use(
  cors({
    origin: whiteList, // Ajusta el origen permitido según tus necesidades
    methods: ["GET", "POST", "PUT", "DELETE"], // Ajusta los métodos permitidos según tus necesidades
  })
);*/

//Conectando a db
connectDB();

//Rotas da Api
PersonRoutes(app);

LoginRoutes(app);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Api is going" });
});

app.listen(PORT, () => {
  console.log(`API ready to use in http://localhost:${PORT}`);
});
