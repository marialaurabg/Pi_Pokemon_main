// import { all } from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPokemons, filterType, getTypes, filterByCreated, resetPokemons, orderByName, orderByAttack, filterPrub } from '../../redux/actions';

import Card from '../Card/Card';
import Paginated from '../Paginated/Paginated';
import Loading from "../Loading/Loading";
import SeachBar from "../SeachBar/SeachBar";

import logo from '../../images/logo.png'
import style from './Home.module.css';


export default function Home() {
    const dispatch = useDispatch();//despacha acciones
    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.types);
    //remplaza de mapStateToProps --> en la constante allPokemons me va a traer todo lo que este en el estado de pokemons.
    //trae del reducer el estado "countries"

    /*Uso el useEffect para renderizar siempre y cada vez que haya
    un cambio en el array de pokemons y si tengo el array/estado de pokemons
    con elementos no necesito re-renderizarlo. Esto es util para mantener
    los filtros*/

    //trae del estado los pokemones (pokemons) cuando el componente se monta   
    useEffect( ()=>{
        if(!allPokemons.length){
            dispatch(getPokemons());
            dispatch(getTypes());
           
        }
    }, [dispatch, allPokemons.length])//este dispatch remplaza a mapDispatchToProps

    

         // que hace esto??? NO SE ----> resertCountries vacia el estado pokemons. 
        // return ()=> {
        //     dispatch(resetPokemons())
        // }; 
        
        //     },[dispatch])//investigar que va dentro del array --> dentro del array va de lo que depende el componentDidMount
            // el segundo elemento del useEffect es para que no se genere un loop infinito de llamados 

    //---------------------------------------------- PAGINADO
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setpokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage; // 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
    
    const paginated = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    
 
//---------------------------------------------- VUELVE A CARGAR LOS POKEMONS
function handleClick(e){
    e.preventDefault();//para que no se recarge la pagina y se rompan cosas 
    dispatch(getPokemons());
};

//---------------------------------------------- FILTRO POR TIPO
function handleFilterType(e){
    e.preventDefault();
    dispatch(filterType(e.target.value));
    setCurrentPage(1);
};

//---------------------------------------------- FILTRO POR CREADO
function handleFilterCreated(e){
    if(e.target.value === 'api' || e.target.value === 'created'){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value));
    }
     if(e.target.value === 'all'){
        e.preventDefault();
        dispatch(resetPokemons())
     }
}

//----------------------------------------------  ORDENAMIENTO
function handleOrder(e){
    if(e.target.value === 'asc' || e.target.value === 'desc'){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
    }
    if(e.target.value === 'strong' || e.target.value === 'weak'){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
    }
    if(e.target.value === 'all'){
        e.preventDefault();
        dispatch(resetPokemons())
    }
}




//---------------------------------------------------------------

    return (
        <div className={style.gral}>
            
            <div>
                <img src={logo} alt='Not Found' height="200px"/>
            </div>

            <div className={style.div}>
                <SeachBar></SeachBar>
            </div>

            <div className={style.div}>
                <Link to = '/pokemon'>
                    <button className={style.button}>CREATE POKEMON</button>
                </Link>
                <Link to= '/home'>
                    <button className={style.button} onClick={(e)=>{handleClick(e)}}>REFRESH</button>
                </Link>
            </div>
            
            <div className={style.div}>

            {/* //------------------------- ORDENAMIENTO ------------------------------// */}
                <h1 className={style.label}>ORDER</h1>
                <select className={style.button_secu} onChange={e => handleOrder(e)}>
                    <option value='all'>ALL</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                    <option value='strong'>STRONG</option>
                    <option value='weak'>WEAK</option>
                </select>

            {/* //------------------- FILTRO POR TIPO DE POKE -------------------------// */}
                <h1 className={style.label}>TYPES</h1>
                <select className={style.button_secu} onChange={e => handleFilterType(e)}>
                    <option value='all'>ALL</option>
                    {
                        allTypes.map(e => {
                            return (
                                <option value={e.name}>{e.name.toUpperCase()}</option>
                            )
                        })
                    }
                </select>

            {/* //------------------- FILTRO POR CREATED O DE API -------------------------// */}
                <h1 className={style.label}>ORIGIN</h1>
                <select className={style.button_secu} onChange={e => handleFilterCreated(e)}>
                    <option value='all'>ALL</option>
                    <option value='created'>CREATED</option>
                    <option value='api'>API</option>
                </select>
                    

            </div>

            {/* //------------------- RENDERIZA EL PAGINADO ------------------------- */}  
            <div className={style.paginated}>
                <Paginated
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginated={paginated}
                 />
            </div>

            {/* //------------- RENDERIZA LOS POKEMONS POR PAGINA ----------------------*/}
            {/*   currentPokemons es la constante que contiene los personajes que van por pagina, por eso es lo que se toma para renderizar   */}
                
            <div className={style.card_container}>

                {
                    currentPokemons.length ?
                    currentPokemons.map((e) => {
                        return (
                            <div className={style.cards}>
                                <Link className={style.text}> {/* con esta línea cada card es un link al detalle */}
                                    <Card image={e.image} name={e.name} types={e.types} id={e.id} key={e.id}/>
                                </Link>
                            </div>

                        )
                    }):
                    <div>
                         <Loading/>
                    </div>
                }

            </div>


            {/* //------------------- RENDERIZA EL PAGINADO ------------------------- */}  
            <div className={style.paginated}>
                <Paginated
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginated={paginated}
                 />
            </div>
            
        </div>
    )

}

