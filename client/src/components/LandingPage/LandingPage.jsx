import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import style from './LandingPage.module.css'

const LandingPage = () =>{
    return(
        <div className={style.gral}>
            <img src={logo} alt="Not found" height="200px" />
            <div>
                <Link className={style.link} to='/home'>
                    <button className={style.button}>Go!</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;
