interface Pokemon {
    name: string;
    url: string;
    sprites: {
      front_default: string;
    };
  }
  
  interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: [{ type: { name: string } }];
    sprites: {
      front_default: string;
    };
    order: number;
  }  