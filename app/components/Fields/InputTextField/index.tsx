import {
  View,
  Input,
  InputField,
  FormControl,
  Text,
} from "@gluestack-ui/themed";
import { Controller } from "react-hook-form";

type Props = {
  name: string;
  placeholder?: string;
  icon?: any;
  errorMessage?: string;
  control: any;
  label?: string;
};

export default function InputTextField({
  name,
  control,
  errorMessage,
  icon,
  placeholder,
  label,
}: Props) {
  return (
    <View>
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
          <Input
            h={48}
            borderRadius={15}
            borderColor={"#006de926"}
            size="md"
            isDisabled={false}
            alignItems="center"
          >
            {icon && (
              <View
                alignItems="center"
                justifyContent="center"
                w={50}
                h={"100%"}
                bgColor="#006EE9"
              >
                {icon}
              </View>
            )}
            <InputField
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
              color={"#000"}
              fontSize={13}
            />
          </Input>
        )}
      />
      <Text fontFamily="Poppins_400Regular" fontSize={12} color={"red"} ml={10}>
        {errorMessage}
      </Text>
    </View>
  );
}
