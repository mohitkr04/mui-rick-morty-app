const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async () => {
  const response = await fetch(`${BASE_URL}/character`);
  if (!response.ok) throw new Error('Failed to fetch characters');
  return response.json();
};

export const searchCharacters = async (name) => {
  const response = await fetch(`${BASE_URL}/character/?name=${encodeURIComponent(name)}`);
  if (!response.ok) throw new Error('Failed to search characters');
  return response.json();
};
