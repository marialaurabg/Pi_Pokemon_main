import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getDetail, clearDetail, deletePoke, getPokemons } from '../../redux/actions';
import Loading from "../Loading/Loading";
import style from "./Detail.module.css"

import imgTipo from '../../images/noImage.png'

export default function Detail(){

    const dispatch = useDispatch();
    const { id } = useParams()
    console.log('detail: '+ id);


    const detailPokemon = useSelector((state) => state.detail);
    const history = useHistory()

    useEffect(() => {
        dispatch(clearDetail())
        dispatch(getDetail(id));//de esta forma accedo al id
    }, [dispatch]);

    function handleDelete(){
        dispatch(deletePoke(id));
        alert('pokemon delete successfully');
        dispatch(getPokemons());
        history.push('/home');
    }
   
    return (
        <div className={style.gral}>

            <div className={style.homeButton}>
                <Link to='/home'>
                    <button className={style.button}>Return Home</button>
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
                                {'ID# '+ detailPokemon[0].id} 
                            </div>
                            <div className={style.img}>
                                <img src={detailPokemon[0].image ? detailPokemon[0].image : imgTipo} alt='pokemon' className={style.image}/>
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

                                <div>
                                    <label className={style.titleCarac}>HEIGHT: </label>
                                    {detailPokemon[0].height > 0 ? 
                                    <label className={style.titleCarac2}>{detailPokemon[0].height}cm</label>
                                    : <label className={style.titleCarac2}> ? </label>}
                                </div>

                                <div>
                                    <label  className={style.titleCarac}>WEIGHT: </label>
                                    {detailPokemon[0].weight > 0 ? 
                                    <label className={style.titleCarac2}>{detailPokemon[0].weight / 10}kg</label>
                                    : <label className={style.titleCarac2}>?</label>}
                                </div>

                                                                    
                            </div>
                            {detailPokemon[0].createdInDb && ( 
                            <div className={style.divBtn}>
                                <button className={style.deleteBtn} onClick={(e)=> handleDelete(e)}>DELETE</button>
                            </div>
                            )}
                        </div>

                    </div>
                    : 
                    <Loading></Loading>
                }
        </div>
    )       
}