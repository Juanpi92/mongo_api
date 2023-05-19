import { Person } from "../models/Person.js";

export const PersonRoutes = (app) => {
  //inserir
  app.post("/person", async (req, res) => {
    const { name, salary, approved } = req.body;
    const person = {
      name,
      salary,
      approved,
    };
    try {
      await Person.create(person);
      res.status(201).send({ message: "Usuario inserido exitosamente" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });

  //Buscar
  app.get("/person", async (req, res) => {
    try {
      let id = req.body.id;
      console.log(id);
      //let person = await Person.find({ _id: id });
      let person = await Person.findById(id);
      if (!person) {
        res.status(204).send({ message: "No encontramos o usuario" });
      }
      res.status(200).send({ person });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  });

  app.get("/Allperson", async (req, res) => {
    try {
      let people = await Person.find();
      if (!people) {
        res.status(204).send({ message: "No encontramos nehum usuario" });
      }
      res.status(200).send({ people });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  });

  //Por posision
  app.get("/person/:pos", async (req, res) => {
    try {
      const { pos } = req.params;
      let person = await Person.findOne().skip(pos);
      if (!person) {
        res.status(204).send({ message: "No encontramos o usuario" });
      }
      res.status(200).send({ person });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  });
};

//Update
// Actualizar una Persona por su ID
app.put("/person/:id", async (req, res) => {
  try {
    let person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) {
      res.status(204).send({ message: "No encontramos o usuario" });
    }
    res.status(200).send({ message: "Usuario atualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el ejemplo:", error);
    res.status(500).json({ error: "Error al actualizar el ejemplo" });
  }
});

//Delete
app.delete("/person/:id", async (req, res) => {
  try {
    let person = await Person.findByIdAndRemove(req.params.id);
    //await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      res.status(204).send({ message: "No encontramos o usuario" });
    }
    res.status(200).send({ message: "Usuario deletado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la persona:", error);
    res.status(500).json({ error: "Error al eliminar la persona" });
  }
});
