const { Router } = require('express');
const axios = require('axios')
const { getAllPoke } = require('./controllers.js')
const { Pokemon, Type } = require('../db'); 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//------------------------------------ GET POKEMONS?NAME
router.get('/pokemons', async (req, res)=>{
    try {
        const { name } = req.query;
        const allPokemon = await getAllPoke()
    
        if(name){
            const pokeByName = await allPokemon.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            if(pokeByName.length){
                return res.status(200).send(pokeByName);
            } else {
                return res.status(404).send('Pokemon not found');
            }
        } else {
            return res.status(200).send(allPokemon)
        }
    
    } catch (error) {
     res.status(404).send({ error: error.message })
    }

});


//------------------------------------ GET TYPES
router.get('/types', async (req, res)=>{
    try {
        const url = "https://pokeapi.co/api/v2/type";

        const infoUrl = await axios.get(url);
        const apiInfo = await infoUrl.data.results.map(e => e.name);
        
        //guadamos en la DB
        apiInfo.forEach(e =>{
            Type.findOrCreate({
                where: { name: e}
            })
        });
        const allTypes =  await Type.findAll();
        res.status(200).send(allTypes)

    } catch (error) {
        res.status(404).send({ error: error.message });
    }

});


//------------------------------------ POST POKEMONS
router.post('/pokemons', async (req, res)=>{
    const { name, hp, attack, defense, speed, height, weight, image, createdInDb, types } =  req.body;

    try {

        if(!name) return res.status(404).send({error:'Please enter a name!!'});
        if(name && types.length){
            const newPokemon = await Pokemon.create({
                name: name.toLowerCase(), 
                hp,
                attack,
                defense,
                speed,
                height: Number(height),
                weight: Number(weight),
                image,
                createdInDb
            });

            const typeDb = await Type.findAll({
                where: { name: types }
            })
   
            newPokemon.addType(typeDb)
            console.log(newPokemon);
            res.status(200).send('Pokemon create successfully')
        }else{
            res.status.apply(404).send('Data is missing')
        }
    } catch (error) {
        console.log(error);
        res.status(404).send(`error message: ${error}`)
    }

});

  
//------------------------------------ GET POKEMONS/:ID

router.get("/pokemons/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const getById = await getAllPoke();


        if (id) {
            console.log('back: ' +  id);
            const pokemonById = getById.filter((e) => e.id.toString() === id);// antes e.id.toString === id
            console.log('pokemon filtrado x id: ' + pokemonById);
    
            if (pokemonById) {
            res.status(200).send(pokemonById);
            } else {
            res.status(404).send('Pokemon not found');
            }
        } else {
            res.status(404).send('Id not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  });


//------------------------------------ DELETE

router.delete('/delete/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        const pokeDelete = await Pokemon.findByPk(id);
        console.log(pokeDelete);
        if(!pokeDelete){
            res.status(404).send('Pokemon not found')
        } else {
            pokeDelete.destroy();
            res.status(200).send('pokemon detele succeffully')
        }
    } catch(error){
        console.log({ error: error.message });
    }
})


module.exports = router;
