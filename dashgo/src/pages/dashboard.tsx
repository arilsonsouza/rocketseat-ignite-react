import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ]
  },
  fill: {
    opacty: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    },
  }
};

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 51, 18, 109] },
];

const Dashboard: NextPage = () => {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignContent="flex-start">
          <Box
            p="8"
            bgColor="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" pb="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box
            p="8"
            bgColor="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" pb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Dashboard;