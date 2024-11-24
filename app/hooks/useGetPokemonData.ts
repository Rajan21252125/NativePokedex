import { useEffect, useState } from "react";
import { apiUrl } from "../constant/apiConstant";

export interface PokemonData {
  name: string;
  url: string;
}

const useGetPokemonData = (limit: number, offset: number) => {
  const [pokemonDatas, setPokemonDatas] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `${apiUrl}?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      const data = await response.json();
      setPokemonDatas((prev) => [...prev, ...data.results]);
    } catch (error) {
      setError("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  return { pokemonDatas, loading , error };
};

export default useGetPokemonData;
