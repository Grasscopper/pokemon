"use client";

import React, { useState, useEffect } from "react";
import { Pokemon } from './index'
import PokemonCard from "./pokemon/PokemonCard";

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const getRandomIntInclusive = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }
  
  const offset = getRandomIntInclusive(0, 1277);
  useEffect(() => {
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
                const errorMessage = `${response.status}: ${response.statusText}`
                const error = new Error(errorMessage)
                throw(error)
            }
        })
        .then((response) => response.json())
        .then((foundPokemon) => {
          const p: Pokemon = {
            name: foundPokemon.name,
            picture: foundPokemon.sprites.front_default
          }
          setPokemon(pokemon => [...pokemon, p])
        })
        .catch((error) => console.error(`Cannot find this Pokemon: ${error.message}`))
      }
    })
    .catch((error) => console.error(`Cannot fetch list of Pokemon: ${error.message}`))
  }, []);


  const pokemonCards = pokemon.map((p) => {
    return (
    <PokemonCard
      key={p.name}
      name={p.name}
      picture={p.picture}
    />
    )
  })

  return (
  <> 
    <section className="hero is-success">
      <div className="hero-body">
        <p className="title has-text-white">Pokedex</p>
        <p className="subtitle has-text-white">Search for Pokemon</p>
      </div>
    </section>

    <div className="home">
      <div className="columns is-multiline has-text-centered">
        {pokemonCards}
      </div>
    </div>
  </>
  )
}

export default Pokedex