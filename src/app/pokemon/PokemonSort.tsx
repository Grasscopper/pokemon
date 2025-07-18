import React from "react";

const PokemonSort = (props: { setSort: (arg0: string) => void; setCurrentPage: (arg0: number) => void; }) => {
    const setSort = (event: { currentTarget: { value: string; }; }) => {
        props.setSort(event.currentTarget.value);
        props.setCurrentPage(1);
    }

    return (
    <div className="select is-success" style={{marginLeft: 10, marginBottom: 20 }}>
        <select onChange={setSort}>
        <option value="pokedex">Sort Pokemon:</option>
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
    )
}

export default PokemonSort