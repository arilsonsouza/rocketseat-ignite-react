import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Flex, Button, Stack } from '@chakra-ui/react';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string,
  password: string
}

const Home: NextPage = () => {
  const { register, handleSubmit, formState } = useForm();

  const handleSignin: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data)
  }

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
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            {...register('email')}
          />

          <Input
            type="password"
            label="Senha"
            {...register('password')}
          />

        </Stack>
        <Button
          type="submit"
          marginTop="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
