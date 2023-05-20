import mongoose from "mongoose";
export const Estudante = mongoose.model(
  "Estudante",
  {
    name: String,
    approved: Boolean,
    idade: {
      type: Number,
      integer: true,
    },
    Genero: String,
    endereco: String,
    telefone: String,
    email: {
      type: String,
      unique: true,
    },
    curso: String,
  },
  "Estudantes"
);
