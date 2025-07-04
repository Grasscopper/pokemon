import { Pokemon, Stat } from '../index'

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
const sortBySpeed = (a: Pokemon, b: Pokemon) => a.stats.speed - b.stats.speed;

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

export const getTypeColors = (type: string) => {
  switch (type) {

    case "Bug":
      return ["#729F3F", "has-text-white"];
    
    case "Dragon":
      return ["#F16E57", "has-text-white"];

    case "Fairy":
      return ["#FDB9E9", "has-text-black"];

    case "Fire":
      return ["#FD7D24", "has-text-white"];

    case "Ghost":
      return ["#7B62A3", "has-text-white"];

    case "Ground":
      return ["#ECDAA7", "has-text-black"];

    case "Normal":
      return ["#F2F2F2", "has-text-black"];

    case "Psychic":
      return ["#F366B9", "has-text-white"];

    case "Steel":
      return ["#9EB7B8", "has-text-black"];

    case "Dark":
      return ["#707070", "has-text-white"];

    case "Electric":
      return ["#EED535", "has-text-black"];

    case "Fighting":
      return ["#D56723", "has-text-white"];

    case "Flying":
      return ["#31AA9C", "has-text-black"];

    case "Grass":
      return ["#9BCC50", "has-text-black"];

    case "Ice":
      return ["#51C4E7", "has-text-black"];

    case "Poison":
      return ["#B97FC9", "has-text-white"];

    case "Rock":
      return ["#A38C21", "has-text-white"];

    case "Water":
      return ["#4592C4", "has-text-white"];

    default:
      return ["#FFFFFF", "has-text-black"];
  }
}