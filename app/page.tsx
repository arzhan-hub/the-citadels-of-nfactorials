"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

interface ApiResponse {
  results: Character[];
  info: {
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1); // Текущая страница
  const [totalPages, setTotalPages] = useState(1); // Всего страниц
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Сбрасываем на 1-ю страницу при новом поиске
    setPage(1);
  }, [search]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        // Передаем и поиск, и номер страницы
        const res = await fetch(`/api/characters?name=${search}&page=${page}`);
        const data: ApiResponse = await res.json();
        
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch (error) {
        console.error('Failed to fetch characters', error);
      } finally {
        setLoading(false);
      }
    };

    // Небольшая задержка, чтобы не долбить сервер при каждом нажатии клавиши
    const debounce = setTimeout(() => {
      fetchCharacters();
    }, 500);

    return () => clearTimeout(debounce);
  }, [search, page]);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Rick and Morty Explorer
        </h1>

        {/* Поиск */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg px-6 py-4 rounded-full bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none transition-all text-lg placeholder-gray-500"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {characters.length > 0 ? (
                characters.map((char) => (
                  <Link href={`/character/${char.id}`} key={char.id}>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2 border border-gray-700 cursor-pointer h-full">
                      <div className="relative h-64 w-full">
                        <img 
                          src={char.image} 
                          alt={char.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              char.status === 'Alive' ? 'bg-green-500 text-black' : 
                              char.status === 'Dead' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                            }`}>
                              {char.status}
                            </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-1 text-white truncate">{char.name}</h2>
                        <p className="text-green-400 text-sm mb-4 font-medium">{char.species}</p>
                        <div className="text-sm text-gray-400">
                           Last location: {char.location.name}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-2xl text-gray-500 font-light">No characters found matching "{search}"</p>
                </div>
              )}
            </div>

            {/* Пагинация (Кнопки) */}
            {characters.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-gray-400">
                  Page <span className="text-white font-bold">{page}</span> of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}