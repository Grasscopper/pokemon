export interface Pokemon {
  name: string;
  picture: string;
  types: string[];
  abilities: string[];
  stats: Stat;
}

export interface Stat {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

  // Show the 6 Base Stats
  // Include abilities