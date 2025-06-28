import React from "react";

const PokemonSort = (props: { setSort: (arg0: string) => void; }) => {
    const setSort = (event: { currentTarget: { value: string; }; }) => {
        props.setSort(event.currentTarget.value);
    }

    return (
    <div className="column is-4">
        <div className="select is-success">
            <select onChange={setSort}>
            <option>Sort Pokemon:</option>
            <option value="pokedex">By Pokedex</option>
            <option value="name">By Name</option>
            <option value="type">By Type</option>
            <option value="hp">By Hp</option>
            <option value="attack">By Attack</option>
            <option value="defense">By Defense</option>
            <option value="specialAttack">By Special Attack</option>
            <option value="specialDefense">By Special Defense</option>
            <option value="speed">By Speed</option>
            </select>
        </div>
    </div>
    )
}

export default PokemonSort