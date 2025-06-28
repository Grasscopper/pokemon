"use client";

import React, { useState, useEffect } from "react";
import { Pokemon, Stat } from './index'
import PokemonCard from "./pokemon/PokemonCard";
import PokemonSort from "./pokemon/PokemonSort";

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pokeball, setPokeball] = useState(false);
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState("pokedex")

  const getRandomIntInclusive = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  const update = (event: { currentTarget: { value: string; }; }) => {
    setFilter(event.currentTarget.value);
  }

  const throwPokeball = () => {
    setPokemon([]);
    setPokeball(!pokeball);
  }
  
  useEffect(() => {
    const offset = getRandomIntInclusive(0, 1277);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`)
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
  
  const sortByPokedex = (a: Pokemon, b: Pokemon) => a.pokedex - b.pokedex;

  const sortByName = (a: Pokemon, b: Pokemon) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };

  const sortByType = (a: Pokemon, b: Pokemon) => {
    const nameA = a.types[0].toUpperCase();
    const nameB = b.types[0].toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };

  const sortByHp = (a: Pokemon, b: Pokemon) => a.stats.hp - b.stats.hp;
  const sortByAttack = (a: Pokemon, b: Pokemon) => a.stats.attack - b.stats.attack;
  const sortByDefense = (a: Pokemon, b: Pokemon) => a.stats.defense - b.stats.defense;
  const sortBySpecialAttack = (a: Pokemon, b: Pokemon) => a.stats.specialAttack - b.stats.specialAttack;
  const sortBySpecialDefense = (a: Pokemon, b: Pokemon) => a.stats.specialDefense - b.stats.specialDefense;
  const sortBySpeed = (a: Pokemon, b: Pokemon) => a.stats.hp - b.stats.speed;

  let sortingFunction = sortByPokedex;
  switch (sort) {
    case "pokedex":
      sortingFunction = sortByPokedex;
      break;

    case "name":
      sortingFunction = sortByName;
      break;

    case "type":
      sortingFunction = sortByType;
      break;

    case "hp":
      sortingFunction = sortByHp;
      break;

    case "attack":
      sortingFunction = sortByAttack;
      break;

    case "defense":
      sortingFunction = sortByDefense;
      break;

    case "specialAttack":
      sortingFunction = sortBySpecialAttack;
      break;

    case "specialDefense":
      sortingFunction = sortBySpecialDefense;
      break;

    case "speed":
      sortingFunction = sortBySpeed;
      break;
          
    default:
      sortingFunction = sortByPokedex;
      break;
  }

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
        <div className="column is-3">
          <input className="input is-large is-success"
            type="text"
            onChange={update}
            value={filter}
            placeholder="Filter Pokemon"
            style={{ marginTop: 20 }}
          />
        </div>
        <div className="column is-1">
          <button className="button is-success"
          style={{ marginTop: 30 }}
          onClick={throwPokeball}>
            Throw Pokeball
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