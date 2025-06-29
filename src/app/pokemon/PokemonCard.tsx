import React from "react";
import { Pokemon } from '../index'
import { getTypeColors } from '../helperFunctions/helpers';

const PokemonCard = (props: Pokemon) => {
    const name = props.name;
    const types = props.types.toString().split(',').join(', ');
    const abilities = props.abilities.toString().split(',').join(', ');

    let backgroundTopColor = getTypeColors(props.types[0])[0];
    let backgroundBottomColor = getTypeColors(props.types[0])[0];
    let textColor = getTypeColors(props.types[0])[1];

    if (props.types.length === 2) {
        backgroundTopColor = getTypeColors(props.types[1])[0];
    }

    return (
        <div className="column is-3" style={{ marginTop: 10 }}>
            <div className="card" style={{ padding: 5 }}>
                <div style={{ 
                    backgroundColor: backgroundTopColor,
                    borderBottom: "solid",
                    borderColor: "white" }}>
                    <figure className="image">
                    <img src={props.picture}
                    alt={`Picture of ${name}`} />
                    </figure>
                </div>

                <div className="card-content" style={{ backgroundColor: backgroundBottomColor }}>
                    <p className={`title is-1 is-underlined ${textColor}`}>{name}</p>
                    <p className={`subtitle ${textColor}`}>{props.pokedex}</p>
                    <p className={`title is-4 ${textColor}`}>Type: {types}</p>
                    <p className={`title is-4 ${textColor}`}>Abilities: {abilities}</p>
                    <div className="columns is-multiline">
                        <div className="column is-4">
                            <p className={`subtitle ${textColor}`}>
                                HP: {props.stats.hp}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className={`subtitle ${textColor}`}>
                                Attack: {props.stats.attack}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className={`subtitle ${textColor}`}>
                                Defense: {props.stats.defense}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className={`subtitle ${textColor}`}>
                                Special Attack: {props.stats.specialAttack}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className={`subtitle ${textColor}`}>
                                Special Defense: {props.stats.specialDefense}
                            </p>
                        </div>
                        <div className="column is-4">
                            <p className={`subtitle ${textColor}`}>
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