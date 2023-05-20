import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../authorization/auth.js";

export const LoginRoutes = (app) => {
  //login
  //auth
  app.post("/register", async (req, res) => {
    let { user, email, password } = req.body;
    //Here we encripted the password
    let hashed_password = bcrypt.hash(req.body.password, process.env.PASSOS);
  });
};
