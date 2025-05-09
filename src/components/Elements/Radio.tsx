import { Fieldset, Flex, RadioGroup } from '@chakra-ui/react';
import { type Control, Controller, FieldErrors } from 'react-hook-form';

export const Radio = ({ control, items, legend, name, errors, isDisabled }: RadioProps) => {
  return (
    <Fieldset.Root invalid={!!errors?.[name]} disabled={isDisabled}>
      <Fieldset.Legend>{legend}</Fieldset.Legend>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup.Root
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            mt="2"
          >
            <Flex gap="4">
              {items.map((item) => (
                <RadioGroup.Item key={crypto.randomUUID()} value={item.value} gap="2">
                  <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </Flex>
          </RadioGroup.Root>
        )}
      />
      {!!errors?.[name] && <Fieldset.ErrorText>{errors?.[name].message as string}</Fieldset.ErrorText>}
    </Fieldset.Root>
  );
};

export type RadioProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  items: RadioItem[];
  legend: string;
  name: string;
  errors?: FieldErrors;
  isDisabled?: boolean;
};

type RadioItem = {
  label: string;
  value: string;
};
