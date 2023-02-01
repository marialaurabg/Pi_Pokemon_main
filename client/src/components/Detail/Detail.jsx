import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getDetail } from '../../redux/actions';
import Loading from "../Loading/Loading";
import style from "./Detail.module.css"


export default function Detail(){

    const dispatch = useDispatch();
    const { id } = useParams()
    console.log('detail: '+ id);


    const detailPokemon = useSelector((state) => state.detail);
    const history = useHistory()

    useEffect(() => {
        dispatch(getDetail(id))//de esta forma accedo al id
    }, [dispatch]);

    // function handlerDelete(){
    //     dispatch(deletePoke(id));
    //     alert('pokemon delete successfully');
    //     history.push('/home')
    //     dispatch(getPokemons())  
    // }
   
    return (
        <div className={style.gral}>
            <div>
                <Link to='/home'>
                    <button className={style.button}>x</button>
                </Link>
            </div>
                {
                    detailPokemon.length ? 
                
                    <div className={style.conteiner}>  

                        <div className={style.card}>
                            <div className={style.title}>
                                {detailPokemon[0].name.toUpperCase()} 
                            </div>
                            <div className={style.titleID}>
                                {detailPokemon[0].id} 
                            </div>
                            <div className={style.img}>
                                <img src={detailPokemon[0].image} alt='pokemon'/>
                            </div>
                            <ul className={style.titleTypes}>
                                {detailPokemon[0].types.map((e) =>
                                    <div> 
                                    {e.toUpperCase()}
                                    </div>
                                )}     
                            </ul>  
                            <div className={style.cardSecu}>            
                                <div>
                                    <label className={style.titleCarac}>LIFE: </label>
                                    <label className={style.titleCarac2}>{detailPokemon[0].hp}</label>
                                </div>
                                <div >
                                    <label className={style.titleCarac}>ATTACK: </label>
                                    <lable className={style.titleCarac2}>{detailPokemon[0].attack}</lable>
                                </div>                      
                                <div>
                                    <label className={style.titleCarac}>DEFENSE: </label>
                                    <label className={style.titleCarac2}>{detailPokemon[0].defense}</label>
                                </div>


                                <div>
                                    <label className={style.titleCarac}>SPEED: </label>
                                    <label className={style.titleCarac2}>{detailPokemon[0].speed}</label>
                                </div>
                                 {detailPokemon[0].height > 0 ? 
                                    <div>
                                        <label className={style.titleCarac}>HEIGHT: </label>
                                        <label className={style.titleCarac2}>{detailPokemon[0].height}cm</label>
                                    </div>
                                : <div> ? </div>}
                                {detailPokemon[0].weight > 0 ? 
                                    <div>
                                        <label  className={style.titleCarac}>WEIGHT: </label>
                                        <label className={style.titleCarac2}>{detailPokemon[0].weight / 10}kg</label>
                                    </div>
                                : <div> ? </div>}
                            </div>

                            {/* <button onClick={(e)=> handlerDelete(e)}>DELETE POKEMON</button> */}

                        </div>
                    </div>
                    : 
                    <Loading></Loading>
                }
        </div>
    )       
}