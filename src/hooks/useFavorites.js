import { useState } from 'react';

const KEY = 'favorites';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function useFavorites() {
  const [ids, setIds] = useState(load);

  const toggle = (id) => {
    setIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id) => ids.includes(id);

  return { ids, toggle, isFavorite };
}
