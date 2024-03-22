import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PokemonDetails } from '../interface';

const ClientPokemonDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => setPokemonDetails(data))
        .catch((error) => console.error('Error fetching Pokemon details:', error));
    }
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemonDetails.name}</h1>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>Height: {pokemonDetails.height}</p>
      <p>Weight: {pokemonDetails.weight}</p>
      <p>Types: {pokemonDetails.types.map((type) => type.type.name).join(', ')}</p>
      <p>ID: {pokemonDetails.id}</p>
    </div>
  );
};

export default ClientPokemonDetailsPage;
