import { Pokemon } from '../index'

export const getRandomIntInclusive = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

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

export const findSortingFunction = (sortType: string) => {
  switch (sortType) {
    case "pokedex":
      return sortByPokedex;
  
    case "name":
      return sortByName;
  
    case "type":
      return sortByType;
  
    case "hp":
      return sortByHp;
  
    case "attack":
      return sortByAttack;
  
    case "defense":
      return sortByDefense;
  
    case "specialAttack":
      return sortBySpecialAttack;
  
    case "specialDefense":
      return sortBySpecialDefense;
  
    case "speed":
      return sortBySpeed;
          
    default:
      return sortByPokedex;
  }
}