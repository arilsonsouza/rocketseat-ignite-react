import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';

interface HeaderProps {
  onOpenNewTransactionModal: () => void
}

export function Header({ onOpenNewTransactionModal: onOpenNewTransactionModal }: HeaderProps) {


  return (
    <Container>
      <Content>
        <img src={logoImg} alt='DtMoney' />
        <button onClick={onOpenNewTransactionModal} type='button'>Nova transação</button>
      </Content>
    </Container>
  );
}