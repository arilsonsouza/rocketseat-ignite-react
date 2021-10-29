import { Flex, useBreakpointValue, IconButton, Icon, } from '@chakra-ui/react';

import { Logo } from './Logo';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';
import { NotificationsNav } from './NotificationsNav';
import { useSidebarDrawer } from '../Sidebar/contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  const { onOpen } = useSidebarDrawer();

  return (
    <Flex
      w="100%"
      as="header"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion &&
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          aria-label="open navigation"
        >

        </IconButton>
      }
      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex
        align="center"
        ml="auto"
      >
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}