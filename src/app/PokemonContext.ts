import { createContext } from 'react';
import { Pokemon } from "./index.js";

export const PokemonContext = createContext<Pokemon[]>([]);