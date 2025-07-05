"use client";

import React, { useState, useContext } from 'react';
import Pagination from "../Pagination";
import { PokemonContext } from '../PokemonContext';
import PokemonCard from "./PokemonCard";
import PokemonSort from "./PokemonSort";
import PokemonLimit from "./PokemonLimit";
import { findSortingFunction } from "../helperFunctions/helpers";
import ScrollToTop from "react-scroll-to-top";
import { Pokemon } from '../index';

const PokemonContainer = () => {
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sort, setSort] = useState("pokedex");
    const [cardLimit, setLimit] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPokemon, setTotalPokemon] = useState(1302);
    const [size, setSize] = useState(4);
  
    const updateName = (event: { currentTarget: { value: string; }; }) => {
        setNameFilter(event.currentTarget.value);
        setCurrentPage(1);
    }
    
    const updateType = (event: { currentTarget: { value: string; }; }) => {
        setTypeFilter(event.currentTarget.value);
        setCurrentPage(1);
    }

    const toggleListType = () => {
        if (size == 4) setSize(12);
        else setSize(4);
    }

    const visitKanto = () => {
        setTotalPokemon(151);
        setCurrentPage(1);
    }

    const leaveKanto = () => {
        setTotalPokemon(1302);
        setCurrentPage(1);
    }

    let pokemon: Pokemon[] = useContext(PokemonContext);

    if (totalPokemon === 151) {
        pokemon.sort(findSortingFunction("pokedex"));
        pokemon = pokemon.slice(0, 151);
    }

    // sort and filter all Pokemon
    const sortingFunction = findSortingFunction(sort);

    pokemon = pokemon.sort(sortingFunction).filter((p: Pokemon) => {
        const nameMatches = p.name.toLowerCase().includes(nameFilter.toLowerCase());
        let typeMatches = false;
        for (const type of p.types) {
            if (type.toLowerCase().includes(typeFilter.toLowerCase())) {
                typeMatches = true;
            }
        }
        return nameMatches && typeMatches
    });

    // display sorted and filtered Pokemon
    const end = cardLimit * currentPage;
    const begin = end - cardLimit;

    const pokemonCards = pokemon.slice(begin, end).map((p) => {
        return (<PokemonCard
            key={p.pokedex}
            name={p.name}
            picture={p.picture}
            types={p.types}
            abilities={p.abilities}
            stats={p.stats}
            pokedex={p.pokedex}
            moves={p.moves}
            size={size} />)
    });

    let kantoButton = <><div className="column is-2 has-text-centered field">
    <button className="button is-danger is-large"
    style={{ marginTop: 30 }}
    onClick={visitKanto}>
        Visit Kanto
    </button>
    </div>
    <div className="column is-3" /></>
    
    if (totalPokemon === 151) {
        kantoButton = <><div className="column is-2 has-text-centered field">
        <button className="button is-warning is-large"
        style={{ marginTop: 30 }}
        onClick={leaveKanto}>
            Leave Kanto
        </button>
        </div>
        <div className="column is-3" /></>
    }

    return (
    <div className ="home">
        <div className="columns is-multiline">

        <div className="column is-3" />
        <div className="column is-2">
            <div className="field">
                <label className="label">Pokemon Name</label>
                <input className="input is-large is-success"
                type="text"
                onChange={updateName}
                value={nameFilter}
                placeholder="Pikachu"
                />
            </div>
        </div>

        <div className="column is-2">
            <div className="field">
                <label className="label">Pokemon Type</label>
                <input className="input is-large is-success"
                type="text"
                onChange={updateType}
                value={typeFilter}
                placeholder="Electric"
                />
            </div>
        </div>

        {kantoButton}
        <div className="column is-3" />
        
        <div className="column is-6">
          <Pagination 
          totalPokemon={pokemon.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          cardLimit={cardLimit} />
        </div>
        <div className="column is-3" />

        <div className="column is-4" />
        <div className="column has-text-centered is-4">
          <button 
          className="button is-primary is-large"
          onClick={toggleListType}>
            Toggle View
          </button>
          </div>
        <div className="column is-4" />

        <div className="column is-2" />
        <div className="column is-8 has-text-centered">
            <PokemonLimit setLimit={setLimit} setCurrentPage={setCurrentPage} />
            <PokemonSort setSort={setSort} setCurrentPage={setCurrentPage} />
        </div>
        <div className="column is-2" />

        {pokemonCards}
        
        <ScrollToTop smooth style={{
          backgroundColor: "#00D1B2",
          borderRadius: 20,
          height: 50,
          width: 50 }}/>

        </div>
    </div>
    )
}

export default PokemonContainer;