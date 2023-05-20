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
};
