import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPokemons, getTypes, postPokemon } from "../../redux/actions";
import style from './CreatePokemon.module.css'

import imag from '../../images/posado.png'


function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = "A name is required";
    }
    if (!input.hp || input.hp <= 0 || input.hp > 150){
        errors.hp = "A number between 1 and 150 is required"
    }
    if(!input.attack || input.attack < 0 || input.attack >150){
        errors.attack = "A number between 1 and 150 is required"
    }
    if(!input.defense || input.defense < 0 || input.defense >150){
        errors.defense = "A number between 1 and 150 is required"
    }
    if(!input.speed || input.speed < 0 || input.speed >150){
        errors.speed = "A number between 1 and 150 is required"
    }
    if(!input.types.length){
        errors.types = "Must have one or two types"
    }

    return errors;
}


export default function CreatePokemon(){

    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    
    //Estados locales
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name:"",
        hp:"",
        attack:"",
        defense: "",
        speed:"",
        height:"",
        weight:"",
        image:"",
        types:[]//se setea en un aray vacio para que podamos poner todas la que queramos
    })

    //----------------------------------------------------

    let disableBtt = 
        !(
            input.name.length  &&
            input.hp.length &&
            input.attack.length &&
            input.defense.length &&
            input.speed.length &&
            input.types.length
        ) ||
        input.hp > 150 ||
        input.attack > 150 ||
        input.defense > 150 ||
        input.speed > 150;

    //----------------------------------------------------

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    useEffect(() => {
        setErrors(
            validate({
                ...input,
            })
        );
    }, [input]);
    
    //----------------------------------------------------

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e){
        if(!input.types.includes(e.target.value)){
            setInput({
                ...input,
                types:[...input.types, e.target.value]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postPokemon(input))
        alert('Pokemon created successfully!!')
        //vulvo a poner el Input en blanco
        setInput({
            name:"",
            hp:"",
            attack:"",
            defense: "",
            speed:"",
            height:"",
            weight:"",
            image:"",
            types:[]
        })
        //me lleva al pokemon creado en le home ---> redirige al usuario ----> SOLO ME LLEVA AL HOME 
        history.push('/home')
        dispatch(getPokemons())
    }

    function handleDeleteType(e){
        setInput({
            ...input,
            types: input.types.filter((type) => type !== e)
        })
    }


    //----------------------------------------------------

    return(
        <div className={style.gral}>
            <div className={style.ima}>
                <img src={imag} alt='not found'/>
            </div>

            <Link to='/home'>
                <div className={style.homeButton}>
                    <button className={style.button}>Return Home</button>
                </div>
            </Link>
            <div className={style.conteiner}>
                <div className={style.cardCreated}>
                    <h1 className={style.title}>CREATE YOUR POKEMON</h1>

                    <form onSubmit={(e)=>{ handleSubmit(e) }}>
                        <div className={style.form}>
                            <div>
                                <label className={style.title2}>NAME:</label>
                                <input className={style.input} type="text" value={input.name} name='name' placeholder="Name..." onChange={(e) => handleChange(e)}/>
                                {errors.name && (
                                    <div className={style.errors}>{errors.name}</div>
                                )}
                            </div>
                            <div>
                                <label className={style.title2}>LIFE:</label>
                                <input className={style.input} type="number" value={input.hp} name="hp" placeholder="1 - 150" onChange={(e) => handleChange(e)}/>
                                {errors.hp && (
                                    <div className={style.errors}>{errors.hp}</div>
                                )}
                            </div>
                            <div>
                                <label className={style.title2}>ATTACK:</label>
                                <input className={style.input} type="number" value={input.attack} name="attack" placeholder="1 - 150" onChange={(e) => handleChange(e)}/>
                                {errors.attack && (
                                    <div className={style.errors}>{errors.attack}</div>
                                )}
                            </div>
                            <div>
                                <label className={style.title2}>DEFENSE:</label>
                                <input className={style.input} type="number" value={input.defense} name="defense" placeholder="1 - 150" onChange={(e) => handleChange(e)}/>
                                {errors.defense && (
                                    <div className={style.errors}>{errors.defense}</div>
                                )}
                            </div>
                            <div>
                                <label className={style.title2}>SPEED:</label>
                                <input className={style.input} type="number" value={input.speed} name="speed" placeholder="1 - 150" onChange={(e) => handleChange(e)}/>
                                {errors.speed && (
                                    <div className={style.errors}>{errors.speed}</div>
                                )}
                            </div>
                            <div>
                                <label className={style.title2}>HEIGHT <small>(cm):</small></label>
                                <input className={style.input} type="number" value={input.height} name="height" placeholder="Height..." onChange={(e) => handleChange(e)}/>
                            </div>
                            <div>
                                <label className={style.title2}>WEIGHT <small>(kg):</small></label>
                                <input className={style.input} type="number" value={input.weight} name="weight" placeholder="Weight..." onChange={(e) => handleChange(e)}/>
                            </div>
                            <div>
                                <label className={style.title2}>IMAGE:</label>
                                <input className={style.input} type="text" value={input.image} name="image" placeholder="URL..." onChange={(e) => handleChange(e)}/>
                            </div>

                            <div>
                                <select className={style.select} onChange={(e)=> handleSelect(e)} disabled={input.types.length >= 2} defaultValue="title">
                                    <option className={style.options} value="title" disabled name='types'>TYPES</option> 
                                    {
                                        types.map( e =>{
                                            return(
                                                <option className={style.options} value={e.name} key={e.name}>{e.name.toUpperCase()}</option>//poner el mayuscula
                                            );
                                        })
                                    }
                                </select>
                                <ul className={style.types}>
                                    {input.types.map(e => {
                                        return (
                                            <li className={style.types} key={e}>
                                                {e.toUpperCase()}
                                                <button className={style.delete_button} onClick={()=> handleDeleteType(e)}>x</button>
                                            </li>
                                        )}
                                    )}
                                </ul>
                                {errors.types && (
                                    <div className={style.errors2}>{errors.types}</div>
                                )}
                            </div>

                            <button className={style.button_create} type="submit" disabled={disableBtt}>CREATE</button>
                        </div>
                        
                    </form>
                </div> 
            </div>
        </div>
    )
}


