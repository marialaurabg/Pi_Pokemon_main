const axios = require('axios');
const { Pokemon, Type } = require('../db'); 



const getInfoApi = async () => {
    try {
      const primerosPokemon = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const segundosPokemon = await axios.get(primerosPokemon.data.next);
      const todosPokemon = primerosPokemon.data.results.concat(segundosPokemon.data.results);
      const infoPokemons = await Promise.all(
        todosPokemon.map(async (e) => {
          let info = await axios.get(e.url);
          return {
            id: info.data.id,
            name: info.data.name,
            hp: info.data.stats[0].base_stat,
            attack: info.data.stats[1].base_stat,
            defense: info.data.stats[2].base_stat,
            speed: info.data.stats[5].base_stat,
            height: info.data.height,
            weight: info.data.weight,
            image: info.data.sprites.other.dream_world.front_default,
            types: info.data.types.map((e) => e.type.name),
          };
        })
      );
      return infoPokemons;
    } catch (error) {
      console.log({error: error.message})
    }
  };


//-------------------------------- TRAE DATOS DE LA DB
const getPokeDb = async () => {
  const pokeDb = await Pokemon.findAll({
    //trae los pokemones, que incluyan el nombre del type 
    include: {
      model: Type,
      attributes: ['name'],  //me trae el name del type
      through: {
        attributes: [],
      }, 
    },
  });
  const pokeMap = pokeDb?.map((pokemon) =>{
    const { types } = pokemon;
    const pokeData = {
      ...pokemon.dataValues,
      types: types.map(e => e.name),
    };

    return pokeData
  });
  return pokeMap;
};


//-------------------------------- UNE LOS DATOS DE LA API Y DE LA DB
const getAllPoke = async () => {
    try {
        const apiPokeData = await getInfoApi();
        const dbPokeData = await getPokeDb();
        const allInfo = dbPokeData.concat(apiPokeData)
        return allInfo;

    } catch (error) {
        console.log({error: error.message});

    }
};


module.exports = {
    getAllPoke,

}