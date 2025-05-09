import { Switch as ChakraSwitch, Field } from '@chakra-ui/react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';

export const Switch = ({ checked, control, label, name, errors, handleChange }: SwitchProps) => {
  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Field.Root invalid={!!errors?.[name]} w="fit-content">
            <ChakraSwitch.Root
              name={field.name}
              checked={field.value}
              onCheckedChange={({ checked }) => field.onChange(checked)}
            >
              <ChakraSwitch.HiddenInput onBlur={field.onBlur} />
              <ChakraSwitch.Control />
              {label && <ChakraSwitch.Label>{label}</ChakraSwitch.Label>}
            </ChakraSwitch.Root>
            <Field.ErrorText>{errors?.[name]?.message as string}</Field.ErrorText>
          </Field.Root>
        )}
      />
    );
  }

  return (
    <ChakraSwitch.Root name={name} checked={checked} onCheckedChange={(e) => handleChange(e.checked)}>
      <ChakraSwitch.HiddenInput />
      <ChakraSwitch.Control />
      {label && <ChakraSwitch.Label>{label}</ChakraSwitch.Label>}
    </ChakraSwitch.Root>
  );
};

type SwitchProps = {
  label?: string;
  name: string;
  errors?: FieldErrors;
} & (
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      control: Control<any>;
      checked?: never;
      handleChange?: never;
    }
  | {
      checked: boolean;
      handleChange: (checked: boolean) => void;
      control?: never;
    }
);
