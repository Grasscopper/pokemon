"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Pokemon, Stat } from "./index";
import { PokemonContext } from './PokemonContext';
import PokemonContainer from "./pokemon/PokemonContainer";

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]); // never changes
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const names = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1302");
        const endpoints = [];
        for (const pokemonName of names.data.results) {
          endpoints.push(`https://pokeapi.co/api/v2/pokemon/${pokemonName.name}`);
        }
        const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint)));
        const allPokemon: Pokemon[] = [];
        let count = 1;
        for (const response of responses) {
          if (count > 1302) break;
          const p = response.data;

          const types: string[] = [];
          for (const t of p.types) {
            types.push(t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1));
          }

          const abilities: string[] = [];
          for (const a of p.abilities) {
            abilities.push(a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1));
          }

          const stats: Stat = {
            hp: p.stats[0].base_stat,
            attack: p.stats[1].base_stat,
            defense: p.stats[2].base_stat,
            specialAttack: p.stats[3].base_stat,
            specialDefense: p.stats[4].base_stat,
            speed: p.stats[5].base_stat
          }

          const moves: string[] = [];
          let moveLimit = 0;
          for (const m of p.moves) {
            if (moveLimit <= 8) {
              moves.push(m.move.name.charAt(0).toUpperCase() + m.move.name.slice(1));
              moveLimit++;
            }
          }

          const pokemon: Pokemon = {
            name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
            picture: p.sprites.front_default,
            types: types,
            abilities: abilities,
            stats: stats,
            pokedex: p.id,
            moves: moves
          }
          count++;
          localStorage.setItem(p.id, JSON.stringify(pokemon));
          allPokemon.push(pokemon);
        }
        localStorage.setItem("cached", "success");
        setPokemon(allPokemon);
      } catch(caughtError) {
        const error = caughtError as AxiosError;
        console.log(error.response?.data);
      }
    }
    if (!localStorage.getItem("cached")) fetchAllPokemon()
    else {
      const allPokemon: Pokemon[] = [];
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key != "cached") {
          allPokemon.push(JSON.parse(localStorage.getItem(key) || ""));
        }
      }
      const sortByPokedex = (a: Pokemon, b: Pokemon) => a.pokedex - b.pokedex;
      allPokemon.sort(sortByPokedex);
      setPokemon(allPokemon);
    }
  }, []);

  return (
    <>
      <PokemonContext value={pokemon}>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title is-1">Pokedex</p>
          <p className="subtitle">Search for Pokemon</p>
        </div>
      </section>
      <PokemonContainer />
      </PokemonContext>
    </>
  )
}
export default Pokedex