import React from "react";
import gif from '../../images/loading.gif'

const Loading = () =>{
    return (
        <div>
            <img src={gif} alt='Loading...'/>
        </div>
    )
}

export default Loading;