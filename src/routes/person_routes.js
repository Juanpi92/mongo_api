import { Person } from "../models/Person.js";

export const PersonRoutes=(app)=>{
    //inserir
    app.post("/person",async (req, res) => {
        const{name,salary,approved}=req.body;
        const person={
            name,
            salary,
            approved
        }
        try {
           await Person.create(person);
            res.status(201).send({message:"Usuario inserido exitosamente"}) 
        } catch (error) {
           res.status(500).json({error:error}) 
        }
            });

            //Buscar
            app.get("/person",async (req, res) => {
                 try {
                    let id=req.body.id;
                    console.log(id)
                  let person=await Person.find({_id:id});
                    res.status(201).send({person}) 
                } catch (error) {
                    console.log(error)
                   res.status(500).json({error:error}) 
                }
                    });

                    app.get("/Allperson",async (req, res) => {
                        try {
                           let people=await Person.find();
                           res.status(201).send({people}) 
                       } catch (error) {
                           console.log(error)
                          res.status(500).json({error:error}) 
                       }
                           });

     app.get("/person/:pos",async (req, res) => {
                            try {
                                const { pos } = req.params;
                           let person=await Person.findOne().skip(pos)
                            res.status(201).send({person}) 
                           } catch (error) {
                               console.log(error)
                              res.status(500).json({error:error}) 
                           }
                               });              
}