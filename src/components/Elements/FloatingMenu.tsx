import type { ReactNode } from 'react';
import Link from 'next/link';
import { Menu as ChakraMenu, Portal } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

export const FloatingMenu = ({ children, items }: FloatingMenuProps) => {
  return (
    <ChakraMenu.Root>
      <ChakraMenu.Trigger asChild>{children}</ChakraMenu.Trigger>
      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content>
            {items.map(({ name, href, handleClick, Icon }) => {
              if (handleClick) {
                return (
                  <ChakraMenu.Item key={crypto.randomUUID()} value={name} onClick={handleClick}>
                    {Icon && <Icon />}
                    {name}
                  </ChakraMenu.Item>
                );
              }
              return (
                <ChakraMenu.Item key={crypto.randomUUID()} value={name} onClick={handleClick}>
                  {Icon && <Icon />}
                  <Link href={href}>{name}</Link>
                </ChakraMenu.Item>
              );
            })}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
};

type FloatingMenuProps = {
  children: ReactNode;
  items: FloatingMenuItem[];
};

type FloatingMenuItem = {
  name: string;
  Icon?: IconType;
} & (
  | {
      href?: never;
      handleClick: () => void;
    }
  | {
      href: string;
      handleClick?: never;
    }
);
