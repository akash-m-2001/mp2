import axios from "axios";
import { Item } from "./types";

// Fetch first 200 Pokémon with details
export async function fetchItems(): Promise<Item[]> {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=200");
  const results = response.data.results;

  const items: Item[] = await Promise.all(
    results.map(async (pokemon: { name: string; url: string }) => {
      const res = await axios.get(pokemon.url);
      return {
        id: res.data.id,
        name: res.data.name,
        image: res.data.sprites.front_default,
        types: res.data.types.map((t: any) => t.type.name),
        height: res.data.height,
        weight: res.data.weight,
        abilities: res.data.abilities.map((a: any) => a.ability.name),
        base_experience: res.data.base_experience,
        stats: res.data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
      };
    })
  );

  return items;
}

// Fetch single Pokémon by ID
export async function fetchItemDetail(id: string | number): Promise<Item> {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return {
    id: res.data.id,
    name: res.data.name,
    image: res.data.sprites.front_default,
    types: res.data.types.map((t: any) => t.type.name),
    height: res.data.height,
    weight: res.data.weight,
    abilities: res.data.abilities.map((a: any) => a.ability.name),
    base_experience: res.data.base_experience,
    stats: res.data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
  };
}
