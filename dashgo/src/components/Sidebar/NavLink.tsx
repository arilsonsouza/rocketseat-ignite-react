import { ElementType } from 'react';
import { Link, Text, Icon, LinkProps } from '@chakra-ui/react';

import { ActiveLink } from '../ActiveLink';
interface NavLinkProps extends LinkProps {
  href: string,
  icon: ElementType,
  children: string
}

export function NavLink({ href, icon, children, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <Link
        display="flex"
        alignContent="stretch"
        py="1"
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </Link>
    </ActiveLink>


  );
}