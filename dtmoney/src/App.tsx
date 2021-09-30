import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';

import { GlobalStyle } from './styles/global';

export function App() {
  const [newTransactionModalIsOpen, setNewTransactionModalIsOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setNewTransactionModalIsOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setNewTransactionModalIsOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={newTransactionModalIsOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </>
  );
}
