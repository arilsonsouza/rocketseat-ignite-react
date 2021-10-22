import type { NextPage } from 'next';
import { Flex, Button, Stack } from '@chakra-ui/react';

import { Input } from '../components/Form/Input';

const Home: NextPage = () => {
  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection='column'
      >
        <Stack spacing="4">
          <Input
            type="email"
            name="email"
            label="E-mail"
          />

          <Input
            type="password"
            name="password"
            label="Senha"
          />

        </Stack>
        <Button
          type="submit"
          marginTop="6"
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
