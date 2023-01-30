import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getDetail, getDetailFromState } from '../../redux/actions';


export default function Detail(){

    const dispatch = useDispatch();
    const { id } = useParams()
    console.log('detail: '+ id);


    const detailPokemon = useSelector((state) => state.detail);
    // const allPokemons = useSelector((state) => state.pokemons);

    useEffect(() => {
        // if(allPokemons.length){
        //     dispatch(getDetailFromState(id))
        // } else {
            dispatch(getDetail(id))//de esta forma accedo al id
        // }}
    }, [dispatch]);//allPokemons.length
   
    return (
        <div>
            {
                detailPokemon.length ? 
                <div>
                   {detailPokemon[0].name[0]} 
                </div>
                : 
               <h1>error</h1>
            }
        
        </div>
    )
        
}