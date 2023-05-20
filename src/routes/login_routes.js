import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuarios.js";

export const LoginRoutes = (app) => {
  //Registo de usuario
  app.post("/register", async (req, res) => {
    try {
      let { user, email, password } = req.body;
      //Here we encripted the password
      let hashed_password = await bcrypt.hash(
        password,
        Number(process.env.PASSOS)
      );
      let usuario = {
        user,
        email,
        password: hashed_password,
      };
      let existe = await Usuario.findOne({ email: usuario.email });
      if (existe) {
        return res.status(400).send({ error: "User already exist " });
      }
      await Usuario.create(usuario);
      res.status(201).send({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      res.status(500).send({ error: "Cant access to the database" });
    }
  });
  //login
  app.get("/login", async (req, res) => {
    try {
      let { email, password } = req.body;
      let existe = await Usuario.findOne({ email: email });
      // OJO puede ser interesante  let existe = await Usuario.findOne({ email: email }, "-password");
      console.log(existe);
      if (!existe) {
        return res.status(400).send({ error: "User or password wrong" });
      }
      let valid = await bcrypt.compare(password, existe.password);
      if (!valid) {
        return res.status(400).send({ error: "User or password wrong " });
      }
      //Então encontrou o usuario na bd
      //Convierto de documento de moongose a plain javascript object
      //existe = existe.toObject();
      existe = existe.toJSON();
      delete existe.password;
      console.log(existe);
      let token = jwt.sign(existe, process.env.SECRET_TOKEN, {
        expiresIn: "2h",
      });
      //Envio a resposta
      res.setHeader("auth-token", JSON.stringify(token));
      res.status(200).send({ user: existe });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Cant access to the database" });
    }
  });
};
