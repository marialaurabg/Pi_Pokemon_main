import React from "react";
import { Link } from "react-router-dom";
import noImage from '../../images/noImage.png';
import style from './Card.module.css';


export default function Card({ image, name, types, id }){
    console.log('Card: ' + id);
    return (
        <Link className={style.link} to={`/pokemons/${id}`}>
            <div className={style.card}>
                <img className={style.image} src={image ? image : noImage} alt= "Not found"/>
            <div className={style.text}>
                <h3>{name.toUpperCase()}</h3>
                {
                    types &&
                    types.map((e)=>{
                        return (
                            <div>{e.toUpperCase()}</div>
                        )
                    })
                }  
                </div>  
            </div>
        </Link>
    )
}

// {/* <div key={id}>
// </div> */}
