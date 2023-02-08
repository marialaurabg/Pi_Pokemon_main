import React from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes, setError} from '../../redux/actions';
import style from './Error.module.css'
import ups from '../../images/Error.gif';

function Error(){

    const dispatch = useDispatch();

    function handleHome(e){
        e.preventDefault();
        dispatch(setError(false));
        // dispatch(getPokemons());
        // dispatch(getTypes())
    }

    return (
        <div>
            <img className={style.image} src={ups} alt='error'/>
            <div className={style.globText}>
                <h3 className={style.ups}>Ups!</h3>
                <h6 className={style.text}>Can't find what you're looking for</h6>
            </div>
            <div>
                <button className={style.button} onClick={(e) => handleHome(e)}>Return Home</button>
            </div>
        </div>
    )

}

export default Error;