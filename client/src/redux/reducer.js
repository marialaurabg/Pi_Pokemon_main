

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
    SET_ERROR,
    CLEAR_DETAIL,
    DELETE_POKEMON
} from './actions'
// ---------------------------

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    currentPage: 1,
    detail: [],
    error: false,
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){

        //--------------------------------------------------------------------------
        case GET_POKEMONS:
            // if(!action.payload.includes(null)){
                return{
                    ...state,
                    pokemons: action.payload,
                    allPokemons: action.payload
                };
            // }else{
            //     return{
            //         ...state,
            //         error: true
            //     };
            // }

        //--------------------------------------------------------------------------
        case RESET_POKEMONS:
            return {
                ...state,
                pokemons: [],
                error: false
            };

        //--------------------------------------------------------------------------
        case GET_TYPE:
            return {
                ...state,
                types: action.payload
            }

        //--------------------------------------------------------------------------
        case FILTER_TYPE:
            const pokemons = state.pokemons;
            const all = state.allPokemons;
            const filterPokes = action.payload === 'all' ? all : pokemons.filter(e => e.types.includes(action.payload))
            console.log('filtrado: ' + filterPokes);
            if(!filterPokes.length){
                return {
                    ...state,
                    error: true
                }
            }else{
                return {
                    ...state,
                    pokemons: filterPokes,
                    error: false

                };
            }

        //--------------------------------------------------------------------------
        case FILTER_CREATED:
            const allPokes = state.allPokemons;
            let filterCreated;
            if(action.payload === 'created'){
                filterCreated = allPokes.filter((e) => e.createdInDb);
                console.log(filterCreated);
                if(!filterCreated.length){
                    return{
                        ...state,
                        error: true
                    };
                }
            }
            if(action.payload === 'api'){
                filterCreated = allPokes.filter((e) => !e.createdInDb);
            }
            return {
                ...state,
                pokemons: filterCreated,
                error: false
            }

            //--------------------------------------------------------------------------
            case ORDER_BY_NAME:
            const allPokesName = [...state.pokemons];
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
                pokemons: sortPokes,
                error: false
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
                    pokemons: sortPokesAtt,
                    error: false
                }

            //--------------------------------------------------------------------------
            case GET_NAME_POKEMON: 
                return {
                    ...state,
                    pokemons: [],
                    pokemons: action.payload
                }

            //--------------------------------------------------------------------------
            case POST_POKEMON:
                return {
                    ...state,
                }

            //--------------------------------------------------------------------------
            case CLEAR_DETAIL:
                return {
                    ...state,
                    detail: []
                }

            //--------------------------------------------------------------------------
            case GET_DETAIL:
                return{
                    ...state,
                    detail: action.payload
                }
            
            //--------------------------------------------------------------------------
            case SET_ERROR:
                return{
                    ...state,
                    error: action.payload
                }

            //--------------------------------------------------------------------------
            case DELETE_POKEMON:
                return{
                    ...state,
                }

        //agregar los otros casos ....
        // ver validaciones del PI de pokemon....
        default:
            return state;

    }

}

export default rootReducer;