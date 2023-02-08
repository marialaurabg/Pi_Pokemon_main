import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import style from './LandingPage.module.css'

const LandingPage = () =>{
    return(
        <div className={style.gral}>

                <img src={logo} alt="Not found" height="200px" />

            <div className={style.div}>
                <div className={style.text}>
                    Find here information about yours favorite Pokemons
                    </div>
                <div className={style.text}>
                    and create your own personalized Pokemon.
                </div>
                {/* <div className={style.text}>
                    Have fun!
                </div> */}
            </div>

            <div>
                <Link className={style.link} to='/home'>
                    <button className={style.button}>Have fun!</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;
