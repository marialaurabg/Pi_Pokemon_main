
import { 
    GET_POKEMONS,
    RESET_POKEMONS,
    FILTER_TYPE,
    GET_TYPE,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    GET_NAME_POKEMON,
    POST_POKEMON,
    GET_DETAIL,
} from './actions'
// GET_DETAIL_STATE

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){

        //--------------------------------------------------------------------------
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };

        //--------------------------------------------------------------------------
        case RESET_POKEMONS:
            return {
                ...state,
                pokemons: []
            };

        //--------------------------------------------------------------------------
        case GET_TYPE:
            return {
                ...state,
                types: action.payload
            }
        
        //--------------------------------------------------------------------------
        case FILTER_TYPE:
            const allPokemons = state.allPokemons;
            console.log(allPokemons);
            const filterPokes = action.payload === 'all' ? allPokemons : allPokemons.filter(e => e.types.includes(action.payload))//ARREGLAR ACÁ!!!! filterPokes es un array vacio
            console.log(filterPokes);
            // if(filterPokes.length <= 0){
            //     filterPokes = allPokemons;
            //     alert('POKEMON TYPE NOY FOUND')
            // };
            return {
                ...state,
                pokemons: filterPokes,

            };
        //--------------------------------------------------------------------------
        case FILTER_CREATED:
            const allPokes = state.allPokemons;
            let filterCreated;
            if(action.payload === 'created'){
                filterCreated = allPokes.filter(e => e.createdInDb);
                console.log(filterCreated);
                if(!filterCreated.length){
                    return{
                        ...state
                    };
                }
            }
            if(action.payload === 'api'){
                filterCreated = allPokes.filter(e => !e.createdInDb);
            }
            return {
                ...state,
                pokemons: filterCreated
            }

            //--------------------------------------------------------------------------
            case ORDER_BY_NAME:
            const allPokesName = [...state.pokemons];// esto es lo mismo que state.pokemos??? ----> INVESTIGAR!!!
            const sortPokes = action.payload === 'asc' ? allPokesName.sort((a, b)=>{
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            allPokesName.sort((a, b)=>{
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                pokemons: sortPokes
            }

            //--------------------------------------------------------------------------
            case ORDER_BY_ATTACK:
                const allPokesAtt = [...state.pokemons]; // este es el estado que se esta renderizando
                const sortPokesAtt = action.payload === 'strong' ? allPokesAtt.sort((a, b)=>{
                    if(a.attack > b.attack){
                        return -1;
                    }
                    if(b.attack > a.attack){
                        return 1;
                    }
                    return 0;
                }) :
                allPokesAtt.sort((a, b)=>{
                    if(a.attack > b.attack){
                        return 1;
                    }
                    if(b.attack > a.attack){
                        return -1;
                    }
                    return 0;
                });
                console.log(sortPokesAtt);
                return {
                    ...state,
                    pokemons: sortPokesAtt
                }

            //--------------------------------------------------------------------------
            case GET_NAME_POKEMON: 
                return {
                    ...state,
                    pokemons: action.payload
                }

            //--------------------------------------------------------------------------
            case POST_POKEMON:
                return {
                    ...state,
                }

            //--------------------------------------------------------------------------
            case GET_DETAIL:
                return{
                    ...state,
                    detail: action.payload
                }

            //--------------------------------------------------------------------------
            // case GET_DETAIL_STATE:
            //     const allPoke = state.allPokemons;
            //     console.log(allPoke);
            //     const detailPokes = allPoke.filter(
            //         (e) => e.id.toString() === action.payload
            //     );
            //     // console.log(action.payload);//action.paylos es undefind ---- por que??
            //     return {
            //         ...state,
            //         detail: detailPokes

            //     }


        //agregar los otros casos ....
        // ver validaciones del PI de pokemon....
        default:
            return state;

    }

}

export default rootReducer;