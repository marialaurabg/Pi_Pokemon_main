import React from "react";
import style from './Paginated.module.css'


function Paginated({ pokemonsPerPage, allPokemons, paginated, currentPage }){
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
                            <button className={currentPage === num ? style.buttonDes: style.buttonAct} onClick={() => paginated(num)}>{num}</button>
                        </span>
                    ))
                }
            </div>
        </nav>
    )
}

export default Paginated;