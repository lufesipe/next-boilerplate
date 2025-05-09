'use client';

import type {
  ImageLoader,
  OnLoadingComplete,
  PlaceholderValue,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';
import NextImage from 'next/image';
import { chakra, ImageProps as ChakraImageProps } from '@chakra-ui/react';

export const Image: FC<ImageProps> = (props) => <ChakraNextImage {...props} />;

const ChakraNextImage = chakra(
  NextImage,
  {},
  {
    shouldForwardProp: (prop) =>
      [
        'src',
        'alt',
        'width',
        'height',
        'fill',
        'sizes',
        'loader',
        'quality',
        'priority',
        'loading',
        'placeholder',
        'blurDataURL',
        'unoptimized',
        'onLoadingComplete',
        'onLoad',
        'onError',
        'lazyBoundary',
        'lazyRoot',
        'ref',
      ].includes(prop),
  }
) as FC<ImageProps>;

export type ImageProps = Pick<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'sizes' | 'onLoad' | 'onError' | 'ref'
> & {
  src: string | StaticImport;
  alt: string;
  loader?: ImageLoader;
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoadingComplete?: OnLoadingComplete;
  layout?: string;
  lazyBoundary?: string;
  lazyRoot?: string;
} & (
    | { fill: true }
    | {
        fill?: false;
        width: number | `${number}`;
        height: number | `${number}`;
      }
  ) &
  Omit<
    ChakraImageProps,
    'src' | 'alt' | 'width' | 'w' | 'height' | 'h' | 'fill' | 'sizes' | 'loading' | 'placeholder' | 'onLoad' | 'onError'
  >;
