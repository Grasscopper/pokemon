"use client";

import React, { useState, useEffect } from "react";
import { Pokemon, Stat } from './index'
import PokemonCard from "./pokemon/PokemonCard";
import PokemonSort from "./pokemon/PokemonSort";
import Pagination from "./Pagination";
import ScrollToTop from "react-scroll-to-top";
import { getRandomIntInclusive, findSortingFunction } from './helperFunctions/helpers';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pokeball, setPokeball] = useState(false);
  const [pokeballType, setPokeballType] = useState("Random");

  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState("pokedex");
  const [cardLimit, setLimit] = useState(25);

  const [listType, setListType] = useState("grid")

  const updateName = (event: { currentTarget: { value: string; }; }) => {
    setNameFilter(event.currentTarget.value);
  }

  const updateType = (event: { currentTarget: { value: string; }; }) => {
    setTypeFilter(event.currentTarget.value);
  }

  const changeLimit = (event: { currentTarget: { value: string; }; }) => {
    setLimit(Number(event.currentTarget.value));
  }

  const throwPokeball = (event: { currentTarget: { id: React.SetStateAction<string>; }; }) => {
    setPokemon([]);
    setCurrentPage(1);
    if (event.currentTarget.id === "Random") setPokeballType("Random");
    else if (event.currentTarget.id === "Kanto") setPokeballType("Kanto");
    else if (event.currentTarget.id === "World") setPokeballType("World");
    setPokeball(!pokeball);
  }

  const toggleListType = () => {
    if (listType === "list") setListType("grid");
    else if (listType === "grid") setListType("list");
  }
  
  useEffect(() => {
    let limit = 25;
    let offset = getRandomIntInclusive(0, 1277);
    if (pokeballType == "Random") {
      limit = 25;
      offset = getRandomIntInclusive(0, 1277);
    }
    else if (pokeballType == "Kanto") {
      limit = 151;
      offset = 0;
    }
    else if (pokeballType == "World") {
      limit = 1302;
      offset = 0;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => {
        if (response.ok) return response;
        else {
            const errorMessage = `${response.status}: ${response.statusText}`
            const error = new Error(errorMessage)
            throw(error)
        }
    })
    .then((response) => response.json())
    .then((body) => {
      for (const p of body.results) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`)
        .then((response) => {
            if (response.ok) return response
            else {
                const errorMessage = `${response.status}: ${response.statusText}`;
                const error = new Error(errorMessage);
                throw(error);
            }
        })
        .then((response) => response.json())
        .then((foundPokemon) => {
          let name = foundPokemon.name;
          name = name.charAt(0).toUpperCase() + name.slice(1);

          const types: string[] = [];
          for (const t of foundPokemon.types) {
            let type = t.type.name;
            type = type.charAt(0).toUpperCase() + type.slice(1);
            types.push(type);
          }

          const abilities: string[] = [];
          for (const a of foundPokemon.abilities) {
            let ability = a.ability.name;
            ability = ability.charAt(0).toUpperCase() + ability.slice(1);
            abilities.push(ability);
          }

          const moves: string[] = [];
          let counter = 0;
          for (const m of foundPokemon.moves) {
            if (counter <= 5) {
              let move = m.move.name;
              move = move.charAt(0).toUpperCase() + move.slice(1);
              moves.push(move);
              counter++;
            }
          }

          const stats: Stat = {
            hp: foundPokemon.stats[0].base_stat,
            attack: foundPokemon.stats[1].base_stat,
            defense: foundPokemon.stats[2].base_stat,
            specialAttack: foundPokemon.stats[3].base_stat,
            specialDefense: foundPokemon.stats[4].base_stat,
            speed: foundPokemon.stats[5].base_stat
          }

          const p: Pokemon = {
            name: name,
            picture: foundPokemon.sprites.front_default,
            types: types,
            abilities: abilities,
            stats: stats,
            pokedex: foundPokemon.id,
            moves: moves
          }

          setPokemon(pokemon => [...pokemon, p]);
        })
        .catch((error) => console.error(`Cannot find this Pokemon: ${error.message}`));
      }
    })
    .catch((error) => console.error(`Cannot fetch list of Pokemon: ${error.message}`));
  }, [pokeball]);

  let start = 0;
  let end = cardLimit;
  end = end * currentPage;
  start = end - cardLimit;
  const displayedPokemon = pokemon.slice(start, end);
  const sortingFunction = findSortingFunction(sort);

  let list = <div className="column is-4" />;
  if (listType === "list") list = <div className="column is-4" />;
  else if (listType == "grid") list = <></>;

  const pokemonCards = displayedPokemon.sort(sortingFunction).map((p) => {
    const nameMatches = p.name.toLowerCase().includes(nameFilter.toLowerCase());
    let typeMatches = false;
    for (const type of p.types) {
      if (type.toLowerCase().includes(typeFilter.toLowerCase())) {
        typeMatches = true;
      }
    }
    if (nameMatches && typeMatches) {
      return (<>{list}<PokemonCard
        key={p.name}
        name={p.name}
        picture={p.picture}
        types={p.types}
        abilities={p.abilities}
        stats={p.stats}
        pokedex={p.pokedex}
        moves={p.moves}/>{list}</>)
    }
  });

  return (
  <> 
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title is-1">Pokedex</p>
        <p className="subtitle">Search for Pokemon</p>
      </div>
    </section>

    <div className="home">
      <div className="columns is-multiline has-text-centered">   

        <div className="column is-3" />

        <div className="column is-2">
          <div className="field">
            <label className="label">Pokemon Name</label>
            <input className="input is-large is-success"
              type="text"
              onChange={updateName}
              value={nameFilter}
              placeholder="Filter Name"
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
              placeholder="Filter Type"
            />
          </div>
        </div>

        <div className="column is-2 field is-grouped">
          <button className="button is-success"
          id="Random"
          style={{ marginTop: 30 }}
          onClick={throwPokeball}>
            Throw Pokeball
          </button>
          <button className="button is-danger"
          id="Kanto"
          style={{ marginTop: 30 }}
          onClick={throwPokeball}>
            Visit Kanto
          </button>
          <button className="button is-warning"
          id="World"
          style={{ marginTop: 30 }}
          onClick={throwPokeball}>
            All Pokemon
          </button>
        </div>

        <div className="column is-3" />

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
        <div className="column is-4">
          <button 
          className="button is-primary is-large"
          onClick={toggleListType}>
            Toggle View
          </button>
          </div>
        <div className="column is-4" />

        <div className="column is-2" />
        <div className="column is-8">
          <div className="select is-success" style={{marginRight: 10 }}>
              <select onChange={changeLimit}>
              <option value="25">Cards Per Page:</option>
              <option value="5">5 Cards</option>
              <option value="25">25 Cards</option>
              <option value="50">50 Cards</option>
              <option value="100">100 Cards</option>
              <option value="250">250 Cards</option>
              <option value="1302">All Cards</option>
              </select>
          </div>
          <PokemonSort setSort={setSort} />
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
  </>
  )
}

export default Pokedex