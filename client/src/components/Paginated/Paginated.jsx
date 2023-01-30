import React from "react";
import style from './Paginated.module.css'

export default function Paginated({ pokemonsPerPage, allPokemons, paginated }){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <div className={style.paginated}>
                {
                    pageNumbers && pageNumbers.map(num => (
                        <span className={style.number} key={num}>
                            <button className={style.button} onClick={() => paginated(num)}>{num}</button>
                        </span>
                    ))
                }
            </div>
        </nav>
    )
}