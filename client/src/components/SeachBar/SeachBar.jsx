import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { getNamePokemon } from '../../redux/actions';
import style from './SeachBar.module.css'

export default function SeachBar({setCurrentPage}){
    const dispatch = useDispatch();
    const allPokes = useSelector((state) => state.pokemons)
    const [input, setInput] = useState("");//se setea en un string vacio

    function handleInput(e){
        // e.preventDefault();
        setInput(e.target.value);//lo que tipea el usuario se guarda en el estado local input
    };

    function handleSubmit(e){//funcion del boton submit
        e.preventDefault();
        dispatch(getNamePokemon(input));//input es lo que esta escibiendo el usuario
        setInput("");// esto limpia el input para que no quede lo escrito
        setCurrentPage(1)
    };

    return (
        <div className={style.container}>

            <div className={style.item}>
                <input className={style.input} type="text" placeholder="Search..." onChange={(e) => handleInput(e)} value={input}/>
            </div>
            <div className={style.item}>
                <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}>SEARCH</button>
            </div>
           
        </div>
    )
}
