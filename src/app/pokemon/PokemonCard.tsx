import React from "react";
import { Pokemon } from '../index'

const PokemonCard = (props: Pokemon) => {
    const name = props.name;
    const types = props.types.toString().split(',').join(', ');
    const abilities = props.abilities.toString().split(',').join(', ');

    return (
        <div className="column is-4" style={{ marginTop: 10 }}>
            <div className="card">
                <div>
                    <figure className="image">
                    <img src={props.picture}
                    alt={`Picture of ${name}`} />
                    </figure>
                </div>

                <div className="card-content">
                    <p className="title is-1 is-underlined">{name}</p>
                    <p className="title">Type: {types}</p>
                    <p className="title">Abilities: {abilities}</p>
                    <div className="columns is-multiline">
                        <div className="column is-4">
                            <p className="subtitle">
                                HP: {props.stats.hp}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className="subtitle">
                                Attack: {props.stats.attack}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className="subtitle">
                                Defense: {props.stats.defense}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className="subtitle">
                                Special Attack: {props.stats.specialAttack}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className="subtitle">
                                Special Defense: {props.stats.specialDefense}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className="subtitle">
                                Speed: {props.stats.speed}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard