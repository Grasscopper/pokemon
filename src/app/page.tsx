"use client";

import React, { useState, useEffect } from "react";
import { Pokemon, Stat } from './index'
import PokemonCard from "./pokemon/PokemonCard";
import PokemonSort from "./pokemon/PokemonSort";
import { getRandomIntInclusive, findSortingFunction } from './helperFunctions/helpers';

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pokeball, setPokeball] = useState(false);
  const [pokeballType, setPokeballType] = useState("Random");

  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("pokedex")

  const update = (event: { currentTarget: { value: string; }; }) => {
    setFilter(event.currentTarget.value);
  }

  const throwPokeball = (event: { currentTarget: { id: React.SetStateAction<string>; }; }) => {
    setPokemon([]);
    if (event.currentTarget.id === "Random") setPokeballType("Random");
    else if (event.currentTarget.id === "Kanto") setPokeballType("Kanto");
    setPokeball(!pokeball);
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
            pokedex: foundPokemon.id
          }

          setPokemon(pokemon => [...pokemon, p]);
        })
        .catch((error) => console.error(`Cannot find this Pokemon: ${error.message}`));
      }
    })
    .catch((error) => console.error(`Cannot fetch list of Pokemon: ${error.message}`));
  }, [pokeball]);

  const sortingFunction = findSortingFunction(sort);
  const pokemonCards = pokemon.sort(sortingFunction).map((p) => {
    if (p.name.toLowerCase().includes(filter.toLowerCase())) {
      return (<PokemonCard
        key={p.name}
        name={p.name}
        picture={p.picture}
        types={p.types}
        abilities={p.abilities}
        stats={p.stats}
        pokedex={p.pokedex} />)
    }
  });

  return (
  <> 
    <section className="hero is-success" style={{ backgroundColor: "#0B2318" }}>
      <div className="hero-body">
        <p className="title" style={{ color: "#A7BBB2" }}>Pokedex</p>
        <p className="subtitle" style={{ color: "#A7BBB2" }}>Search for Pokemon</p>
      </div>
    </section>

    <div className="home">
      <div className="columns is-multiline has-text-centered">   
        <div className="column is-4" />
        <div className="column is-2">
          <input className="input is-large is-success"
            type="text"
            onChange={update}
            value={filter}
            placeholder="Filter Pokemon"
            style={{ marginTop: 20 }}
          />
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
        </div>
        <div className="column is-4" />

        <div className="column is-4" />
        <PokemonSort setSort={setSort} />
        <div className="column is-4" />

        {pokemonCards}
      </div>
    </div>
  </>
  )
}

export default Pokedex