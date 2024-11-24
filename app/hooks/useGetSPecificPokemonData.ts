import { useEffect, useState } from 'react';
import { apiUrl } from '../constant/apiConstant';

const useGetSpecificPokemonData = (pokemonName: string) => {
  const [pokemonData, setPokemonData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/${pokemonName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${pokemonName}`);
      }
      const data = await response.json();
      setPokemonData(data);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (pokemonName) {
      fetchData();
    }
  }, [pokemonName]);

  return { pokemonData, error, loading };
};

export default useGetSpecificPokemonData;
