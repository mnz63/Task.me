import { TouchableOpacity } from "react-native";
import CustomText from "../../CustomText";
import {
  VStack,
  View,
  FormControl,
  Button,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../../common/utils/SchemaForm";
import InputTextField from "../../Fields/InputTextField";
import { EmailIcon, PasswordIcon } from "../../../../assets/icons";
import CustomButton from "../../Buttons/CustomButton";

type Props = {
  onFlipCardRegister?: () => void;
  onLoginSubmit?: (data) => void;
  isLoading?: boolean;
};

export default function LoginCard({
  onFlipCardRegister,
  onLoginSubmit,
  isLoading,
}: Readonly<Props>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  return (
    <VStack alignItems="center">
      <CustomText
        styles={{
          fontWeight: "normal",
          fontSize: 16,
          marginBottom: 20,
        }}
      >
        Faça login
      </CustomText>
      <FormControl width={"100%"}>
        <InputTextField
          name="email"
          control={control}
          icon={<EmailIcon />}
          errorMessage={errors?.email?.message}
          placeholder="E-mail"
        />
        <InputTextField
          name="password"
          control={control}
          icon={<PasswordIcon />}
          errorMessage={errors?.password?.message}
          placeholder="Senha"
        />
        <Button variant="link" alignSelf="flex-end">
          <ButtonText
            fontFamily="Poppins_400Regular"
            fontSize={13}
            color={"#87ADF4"}
          >
            Esqueceu a senha?
          </ButtonText>
        </Button>
        <CustomButton
          isLoading={isLoading}
          label="Login"
          onPress={handleSubmit(onLoginSubmit)}
        />
      </FormControl>
      <View flexDirection="row" alignItems="center" gap={5} mt={20}>
        <CustomText
          styles={{
            fontFamily: "Poppins_400Regular",
          }}
        >
          Não tem uma conta?
        </CustomText>
        <Button
          variant="link"
          alignSelf="flex-end"
          onPress={onFlipCardRegister}
        >
          <ButtonText fontFamily="Poppins_400Regular" fontSize={13}>
            Criar agora
          </ButtonText>
        </Button>
      </View>
    </VStack>
  );
}
