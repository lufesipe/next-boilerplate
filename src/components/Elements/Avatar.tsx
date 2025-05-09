import { Avatar as ChakraAvatar } from '@chakra-ui/react';

export const Avatar = ({ name, asChild }: AvatarProps) => (
  <ChakraAvatar.Root asChild={asChild} bgColor="brand.main">
    <ChakraAvatar.Fallback name={name} color="white" />
  </ChakraAvatar.Root>
);

type AvatarProps = {
  name: string;
  asChild?: boolean;
};
