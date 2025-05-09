'use client';

import { Portal, Select as ChakraSelect, createListCollection, type SelectRootProps, Field } from '@chakra-ui/react';
import { type FieldErrors, type Control, Controller } from 'react-hook-form';

export const Select = ({
  options,
  value,
  control,
  errors,
  label,
  name,
  placeholder = 'Selecione uma opção',
  orientation = 'vertical',
  handleChange,
  ...props
}: SelectProps) => {
  const collection = createListCollection({ items: options });

  if (control) {
    return (
      <Field.Root invalid={!!errors?.[name]} orientation={orientation}>
        {label && <Field.Label>{label}</Field.Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <ChakraSelect.Root
              collection={collection}
              value={field.value}
              name={field.name}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              {...props}
            >
              <ChakraSelect.HiddenSelect />
              <ChakraSelect.Control>
                <ChakraSelect.Trigger>
                  <ChakraSelect.ValueText placeholder={placeholder} />
                </ChakraSelect.Trigger>
                <ChakraSelect.IndicatorGroup>
                  <ChakraSelect.Indicator />
                </ChakraSelect.IndicatorGroup>
              </ChakraSelect.Control>
              <Portal>
                <ChakraSelect.Positioner zIndex="popover !important">
                  <ChakraSelect.Content>
                    {options.map((option) => (
                      <ChakraSelect.Item key={crypto.randomUUID()} item={option}>
                        {option.label}
                        <ChakraSelect.ItemIndicator />
                      </ChakraSelect.Item>
                    ))}
                  </ChakraSelect.Content>
                </ChakraSelect.Positioner>
              </Portal>
            </ChakraSelect.Root>
          )}
        />
        {errors?.[name] && <Field.ErrorText>{errors?.[name].message as string}</Field.ErrorText>}
      </Field.Root>
    );
  }

  return (
    <ChakraSelect.Root
      collection={collection}
      value={value}
      onValueChange={({ value }) => handleChange(value)}
      {...props}
    >
      <ChakraSelect.HiddenSelect />
      {label && <ChakraSelect.Label>{label}</ChakraSelect.Label>}
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {options.map((option) => (
              <ChakraSelect.Item key={crypto.randomUUID()} item={option}>
                {option.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};

type SelectProps = Omit<SelectRootProps, 'collection' | 'children' | 'value' | 'onValueChange'> & {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  orientation?: 'vertical' | 'horizontal';
} & (
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control: Control<any>;
        errors: FieldErrors;
        name: string;
        value?: never;
        handleChange?: never;
      }
    | {
        value: string[];
        handleChange: (value: string[]) => void;
        control?: never;
        errors?: never;
        name?: never;
      }
  );

export type SelectOption = {
  label: string;
  value: string;
};
