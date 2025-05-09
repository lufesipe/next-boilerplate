import type { ChangeEvent } from 'react';
import {
  Field as ChakraField,
  Flex,
  FlexProps,
  Input,
  Textarea,
  type FieldLabelProps,
  type FieldRootProps,
  type InputProps,
  type TextareaProps,
} from '@chakra-ui/react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';

export const Field = ({
  label,
  name,
  value,
  control,
  errors,
  fieldProps,
  inputWrapperProps,
  isRequired = false,
  inputProps,
  labelProps,
  orientation = 'horizontal',
  placeholder,
  type,
  handleChange,
}: FieldProps) => {
  const input =
    type === 'textarea' ? (
      <Textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange as TextareaProps['onChange']}
      />
    ) : (
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        pl="2"
        h="8"
        {...(inputProps as InputProps)}
      />
    );

  return (
    <ChakraField.Root
      invalid={!!errors?.[name]}
      orientation={orientation}
      justifyContent="start"
      alignItems="start"
      required={isRequired}
      {...fieldProps}
    >
      {label && (
        <ChakraField.Label lineHeight="2rem" {...labelProps}>
          {label} <ChakraField.RequiredIndicator />
        </ChakraField.Label>
      )}
      <Flex flexDir="column" gap="1" w="full" {...inputWrapperProps}>
        {control ? (
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, ...field } }) =>
              type === 'textarea' ? (
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  {...(inputProps as TextareaProps)}
                  onChange={
                    handleChange
                      ? (e) => onChange(handleChange(e as unknown as ChangeEvent<HTMLInputElement>))
                      : onChange
                  }
                />
              ) : (
                <Input
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  pl="2"
                  h="8"
                  min={0}
                  {...(inputProps as InputProps)}
                  onChange={handleChange ? (e) => onChange(handleChange(e)) : onChange}
                />
              )
            }
          />
        ) : (
          input
        )}
        {!!errors?.[name] && <ChakraField.ErrorText>{errors?.[name]?.message as string}</ChakraField.ErrorText>}
      </Flex>
    </ChakraField.Root>
  );
};

export type FieldProps = Pick<FieldRootProps, 'orientation'> & {
  name: string;
  errors?: FieldErrors;
  fieldProps?: Omit<FieldRootProps, 'orientation' | 'invalid' | 'children' | 'required'>;
  inputWrapperProps?: Omit<FlexProps, 'children'>;
  isRequired?: boolean;
  label?: string;
  labelProps?: Omit<FieldLabelProps, 'children'>;
  placeholder?: string;
} & (
    | {
        value: InputProps['value'];
        control?: never;
        handleChange: InputProps['onChange'];
      }
    | {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        control: Control<any>;
        value?: never;
        handleChange?: InputProps['onChange'];
      }
  ) &
  (
    | {
        type?: InputProps['type'];
        inputProps?: Omit<InputProps, 'value' | 'onChange' | 'name' | 'type' | 'placeholder' | 'children'>;
      }
    | {
        inputProps?: Omit<TextareaProps, 'value' | 'onChange' | 'name' | 'type' | 'placeholder' | 'children'>;
        type: 'textarea';
      }
  );
