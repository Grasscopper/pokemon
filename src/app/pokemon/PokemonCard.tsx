import React from "react";
import { Pokemon } from '../index'
import { getTypeColors } from '../helperFunctions/helpers';

const PokemonCard = (props) => {
    let backgroundTopColor = getTypeColors(props.types[0])[0];
    const backgroundBottomColor = getTypeColors(props.types[0])[0];

    let topTextColor = getTypeColors(props.types[0])[1];
    const textColor = getTypeColors(props.types[0])[1];

    const name = props.name;
    const types = props.types.toString().split(',').join(', ');
    const abilities = props.abilities.toString().split(',').join(', ');
    const moves = props.moves.toString().split(',').join(', ');

    if (props.types.length === 2) {
        backgroundTopColor = getTypeColors(props.types[1])[0];
        topTextColor = getTypeColors(props.types[1])[1];
    }
    
    let statSize = 6;
    if (props.size == 4) {
        statSize = 6;
    }
    else if (props.size == 12) {
        statSize = 12;
    }
    
    return (
        <div className={`column is-${props.size}`} style={{ marginTop: 10 }}>
            <div className="card">
                <div className="card-content has-text-centered" style={{ backgroundColor: backgroundBottomColor, borderRadius: 0, paddingBottom: 20 }}>
                    <div className="columns is-vcentered is-multiline">

                        <div className="column is-full" style={{ backgroundColor: backgroundTopColor }}>
                            <p className={`title is-size-1-desktop is-size-4-tablet is-size-4-mobile is-underlined ${topTextColor}`}>
                                {name}</p>
                            <p className={`subtitle ${topTextColor}`}>
                                #{props.pokedex}</p>
                            <p className={`title is-4 ${topTextColor}`} style={{ marginBottom: 10 }}>
                                {types}</p>

                            <figure className="image container is-128x128">
                                <img
                                    src={props.picture}
                                    alt={`Picture of ${name}`}
                                />
                            </figure>
                        </div>

                        <div className="column is-full">
                        <div className="columns is-multiline">

                            <div className={`column is-${statSize} has-text-centered`}>
                                <p className={`subtitle is-size-5-tablet ${textColor}`}>HP 
                                 <span className={`title is-size-4-tablet ${textColor}`}> {props.stats.hp}</span>
                                </p>
                            </div>

                            <div className={`column is-${statSize} has-text-centered`}>
                                <p className={`subtitle is-size-5-tablet ${textColor}`}>ATK 
                                 <span className={`title is-size-4-tablet ${textColor}`}> {props.stats.attack}</span>
                                </p>
                            </div>

                            <div className={`column is-${statSize} has-text-centered`}>
                                <p className={`subtitle is-size-5-tablet ${textColor}`}>DEF 
                                 <span className={`title is-size-4-tablet ${textColor}`}> {props.stats.defense}</span>
                                </p>
                            </div>

                            <div className={`column is-${statSize} has-text-centered`}>
                                <p className={`subtitle is-size-5-tablet ${textColor}`}>Sp. ATK 
                                 <span className={`title is-size-4-tablet ${textColor}`}> {props.stats.specialAttack}</span>
                                </p>
                            </div>

                            <div className={`column is-${statSize} has-text-centered`}>
                                <p className={`subtitle is-size-5-tablet ${textColor}`}>Sp. DEF
                                 <span className={`title is-size-4-tablet ${textColor}`}> {props.stats.specialDefense}</span>
                                </p>
                            </div>

                            <div className={`column is-${statSize} has-text-centered`}>
                                <p className={`subtitle is-size-5-tablet ${textColor}`}>Speed 
                                 <span className={`title is-size-4-tablet ${textColor}`}> {props.stats.speed}</span>
                                </p>
                            </div>

                            

                        </div>
                        </div>

                    </div>
                    <div className="columns has-text-centered is-multiline">
                        <div className="column has-text-centered is-full">
                            <p className={`title is-4 is-underlined ${textColor}`}>Abilities</p>
                        </div>

                        <div className="column has-text-centered is-full">
                            <p className={`title is-4 ${textColor}`}>{abilities}</p>
                        </div>

                        <div className="column has-text-centered is-full">
                            <p className={`title is-4 is-underlined ${textColor}`}>Moves</p>
                        </div>

                        <div className="column has-text-centered is-full">
                            <p className={`title is-4 ${textColor}`}>{moves}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard