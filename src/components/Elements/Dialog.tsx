import { useEffect, useState, type ReactNode } from 'react';
import {
  CloseButton,
  Dialog as ChakraDialog,
  Portal,
  type DialogBodyProps,
  type DialogContentProps,
  type DialogHeaderProps,
} from '@chakra-ui/react';

export const Dialog = ({ button, children, bodyProps, contentProps, footer, headerProps, id, title }: DialogProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      window.addEventListener(`open-dialog-${id}`, () => setOpen(true));
      window.addEventListener(`close-dialog-${id}`, () => setOpen(false));
    }

    return () => {
      if (id) {
        window.removeEventListener(`open-dialog-${id}`, () => setOpen(true));
        window.removeEventListener(`close-dialog-${id}`, () => setOpen(false));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChakraDialog.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
      {button && <ChakraDialog.Trigger asChild>{button}</ChakraDialog.Trigger>}
      <Portal>
        <ChakraDialog.Backdrop />
        <ChakraDialog.Positioner>
          <ChakraDialog.Content mt="10" p="4" {...contentProps}>
            {title && (
              <ChakraDialog.Header {...headerProps} pt="9">
                {typeof title === 'string' ? <ChakraDialog.Title fontSize="xl">{title}</ChakraDialog.Title> : title}
              </ChakraDialog.Header>
            )}
            <ChakraDialog.Body {...bodyProps}>{children}</ChakraDialog.Body>
            {footer && <ChakraDialog.Footer>{footer}</ChakraDialog.Footer>}
            <ChakraDialog.CloseTrigger asChild>
              <CloseButton size="sm" _focusVisible={{ outline: 'none' }} />
            </ChakraDialog.CloseTrigger>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.Root>
  );
};

type DialogProps = {
  button?: ReactNode;
  children: ReactNode;
  bodyProps?: Omit<DialogBodyProps, 'children'>;
  contentProps?: Omit<DialogContentProps, 'children'>;
  footer?: ReactNode;
  headerProps?: Omit<DialogHeaderProps, 'children'>;
  id?: string;
  title?: ReactNode;
};
