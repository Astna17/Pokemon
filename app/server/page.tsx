import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { Pokemon } from '../interface';

const ServerPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      })
      .catch((error) => console.error('Error fetching Pokemon:', error));
  }, []);

  const goToNextPage = () => {
    if (nextPageUrl) {
      fetch(nextPageUrl)
        .then((response) => response.json())
        .then((data) => {
          setPokemonList(data.results);
          setNextPageUrl(data.next);
          setPrevPageUrl(data.previous);
        })
        .catch((error) => console.error('Error fetching Pokemon:', error));
    }
  };

  const goToPrevPage = () => {
    if (prevPageUrl) {
      fetch(prevPageUrl)
        .then((response) => response.json())
        .then((data) => {
          setPokemonList(data.results);
          setNextPageUrl(data.next);
          setPrevPageUrl(data.previous);
        })
        .catch((error) => console.error('Error fetching Pokemon:', error));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Server-side Rendered Pokemon List</h1>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <Link href={`/server/${pokemon.name}`}>
              <a>{pokemon.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={goToPrevPage} disabled={!prevPageUrl}>Previous</button>
        <button onClick={goToNextPage} disabled={!nextPageUrl}>Next</button>
      </div>
    </div>
  );
};

export default ServerPage;
