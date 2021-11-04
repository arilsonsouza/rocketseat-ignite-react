import Link from 'next/link';
import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Box, Flex, Heading, Text, Button, Icon, Table, Thead, Tbody, Tr, Td, Th, Checkbox, useBreakpointValue, Spinner } from '@chakra-ui/react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';

const Users: NextPage = () => {
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json();

    return data;
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bgColor="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td px={["4", "4", "6"]}><Checkbox colorScheme="pink" /></Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Arilson Souza</Text>
                        <Text fontSize="sm" color="gray.300">arilson@email.com</Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>
                      04 de Abril, 2021
                    </Td>}
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} />}
                      >
                        Editar
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Users;