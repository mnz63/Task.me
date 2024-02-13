import { memo } from "react";
import { Controller } from "react-hook-form";
import { View, Text, Textarea, TextareaInput } from "@gluestack-ui/themed";

type Props = {
  name: string;
  placeholder?: string;
  icon?: any;
  errorMessage?: string;
  control: any;
  label?: string;
};

export const TextAreaField = memo(
  ({ name, control, errorMessage, icon, placeholder, label }: Props) => {
    return (
      <View mt={20}>
        {label && (
          <Text
            fontFamily="Poppins_500Medium"
            fontSize={15}
            color={"#006EE9"}
            mb={5}
          >
            {label}
          </Text>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Textarea
              size="md"
              h={176}
              borderRadius={15}
              borderColor={"#006de926"}
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}
            >
              <TextareaInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder={placeholder}
                fontSize={12}
              />
            </Textarea>
          )}
        />

        <Text
          fontFamily="Poppins_400Regular"
          fontSize={12}
          color={"red"}
          ml={10}
        >
          {errorMessage}
        </Text>
      </View>
    );
  }
);
