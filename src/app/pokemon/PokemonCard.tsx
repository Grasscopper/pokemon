import React from "react";
import { Pokemon } from '../index'

const PokemonCard = (props: Pokemon) => {
    return (
        <div className="column is-4" style={{ marginTop: 10 }}>
            <div className="card">
                <div>
                    <figure className="image">
                    <img src={props.picture}
                    alt={`Picture of ${props.name}`} />
                    </figure>
                </div>

                <div className="card-content">
                    <p className="title">{props.name}</p>
                    <div className="content">
                        <p>Pokemon</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard