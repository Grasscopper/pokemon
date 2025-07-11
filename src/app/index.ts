export interface Pokemon {
  name: string;
  picture: string;
  types: string[];
  abilities: string[];
  stats: Stat;
  pokedex: number;
  moves: string[];
}

export interface Stat {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonCardSize extends Pokemon {
  size: number;
}