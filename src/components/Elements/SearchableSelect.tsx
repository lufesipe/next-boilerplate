import type { SelectOption } from './Select';
import { Field } from '@chakra-ui/react';
import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import { type ActionMeta, type InputActionMeta, type MultiValue, type Options, Select } from 'chakra-react-select';

export const SearchableSelect = ({
  options,
  label,
  control,
  errors,
  isLoading = false,
  name,
  orientation = 'horizontal',
  placeholder,
  value,
  handleChange,
  handleInputChange,
}: SearchableSelectProps) => {
  if (control) {
    return (
      <Field.Root invalid={!!errors?.[name]} orientation={orientation}>
        {label && <Field.Label>{label}</Field.Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              name={field.name}
              value={field.value}
              options={options}
              placeholder={placeholder}
              onChange={(value) => field.onChange(value)}
              onInputChange={handleInputChange}
              noOptionsMessage={() => 'Nenhuma opção'}
              loadingMessage={() => 'Buscando serviços...'}
              isLoading={isLoading}
            />
          )}
        />
        {errors?.[name] && <Field.ErrorText>{errors?.[name].message as string}</Field.ErrorText>}
      </Field.Root>
    );
  }

  return (
    <Field.Root>
      {label && <Field.Label>{label}</Field.Label>}
      <Select
        isMulti
        options={options as unknown as Options<string>}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onInputChange={handleInputChange}
        noOptionsMessage={() => 'Nenhuma opção'}
        loadingMessage={() => 'Buscando serviços...'}
        isLoading={isLoading}
      />
    </Field.Root>
  );
};

type SearchableSelectProps = {
  options: SelectOption[];
  isLoading?: boolean;
  label?: string;
  placeholder?: string;
  orientation?: 'vertical' | 'horizontal';
  handleInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
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
      handleChange: (newValue: MultiValue<string>, actionMeta: ActionMeta<string>) => void;
      control?: never;
      errors?: never;
      name?: never;
    }
);
