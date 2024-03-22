import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Pokemon {
  name: string;
  url: string;
  sprites?: { front_default: string }; 
  id: number; 
}

interface PokemonList {
  results: Pokemon[];
}

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemons = async () => {
      const offset = (currentPage - 1) * 50;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
      const data: PokemonList = await response.json();
      setPokemons(data.results);
    };
    fetchPokemons();
  }, [currentPage]);

  const handleDetailsClick = (id: number) => {
    router.push(`/${router.query.type}/${id}`);
  };

  return (
    <div>
      <h1>Pokédex</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <button onClick={() => handleDetailsClick(pokemon.id)}>Détails</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)}>Précédent</button>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Suivant</button>
      </div>
    </div>
  );
};

export default Home;