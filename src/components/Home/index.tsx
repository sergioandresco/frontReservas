import React from "react";
import './Home.css';

function Home(){
    return(

        <div className="container-home">
            <div className="loader">
                <div data-glitch="Creador de eventos Gaming" className="glitch">Creador de eventos Gaming</div>
            </div>

            <div className="loader">
                <div className="pyramid-loader">
                    <div className="wrapper">
                        <span className="side side1"></span>
                        <span className="side side2"></span>
                        <span className="side side3"></span>
                        <span className="side side4"></span>
                        <span className="shadow"></span>
                    </div>  
                </div>
            </div>
        </div>
        
    )
}

export { Home }