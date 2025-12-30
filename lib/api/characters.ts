export async function fetchCharacters(name: string, page: number) {
  const params = new URLSearchParams({ page: String(page), name });
  const res = await fetch(`/api/characters?${params}`);
  return res.json();
}

export async function fetchCharacterById(id: string | number) {
  const res = await fetch(`/api/characters/${id}`);
  return res.json();
}
