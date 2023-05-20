import { validate } from "../authorization/auth.js";
import { Estudante } from "../models/Estudante.js";

export const EstudanteRoutes = (app) => {
  //inserir
  app.post("/estudante", validate, async (req, res) => {
    const { name, approved, idade, genero, endereco, telefone, email, curso } =
      req.body;
    const estudante = {
      name,
      approved,
      idade,
      genero,
      endereco,
      telefone,
      email,
      curso,
    };
    try {
      await Estudante.create(estudante);
      res.status(201).send({ message: "Estudante inserido exitosamente" });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .send({ menssage: "ja o estudante existe na Base de dados" });
        // Realize ações apropriadas para lidar com a violação de chave única
      }
      res.status(500).json({ error: error });
    }
  });

  //Buscar
  app.get("/estudante", async (req, res) => {
    try {
      let id = req.body.id;
      //let estudante = await Estudante.find({ _id: id });
      let estudante = await Estudante.findById(id);
      if (!estudante) {
        res.status(204).send({ message: "No encontramos o Estudante" });
        return;
      }
      res.status(200).send({ estudante });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  app.get("/allEstudantes", async (req, res) => {
    try {
      let estudantes = await Estudante.find();
      if (!estudantes) {
        res.status(204).send({ message: "No encontramos nehum estudante" });
        return;
      }
      res.status(200).send(estudantes);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  //Por posision
  app.get("/estudante/:pos", async (req, res) => {
    try {
      const { pos } = req.params;
      let estudante = await Estudante.findOne().skip(pos);
      if (!estudante) {
        res.status(204).send({ message: "No encontramos o estudante" });
        return;
      }
      res.status(200).send({ estudante });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  });

  //Update
  // Actualizar una estudante por su ID
  app.put("/estudante/:id", async (req, res) => {
    try {
      let estudante = await Estudante.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!estudante) {
        res.status(204).send({ message: "No encontramos o estudante" });
        return;
      }
      res.status(200).send({ message: "Estudante atualizado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar o estudante" });
    }
  });

  //Delete
  app.delete("/estudante/:id", async (req, res) => {
    try {
      let estudante = await Estudante.findByIdAndRemove(req.params.id);
      //await Estudante.findByIdAndDelete(req.params.id);
      if (!estudante) {
        res.status(204).send({ message: "No encontramos o estudante" });
        return;
      }
      res.status(200).send({ message: "Estudante deletado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error ao eliminar o estudante" });
    }
  });

  //Patch
  app.patch("/estudante/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true }; // Devolver el documento actualizado

      const estudante = await Estudante.findByIdAndUpdate(id, updates, options);

      if (!estudante) {
        res.status(204).send({ message: "No encontramos o estudante" });
        return;
      }
      res.status(200).send({ message: "Estudante deletado exitosamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  });
};
