import { ElementType } from 'react';
import { Link, Text, Icon, LinkProps } from '@chakra-ui/react';

interface NavLinkProps extends LinkProps {
  icon: ElementType,
  children: string
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link
      display="flex"
      alignContent="stretch"
      py="1"
      {...rest}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{children}</Text>
    </Link>
  );
}