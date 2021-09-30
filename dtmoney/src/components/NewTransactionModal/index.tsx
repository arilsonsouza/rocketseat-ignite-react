import Modal from 'react-modal';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean,
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen: isOpen, onRequestClose: onRequestClose }: NewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Cadastrar transação</h2>
    </Modal>
  );
}