import React from "react";

import { RepositoryList } from './components/RepositoryList';

import './styles/global.scss';

export function App() {
  return (
    <div>
      <h1>Github Explorer</h1>
      <RepositoryList />
    </div>
  );
}