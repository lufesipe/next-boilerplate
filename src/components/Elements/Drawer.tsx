import { useEffect, useState, type ReactNode } from 'react';
import {
  CloseButton,
  Drawer as ChakraDrawer,
  Portal,
  type DrawerBodyProps,
  type DrawerContentProps,
  type DrawerHeaderProps,
} from '@chakra-ui/react';

export const Drawer = ({ button, children, bodyProps, contentProps, footer, headerProps, id, title }: DrawerProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      window.addEventListener(`open-drawer-${id}`, () => setOpen(true));
      window.addEventListener(`close-drawer-${id}`, () => setOpen(false));
    }

    return () => {
      if (id) {
        window.removeEventListener(`open-drawer-${id}`, () => setOpen(true));
        window.removeEventListener(`close-drawer-${id}`, () => setOpen(false));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraDrawer.Root open={open} onOpenChange={({ open }) => setOpen(open)} placement="bottom">
      {button && <ChakraDrawer.Trigger asChild>{button}</ChakraDrawer.Trigger>}
      <Portal>
        <ChakraDrawer.Backdrop />
        <ChakraDrawer.Positioner>
          <ChakraDrawer.Content p="4" h="calc(100% - 2.5rem)" {...contentProps}>
            {title && (
              <ChakraDrawer.Header {...headerProps} pt="9">
                {typeof title === 'string' ? <ChakraDrawer.Title fontSize="xl">{title}</ChakraDrawer.Title> : title}
              </ChakraDrawer.Header>
            )}
            <ChakraDrawer.Body {...bodyProps}>{children}</ChakraDrawer.Body>
            {footer && <ChakraDrawer.Footer>{footer}</ChakraDrawer.Footer>}
            <ChakraDrawer.CloseTrigger asChild>
              <CloseButton size="sm" _focusVisible={{ outline: 'none' }} />
            </ChakraDrawer.CloseTrigger>
          </ChakraDrawer.Content>
        </ChakraDrawer.Positioner>
      </Portal>
    </ChakraDrawer.Root>
  );
};

type DrawerProps = {
  button?: ReactNode;
  children: ReactNode;
  bodyProps?: Omit<DrawerBodyProps, 'children'>;
  contentProps?: Omit<DrawerContentProps, 'children'>;
  footer?: ReactNode;
  headerProps?: Omit<DrawerHeaderProps, 'children'>;
  id?: string;
  title?: ReactNode;
};
