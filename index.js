import axios from 'axios';
import fs from 'fs/promises';

const start = async () => {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0'
  );

  const data = response.data.results;

  for (const item of data) {
    const { data } = await axios.get(item.url);

    const pokemon = {
      id: data.id,
      //name: data.name,
      //order: data.order,
      image: data.sprites.other['official-artwork'].front_default,
    };

    // Baixar a imagem
    const imageResponse = await axios.get(pokemon.image, {
      responseType: 'arraybuffer',
    });

    // Salvar a imagem localmente
    const imagePath = `./images/${pokemon.id}.png`; // Nome do arquivo baseado no nome do Pokémon
    await fs.writeFile(imagePath, imageResponse.data, 'binary');
    console.log(`Imagem salva em: ${imagePath}`);
  }
};

start();
