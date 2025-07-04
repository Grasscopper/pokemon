"use client";

import React from "react";

const PokemonLimit = (props: { setLimit: (arg0: number) => void; setCurrentPage: (arg0: number) => void; }) => {
    const changeLimit = (event: { currentTarget: { value: string; }; }) => {
        props.setLimit(Number(event.currentTarget.value));
        props.setCurrentPage(1);
    }

    return (
    <div className="select is-success" style={{marginRight: 10 }}>
        <select onChange={changeLimit}>
        <option value="25">Cards Per Page:</option>
        <option value="5">5 Cards</option>
        <option value="25">25 Cards</option>
        <option value="50">50 Cards</option>
        <option value="100">100 Cards</option>
        <option value="1302">All Cards</option>
        </select>
    </div>
    )
}

export default PokemonLimit;