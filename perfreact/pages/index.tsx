import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

const Home: NextPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${query}`);
    const data = await response.json();

    setResults(data);
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" onChange={e => setQuery(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}

export default Home
