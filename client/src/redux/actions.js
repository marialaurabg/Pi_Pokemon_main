import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const RESET_POKEMONS = "RESET_POKEMONS";
export const FILTER_TYPE = "FILTER_TYPE";
export const GET_TYPE = "GET_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAIL = "GET_DETAIL";
// export const GET_DETAIL_STATE = "GET_DETAIL_STATE"


//-------------------------------- GET POKEMONS

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
            })
    } 

};

//-------------------------------- RESET POKEMONS
export function resetPokemons() {
    return {
        type: RESET_POKEMONS
    }
};

//-------------------------------- GET TYPES
export function getTypes(){
    return async function (dispatch) {
        // try {
            const json = await axios.get('http://localhost:3001/types');
            return dispatch({
                type: GET_TYPE,
                payload: json.data
            });
        // } catch (error) {
        //     console.log(error);
        // }
    }
};

//-------------------------------- FILTRO POR TIPO
export function filterType(payload){
    console.log(payload);
    return {
        type: FILTER_TYPE,
        payload
    }
};

//-------------------------------- FILTRO CREATED
export function filterByCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

//-------------------------------- ORDER BY NAME
export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

//-------------------------------- ORDER BY ATTACK
export function orderByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

//-------------------------------- GET NAME
export function getNamePokemon(namePoke){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/pokemons?name=${namePoke}`);
        console.log(json);
        return dispatch({
            type: GET_NAME_POKEMON,
            payload: json.data
        })
    }
}

//-------------------------------- POST POKEMON
export function postPokemon(payload){
    return async function(){
        const response = await axios.post('http://localhost:3001/pokemons', payload);
        return response;
    }
}

//-------------------------------- GET DETAILS
export function getDetail(id){
    console.log('props: ' + id);
    return async function(dispatch){
         try {
            var res = await axios.get('http://localhost:3001/pokemons/' + id);
            console.log('action detail: '+ res.data);


            return dispatch({
                type: GET_DETAIL,
                payload: res.data
            })
        } catch (error) {
            console.log(`message error: ${error}`);
        }
    }
}

//-------------------------------- GET DETAILS STATE
// export function getDetailFromState(payload){
//     return{
//         type: GET_DETAIL_STATE,
//         payload

//     }
// }

// -------------------------------- GET DETAILS PROMIS
// export function getDetail(id){
//     return function(dispatch){
//         axios.get("http://localhost:3001/pokemons/" + id)
//         .then(res => res.data)
//         .then(res => dispatch({
//             type: GET_DETAIL,
//             payload: res
//         }))
//         .catch(error => console.log(error));
//     }
// }
