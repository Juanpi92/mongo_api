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
    email: String,
    curso: String,
  },
  "Estudantes"
);
