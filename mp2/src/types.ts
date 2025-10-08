export interface Item {
  id: number;
  name: string;
  image: string;
  types: string[];
  height?: number;
  weight?: number;
  abilities?: string[];
  base_experience?: number;
  stats?: { name: string; value: number }[];
}
