import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

type Product = {
  id: number;
  price: number;
  title: string;
  priceFormated: string;
}

type Results = {
  totalPrice: number;
  data: Product[];
}

const Home: NextPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${query}`);
    const data = await response.json();

    const totalPrice = data.reduce((acc: number, product: Product) => acc + product.price, 0)

    const priceFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map((product: Product) => ({
      id: product.id,
      price: product.price,
      title: product.title,
      priceFormated: priceFormatter.format(product.price)
    }));

    setResults({ totalPrice, data: products });
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
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  )
}

export default Home
