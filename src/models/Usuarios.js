import mongoose from "mongoose";
export const Usuario = mongoose.model(
  "Usuario",
  {
    user: String,
    email: String,
    password: String,
  },
  "Usuarios"
);
